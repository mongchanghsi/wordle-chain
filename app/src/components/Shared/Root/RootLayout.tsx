import styled, { css } from "styled-components";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import BottomNavigation from "../Navigation/BottomNavigation";
import TopNavigation from "../Navigation/TopNavigation";

const RootLayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const RootLayoutContent = styled.div.attrs<{
  topOffset: number;
  bottomOffset: number;
}>(({ topOffset, bottomOffset }) => ({
  style: {
    height: `calc(100vh - ${topOffset}px - ${bottomOffset}px)`,
    paddingTop: `calc(${topOffset}px + ${({ theme }) => theme.spacing.medium})`,
    paddingBottom: `calc(${bottomOffset}px + ${({ theme }) => theme.spacing.medium})`,
  },
}))`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const RootLayout = ({ children }: PropsWithChildren) => {
  const topNavigationRef = useRef<HTMLDivElement>(null);
  const [topNavigationOffset, setTopNavigationOffset] = useState<number>(0);

  const bottomNavigationRef = useRef<HTMLDivElement>(null);
  const [bottomNavigationOffset, setBottomNavigationOffset] =
    useState<number>(0);

  useEffect(() => {
    setTopNavigationOffset(topNavigationRef.current?.clientHeight ?? 0);
    setBottomNavigationOffset(bottomNavigationRef.current?.clientHeight ?? 0);
  }, [topNavigationRef.current, bottomNavigationRef.current]);

  return (
    <RootLayoutContainer>
      <TopNavigation ref={topNavigationRef} />
      <RootLayoutContent
        topOffset={topNavigationOffset}
        bottomOffset={bottomNavigationOffset}
      >
        {children}
      </RootLayoutContent>
      <BottomNavigation ref={bottomNavigationRef} />
    </RootLayoutContainer>
  );
};

export default RootLayout;
