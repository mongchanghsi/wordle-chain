import React, { useCallback, useState, useRef } from "react";
import WordleGame, { GameStatus } from "../../components/WordleGame";
import styled from "styled-components";
import { FiRefreshCw, FiSend } from "react-icons/fi";
import Button from "@/components/Shared/Button";

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const GameContent = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameActionContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  max-width: 320px;
  margin-top: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Wordle = () => {
  const [gameKey, setGameKey] = useState(0);
  const [isInputValid, setIsInputValid] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>("none");
  const submitGuessRef = useRef<() => void>(() => {});

  const restartGame = useCallback(() => {
    setGameKey((prevKey) => prevKey + 1);
    setGameStatus("playing");
  }, []);

  const handleGameStatusChange = (status: GameStatus) => {
    setGameStatus(status);
  };

  const handleSubmit = useCallback(() => {
    if (isInputValid) {
      submitGuessRef.current();
    }
  }, [isInputValid]);

  const handleInputValidityChange = useCallback((isValid: boolean) => {
    setIsInputValid(isValid);
  }, []);

  return (
    <GameWrapper>
      <GameContent>
        <WordleGame
          key={gameKey}
          resetGame={restartGame}
          onSubmit={(submitFn) => {
            submitGuessRef.current = submitFn;
          }}
          onInputValidityChange={handleInputValidityChange}
          handleGameStatusChange={handleGameStatusChange}
        />
      </GameContent>
      <GameActionContainer>
        <Button
          onClick={restartGame}
          variant="secondary"
          label="New Word"
          disabled={gameStatus === "playing"}
          startIcon={<FiRefreshCw />}
        ></Button>
        <Button
          onClick={handleSubmit}
          disabled={!isInputValid || gameStatus !== "playing"}
          variant="primary"
          label="Submit"
          startIcon={<FiSend />}
        ></Button>
      </GameActionContainer>
    </GameWrapper>
  );
};

export default Wordle;
