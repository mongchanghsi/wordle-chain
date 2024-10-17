import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GameContainer,
  GuessesContainer,
  GuessRow,
  Tile,
  TileInput,
  GameMessage,
  InputRow,
} from "./styles";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

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
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>(
    Array(WORD_LENGTH).fill("")
  );
  const [gameOver, setGameOver] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const initGame = useCallback(() => {
    const words = ["react", "state", "props", "hooks", "redux"];
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setCurrentGuess(Array(WORD_LENGTH).fill(""));
    setGameOver(false);
    inputRefs.current[0]?.focus();
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

  const submitGuess = useCallback(() => {
    const guess = currentGuess.join("");
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess(Array(WORD_LENGTH).fill(""));
    onInputValidityChange(false);

    if (guess === targetWord || newGuesses.length === MAX_GUESSES) {
      setGameOver(true);
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
            className={letter === "" ? "pulse" : ""}
          />
        ))}
      </GuessRow>
    );
  };

  return (
    <GameContainer>
      <GuessesContainer>
        {guesses.map((guess) => renderGuess(guess))}
        {[...Array(MAX_GUESSES - guesses.length - 1)].map((_, index) => (
          <GuessRow key={index}>
            {[...Array(WORD_LENGTH)].map((_, i) => (
              <Tile key={i} />
            ))}
          </GuessRow>
        ))}
      </GuessesContainer>
      {!gameOver && <InputRow>{renderInputRow()}</InputRow>}
      {gameOver && (
        <GameMessage>
          {guesses[guesses.length - 1] === targetWord
            ? "You won!"
            : `Game over! The word was ${targetWord.toUpperCase()}`}
        </GameMessage>
      )}
    </GameContainer>
  );
};

export default WordleGame;
