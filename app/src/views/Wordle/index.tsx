import React, { useCallback, useState, useRef } from "react";
import WordleGame from "../../components/WordleGame";
import styled from "styled-components";

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const GameContent = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  width: 100%;
  max-width: 300px;
  margin-top: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Button = styled.button<{ disabled?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.small}`};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

const Wordle = () => {
  const [gameKey, setGameKey] = useState(0);
  const [isInputValid, setIsInputValid] = useState(false);
  const submitGuessRef = useRef<() => void>(() => {});

  const restartGame = useCallback(() => {
    setGameKey((prevKey) => prevKey + 1);
  }, []);

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
        />
      </GameContent>
      <ButtonContainer>
        <Button onClick={restartGame}>New Game</Button>
        <Button onClick={handleSubmit} disabled={!isInputValid}>
          Submit
        </Button>
      </ButtonContainer>
    </GameWrapper>
  );
};

export default Wordle;
