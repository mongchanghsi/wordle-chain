import React, { useCallback, useState, useRef } from "react";
import WordleGame from "../../components/WordleGame";
import styled from "styled-components";
import { FiRefreshCw, FiSend } from "react-icons/fi";

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
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  max-width: 320px;
  margin-top: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
`;

const ButtonText = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button<{
  variant: "primary" | "secondary";
  disabled?: boolean;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background-color: ${({ theme, variant, disabled }) =>
    disabled
      ? theme.colors.secondary
      : variant === "primary"
        ? theme.colors.primary
        : theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid
    ${({ theme, variant }) =>
      variant === "primary" ? theme.colors.primary : theme.colors.text};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
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
        <Button onClick={restartGame} variant="secondary">
          <FiRefreshCw /> New Word
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isInputValid}
          variant="primary"
        >
          <FiSend /> <ButtonText>Submit</ButtonText>
        </Button>
      </ButtonContainer>
    </GameWrapper>
  );
};

export default Wordle;
