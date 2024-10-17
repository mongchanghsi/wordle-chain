import styled from "styled-components";
import { PropsWithChildren } from "react";
import TopNavigation from "../Navigation/TopNavigation";

const RootLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Header = styled.header`
  flex-shrink: 0;
`;

const Body = styled.main`
  flex-grow: 1;
  min-height: 300px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Footer = styled.footer`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <RootLayoutContainer>
      <Header>
        <TopNavigation />
      </Header>
      <Body>{children}</Body>
      <Footer>{/* Add footer content here if needed */}</Footer>
    </RootLayoutContainer>
  );
};

export default RootLayout;
