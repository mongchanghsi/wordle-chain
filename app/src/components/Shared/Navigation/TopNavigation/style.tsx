import styled from "styled-components";

export const TopNavigationContainer = styled.nav`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding-left: ${({ theme }) => theme.spacing.large};
  padding-right: ${({ theme }) => theme.spacing.large};
  padding-top: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.small};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TopNavigationLogo = styled.div`
  position: relative;
  height: 32px;
  aspect-ratio: 1/1;
`;
