// test/Wordle.test.ts

import { expect } from "chai";
import { ethers } from "hardhat";
import { Wordle } from "../typechain-types";

describe("Wordle Contract with Commitment Scheme", function () {
  let wordle: Wordle;
  let owner: any;
  let player1: any;
  let player2: any;

  const solution = "apple";
  const salt = "random_salt";
  let commitment: string;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();

    const WordleFactory = await ethers.getContractFactory("Wordle", owner);
    wordle = (await WordleFactory.deploy()) as Wordle;

    commitment = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string", "string"], [solution, salt])
    );
  });

  describe("Game Flow with Commitment Scheme", function () {
    it("Owner can start the game with a commitment", async function () {
      await expect(wordle.startGame(commitment))
        .to.emit(wordle, "GameStarted")
        .withArgs(commitment, anyValue);
      expect(await wordle.gameEnded()).to.be.false;
    });

    it("Players can make guesses without immediate feedback", async function () {
      await wordle.startGame(commitment);

      await expect(wordle.connect(player1).guessWord("alert"))
        .to.emit(wordle, "WordGuessed")
        .withArgs(player1.address, "alert");

      // Guesses are stored but not processed
      const guesses = await wordle.getGuesses(player1.address);
      expect(guesses.length).to.equal(1);
      expect(guesses[0].word).to.equal("alert");
      expect(guesses[0].correctLetters).to.equal(0);
      expect(guesses[0].correctPositions).to.equal(0);
    });

    it("Cannot process guesses before the solution is revealed", async function () {
      await wordle.startGame(commitment);
      await wordle.connect(player1).guessWord("alert");

      await expect(
        wordle.connect(player1).processMyGuesses()
      ).to.be.revertedWith("Game has not ended");
    });

    it("Revealing the solution allows players to process their guesses", async function () {
      await wordle.startGame(commitment);

      await wordle.connect(player1).guessWord("alert");
      await wordle.connect(player1).guessWord("ample");
      await wordle.connect(player2).guessWord("apple");

      await expect(wordle.revealSolution(solution, salt))
        .to.emit(wordle, "SolutionRevealed")
        .withArgs(solution);

      // Players process their guesses
      await expect(wordle.connect(player1).processMyGuesses())
        .to.emit(wordle, "GuessesProcessed");

      await expect(wordle.connect(player2).processMyGuesses())
        .to.emit(wordle, "GuessesProcessed");

      // Check that the guesses are processed
      const guessesPlayer1 = await wordle.getGuesses(player1.address);
      expect(guessesPlayer1.length).to.equal(2);
      expect(guessesPlayer1[0].correctLetters).to.equal(2);
      expect(guessesPlayer1[0].correctPositions).to.equal(2);
      expect(guessesPlayer1[0].resultArray).to.deep.equal([2, 0, 1, 0, 1]);

      expect(guessesPlayer1[1].correctLetters).to.equal(2);
      expect(guessesPlayer1[1].correctPositions).to.equal(3);
      expect(guessesPlayer1[1].resultArray).to.deep.equal([2, 2, 1, 2, 1]);

      const guessesPlayer2 = await wordle.getGuesses(player2.address);
      expect(guessesPlayer2.length).to.equal(1);
      expect(guessesPlayer2[0].correctLetters).to.equal(0);
      expect(guessesPlayer2[0].correctPositions).to.equal(5);
      expect(guessesPlayer2[0].resultArray).to.deep.equal([2, 2, 2, 2, 2]);

      // Check correct guesses count
      const correctGuesses1 = await wordle.getCorrectGuesses(player1.address);
      expect(correctGuesses1).to.equal(0);

      const correctGuesses2 = await wordle.getCorrectGuesses(player2.address);
      expect(correctGuesses2).to.equal(1);
    });

    it("Cannot reveal solution with incorrect salt or solution", async function () {
      await wordle.startGame(commitment);

      await expect(
        wordle.revealSolution("apple", "wrong_salt")
      ).to.be.revertedWith("Invalid solution or salt");

      await expect(
        wordle.revealSolution("apples", salt)
      ).to.be.revertedWith("Invalid solution or salt");
    });

    it("Players cannot guess after the game has ended", async function () {
      await wordle.startGame(commitment);
      await wordle.revealSolution(solution, salt);

      await expect(
        wordle.connect(player1).guessWord("alert")
      ).to.be.revertedWith("Game has already ended");
    });

    it("Players cannot process guesses multiple times", async function () {
      await wordle.startGame(commitment);

      await wordle.connect(player1).guessWord("alert");
      await wordle.revealSolution(solution, salt);

      await wordle.connect(player1).processMyGuesses();

      // Attempt to process again
      await expect(
        wordle.connect(player1).processMyGuesses()
      ).to.not.emit(wordle, "GuessesProcessed"); // No new event emitted
    });

    it("Guessing a word with incorrect length reverts", async function () {
      await wordle.startGame(commitment);

      await expect(
        wordle.connect(player1).guessWord("app")
      ).to.be.revertedWith("Word must be 5 characters long");
    });
  });
});
