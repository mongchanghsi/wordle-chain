import styled from "styled-components";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import BottomNavigation from "../Navigation/BottomNavigation";
import TopNavigation from "../Navigation/TopNavigation";

const RootLayoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100dvh;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const RootLayoutContent = styled.div<{
  topOffset: number;
  bottomOffset: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: ${({ topOffset, bottomOffset }) =>
    `calc(100vh - ${topOffset}px - ${bottomOffset}px)`};
  height: ${({ topOffset, bottomOffset }) => `calc(100dvh - ${topOffset}px )`};
  padding: ${({ theme }) => theme.spacing.medium};

  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  /* WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }
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
      {/* <BottomNavigation ref={bottomNavigationRef} /> */}
    </RootLayoutContainer>
  );
};

export default RootLayout;
