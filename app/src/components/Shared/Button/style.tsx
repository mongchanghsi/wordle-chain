import styled, { css } from "styled-components";

// TODO: Handle different sizing and variant later
export const ButtonContainerOld = styled.button<{
  variant?: "primary" | "secondary";
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  padding: 12px;
  font-size: 18px;
  border-radius: 12px;
  border: none;

  ${({ theme, variant }) => css`
    color: ${variant === "primary" ? theme.secondary : theme.light};
    background: ${variant === "primary" ? theme.light : theme.secondary};
  `};
`;

export const ButtonContainer = styled.button<{
  variant?: "primary" | "secondary";
  disabled?: boolean;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => `${theme.spacing.medium} ${theme.spacing.large}`};
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
  border-radius: 12px;
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

export const ButtonIcon = styled.div`
  position: relative;
  height: 24px;
  aspect-ratio: 1/1;
`;
