import React, { useState, useEffect } from "react";
import { GameContainer, GuessRow, Tile, GameMessage } from "./styles";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

interface WordleGameProps {
  resetGame: () => void;
}

const WordleGame: React.FC<WordleGameProps> = ({ resetGame }) => {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const initGame = () => {
    const words = ["react", "state", "props", "hooks", "redux"];
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, [resetGame]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (gameOver) return;

    if (event.key === "Enter" && currentGuess.length === WORD_LENGTH) {
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess === targetWord || newGuesses.length === MAX_GUESSES) {
        setGameOver(true);
      }
    } else if (event.key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (
      currentGuess.length < WORD_LENGTH &&
      event.key.match(/^[a-z]$/)
    ) {
      setCurrentGuess(currentGuess + event.key);
    }
  };

  const getTileStatus = (letter: string, index: number, isGuessed: boolean) => {
    if (!isGuessed) return undefined;
    if (letter === targetWord[index]) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  const renderGuess = (guess: string, isCurrentGuess: boolean) => {
    const tiles = [];
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i] || "";
      const status = getTileStatus(letter, i, !isCurrentGuess);
      tiles.push(
        <Tile key={i} status={status}>
          {letter.toUpperCase()}
        </Tile>
      );
    }
    return <GuessRow>{tiles}</GuessRow>;
  };

  return (
    <GameContainer onKeyDown={handleKeyDown} tabIndex={0}>
      {guesses.map((guess) => renderGuess(guess, false))}
      {!gameOver && renderGuess(currentGuess, true)}
      {[...Array(MAX_GUESSES - guesses.length - 1)].map((_, index) => (
        <GuessRow key={index}>
          {[...Array(WORD_LENGTH)].map((_, i) => (
            <Tile key={i} />
          ))}
        </GuessRow>
      ))}
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
