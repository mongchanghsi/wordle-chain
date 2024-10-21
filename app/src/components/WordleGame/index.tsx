import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GameContainer,
  GuessesContainer,
  GuessRow,
  Tile,
  TileInput,
  GameMessage,
} from "./styles";
import { generateWordHash, getWord } from "@/utils/word-rng";
import { useAccount } from "wagmi";
import { useSmartWalletClient } from "@/hooks/smartWallet/useSmartWalletClient";
import { wordleV2Abi, wordleV2Address } from "@/generated";

const WORD_LENGTH = 5;
const MAX_GUESSES = 5;

export type GameStatus = "playing" | "won" | "lost" | "none";

interface WordleGameProps {
  resetGame: () => void;
  onSubmit: (submitFn: () => void) => void;
  onInputValidityChange: (isValid: boolean) => void;
  handleGameStatusChange: (status: GameStatus) => void;
}

const WordleGame: React.FC<WordleGameProps> = ({
  resetGame,
  onSubmit,
  onInputValidityChange,
  handleGameStatusChange,
}) => {
  const { address } = useAccount();
  const { smartAccountClient } = useSmartWalletClient();

  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(WORD_LENGTH).fill("")
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>("none");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const initGame = useCallback(async () => {
    try {
      const word = getWord();
      const { wordHash, letterCodes, salt, signature } =
        await generateWordHash(word);
      if (signature === "0x") return;

      // Setup the aa transaction
      if (!address || !smartAccountClient) return;

      const userOperation = await smartAccountClient.sendUserOperation({
        calls: [
          {
            to: wordleV2Address,
            abi: wordleV2Abi,
            functionName: "startNewGame",
            args: [wordHash, letterCodes, salt, signature],
          },
        ],
      });

      const tx = await smartAccountClient.waitForUserOperationReceipt({
        hash: userOperation,
      });

      console.log("initGame | Transaction Hash:", tx.receipt);

      if (tx) {
        setTargetWord(word);
        setGuesses([]);
        setCurrentGuess(Array(WORD_LENGTH).fill(""));
        setGameStatus("playing");
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("initGame | Error - ", error);
    }
  }, [address, smartAccountClient]);

  useEffect(() => {
    initGame();
  }, [resetGame, initGame]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newGuess = [...currentGuess];
    newGuess[index] = value.toLowerCase();
    setCurrentGuess(newGuess);

    if (value && index < WORD_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    onInputValidityChange(newGuess.every((letter) => letter !== ""));
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (
      event.key === "Enter" &&
      currentGuess.every((letter) => letter !== "")
    ) {
      submitGuess();
    } else if (event.key === "Backspace" && !currentGuess[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submitGuess = useCallback(async () => {
    const guess = currentGuess.join("");
    try {
      if (!address || !smartAccountClient) {
        return;
      }

      const userOperation = await smartAccountClient.sendUserOperation({
        calls: [
          {
            to: wordleV2Address,
            abi: wordleV2Abi,
            functionName: "makeGuess",
            args: [guess],
          },
        ],
      });

      const tx = await smartAccountClient.waitForUserOperationReceipt({
        hash: userOperation,
      });

      console.log("submitGuess | Transaction Hash:", tx.receipt);

      if (tx) {
        const newGuesses = [...guesses, guess];
        setGuesses(newGuesses);
        setCurrentGuess(Array(WORD_LENGTH).fill(""));
        onInputValidityChange(false);

        if (guess === targetWord) {
          setGameStatus("won");
          handleGameStatusChange("won");
        } else if (newGuesses.length === MAX_GUESSES) {
          setGameStatus("lost");
          handleGameStatusChange("lost");
        } else {
          inputRefs.current[0]?.focus();
        }
      }
    } catch (error) {
      console.error("submitGuess | Error - ", error);
    }
  }, [
    currentGuess,
    guesses,
    targetWord,
    onInputValidityChange,
    address,
    smartAccountClient,
  ]);

  useEffect(() => {
    onSubmit(submitGuess);
  }, [onSubmit, submitGuess]);

  const getTileStatus = (letter: string, index: number) => {
    if (letter === targetWord[index]) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  const renderGuess = (guess: string) => {
    return (
      <GuessRow>
        {guess.split("").map((letter, index) => (
          <Tile key={index} status={getTileStatus(letter, index)}>
            {letter.toUpperCase()}
          </Tile>
        ))}
      </GuessRow>
    );
  };

  const renderInputRow = () => {
    return (
      <GuessRow>
        {currentGuess.map((letter, index) => (
          <TileInput
            key={index}
            value={letter.toUpperCase()}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            maxLength={1}
            disabled={gameStatus !== "playing"}
          />
        ))}
      </GuessRow>
    );
  };

  return (
    <GameContainer>
      <GuessesContainer>
        {guesses.map((guess) => renderGuess(guess))}
        {gameStatus === "playing" && renderInputRow()}
        {[
          ...Array(
            MAX_GUESSES - guesses.length - (gameStatus === "playing" ? 1 : 0)
          ),
        ].map((_, index) => (
          <GuessRow key={index}>
            {[...Array(WORD_LENGTH)].map((_, i) => (
              <Tile key={i} />
            ))}
          </GuessRow>
        ))}
      </GuessesContainer>
      <GameMessage>
        {gameStatus === "won" && "Congratulations! You guessed the word!"}
        {gameStatus === "lost" &&
          `Game over! The word was ${targetWord.toUpperCase()}`}
        {gameStatus === "none" && `Click on New Word to get started!`}
      </GameMessage>
    </GameContainer>
  );
};

export default WordleGame;
