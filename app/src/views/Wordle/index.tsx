import React, { useCallback, useState } from "react";
import WordleGame from "../../components/WordleGame";
import styled from "styled-components";

const WordleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const NewGameButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Wordle = () => {
  const [gameKey, setGameKey] = useState(0);

  const restartGame = useCallback(() => {
    setGameKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <WordleContainer>
      <WordleGame key={gameKey} resetGame={restartGame} />
      <NewGameButton onClick={restartGame}>New Game</NewGameButton>
    </WordleContainer>
  );
};

export default Wordle;
