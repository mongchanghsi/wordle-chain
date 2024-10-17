import styled from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
`;

export const GuessRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Tile = styled.div<{ status?: 'correct' | 'present' | 'absent' }>`
  width: 56px;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;

  ${({ status, theme }) => {
        switch (status) {
            case 'correct':
                return `background-color: ${theme.colors.correct}; color: ${theme.colors.text}; border-color: ${theme.colors.correct};`;
            case 'present':
                return `background-color: ${theme.colors.present}; color: ${theme.colors.text}; border-color: ${theme.colors.present};`;
            case 'absent':
                return `background-color: ${theme.colors.absent}; color: ${theme.colors.text}; border-color: ${theme.colors.absent};`;
            default:
                return `background-color: transparent; color: ${theme.colors.text};`;
        }
    }}
`;

export const GameMessage = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;
