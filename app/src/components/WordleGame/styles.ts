import styled from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
`;

export const GuessesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  flex-grow: 1;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};

  /* Ensure at least 2 rows are visible */
  max-height: calc(5 * (56px + ${({ theme }) => theme.spacing.medium}));

  /* WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GuessRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  justify-content: center;
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

export const TileInput = styled.input`
  width: 56px;
  height: 56px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.correct};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.correct}40;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary}CC;
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const GameMessage = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;
