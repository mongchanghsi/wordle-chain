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
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const WORD_LENGTH = 5;
const MAX_GUESSES = 5;

// TODO: Contract Address
const CONTRACT_ADDRESS = "0xXXX";

type GameStatus = "playing" | "won" | "lost";

interface WordleGameProps {
  resetGame: () => void;
  onSubmit: (submitFn: () => void) => void;
  onInputValidityChange: (isValid: boolean) => void;
}

const WordleGame: React.FC<WordleGameProps> = ({
  resetGame,
  onSubmit,
  onInputValidityChange,
}) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(WORD_LENGTH).fill("")
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const initGame = useCallback(async () => {
    try {
      const word = getWord();
      const { messageHash, wordHash, letterCodes, salt } =
        generateWordHash(word);
      const signature = await walletClient?.signMessage({
        message: {
          raw: messageHash,
        },
      });
      if (!signature) return;
      const { request } = await publicClient!.simulateContract({
        account: address,
        address: CONTRACT_ADDRESS,
        abi: "" as any, // TODO: Add ABI
        functionName: "startGame",
        args: [wordHash, letterCodes, salt, signature],
      });
      const tx = await walletClient?.writeContract(request);

      if (tx) {
        setTargetWord(word);
        setGuesses([]);
        setCurrentGuess(Array(WORD_LENGTH).fill(""));

        setGameStatus("playing");
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.log("initGame | Error - ", error);
    }
  }, []);

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
    // TODO: Send guess to makeGuess
    const { request } = await publicClient!.simulateContract({
      account: address,
      address: CONTRACT_ADDRESS,
      abi: "" as any, // TODO: Add ABI
      functionName: "makeGuess",
      args: [guess],
    });
    const tx = await walletClient?.writeContract(request);

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess(Array(WORD_LENGTH).fill(""));
    onInputValidityChange(false);

    if (guess === targetWord) {
      setGameStatus("won");
    } else if (newGuesses.length === MAX_GUESSES) {
      setGameStatus("lost");
    } else {
      inputRefs.current[0]?.focus();
    }
  }, [currentGuess, guesses, targetWord, onInputValidityChange]);

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
            ref={(el) => (inputRefs.current[index] = el)}
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
      {gameStatus !== "playing" && (
        <GameMessage>
          {gameStatus === "won"
            ? "Congratulations! You guessed the word!"
            : `Game over! The word was ${targetWord.toUpperCase()}`}
        </GameMessage>
      )}
    </GameContainer>
  );
};

export default WordleGame;
