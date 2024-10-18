import styled from "styled-components";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import TopNavigation from "../Navigation/TopNavigation";
import BottomNavigation from "../Navigation/BottomNavigation";

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
  viewportHeight: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: ${(props) => `${props.viewportHeight - props.topOffset}px`};
  padding: ${({ theme }) => theme.spacing.small};
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RootLayout = ({ children }: PropsWithChildren) => {
  const topNavigationRef = useRef<HTMLDivElement>(null);
  const bottomNavigationRef = useRef<HTMLDivElement>(null);
  const [topNavigationOffset, setTopNavigationOffset] = useState<number>(0);
  const [bottomNavigationOffset, setBottomNavigationOffset] =
    useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );

  useEffect(() => {
    setTopNavigationOffset(topNavigationRef.current?.clientHeight ?? 0);
    setBottomNavigationOffset(bottomNavigationRef.current?.clientHeight ?? 0);
  }, [topNavigationRef.current, bottomNavigationRef.current]);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <RootLayoutContainer>
      <TopNavigation ref={topNavigationRef} />
      <BottomNavigation ref={bottomNavigationRef} />
      <RootLayoutContent
        topOffset={topNavigationOffset}
        bottomOffset={bottomNavigationOffset}
        viewportHeight={viewportHeight}
      >
        {children}
      </RootLayoutContent>
    </RootLayoutContainer>
  );
};

export default RootLayout;
