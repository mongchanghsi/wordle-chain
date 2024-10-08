// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Wordle {
    bytes32 private solutionCommitment;
    address public owner;
    bool public revealPhase;
    bool public gameEnded;

    struct Guess {
        string word;
        uint8 correctLetters;
        uint8 correctPositions;
    }

    mapping(address => Guess[]) public guesses;
    mapping(address => uint256) public correctGuesses;

    event GameStarted(bytes32 commitment, uint256 timestamp);
    event WordGuessed(
        address indexed player,
        string word,
        uint8 correctLetters,
        uint8 correctPositions,
        uint8[5] correctPositionsArray
    );
    event SolutionRevealed();
    event GameEnded(address winner, uint256 timestamp);

    constructor() {
        owner = msg.sender;
        revealPhase = false;
        gameEnded = true; // Game initially inactive
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier gameNotEnded() {
        require(!gameEnded, "Game has already ended");
        _;
    }

    function startGame(bytes32 _commitment) public onlyOwner {
        require(gameEnded, "Game is already in progress");
        solutionCommitment = _commitment;
        gameEnded = false;
        revealPhase = false;
        emit GameStarted(solutionCommitment, block.timestamp);
    }

    function guessWord(string memory _guess) public gameNotEnded {
        require(!revealPhase, "Reveal phase is active");
        require(bytes(_guess).length == 5, "Word must be 5 characters long");
        require(solutionCommitment != 0, "No active game or solution not set");

        bytes32 guessHash = keccak256(abi.encodePacked(_guess));
        uint8[5] memory resultArray; // Array to track positions with correct letters

        // Check for correct letters in correct positions
        for (uint8 i = 0; i < 5; i++) {
            if (
                bytes32(uint256(guessHash) >> (i * 8)) ==
                bytes32(uint256(solutionCommitment) >> (i * 8))
            ) {
                resultArray[i] = 2; // Correct position and correct letter
            } else {
                resultArray[i] = 0; // Initialize as wrong position and wrong letter
            }
        }

        // Second pass to count correct letters (not in the correct position)
        for (uint8 i = 0; i < 5; i++) {
            if (resultArray[i] == 0) {
                // Only check letters that are marked as wrong
                for (uint8 j = 0; j < 5; j++) {
                    if (
                        resultArray[j] == 0 &&
                        bytes32(uint256(guessHash) >> (i * 8)) ==
                        bytes32(uint256(solutionCommitment) >> (j * 8))
                    ) {
                        resultArray[j] = 1; // Wrong position but correct letter
                        break; // Exit inner loop once found
                    }
                }
            }
        }

        uint8 correctLetters = 0;
        uint8 correctPositions = 0;

        for (uint8 i = 0; i < 5; i++) {
            if (resultArray[i] == 2) correctPositions++;
            if (resultArray[i] == 1) correctLetters++;
        }

        guesses[msg.sender].push(
            Guess(_guess, correctLetters, correctPositions)
        );
        emit WordGuessed(
            msg.sender,
            _guess,
            correctLetters,
            correctPositions,
            resultArray
        );

        if (correctPositions == 5) {
            gameEnded = true;
            correctGuesses[msg.sender]++;
            emit GameEnded(msg.sender, block.timestamp);
        }
    }

    function revealSolution(
        string memory _solution,
        string memory _salt
    ) public onlyOwner gameNotEnded {
        require(
            keccak256(abi.encodePacked(_solution, _salt)) == solutionCommitment,
            "Invalid solution reveal"
        );

        emit SolutionRevealed(); // Emit event without exposing solution
        gameEnded = true; // End the game after revealing
    }

    function openRevealPhase() public onlyOwner {
        revealPhase = true; // Allow guesses to be processed
    }

    // Function to get the number of correct guesses for a player
    function getCorrectGuesses(address player) public view returns (uint256) {
        return correctGuesses[player];
    }
}
