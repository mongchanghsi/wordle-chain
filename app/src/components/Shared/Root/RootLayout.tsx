import styled from "styled-components";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
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
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: calc(100dvh - ${(props) => props.topOffset}px);
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
  const [topNavigationOffset, setTopNavigationOffset] = useState<number>(0);

  useEffect(() => {
    setTopNavigationOffset(topNavigationRef.current?.clientHeight ?? 0);
  }, [topNavigationRef.current]);

  return (
    <RootLayoutContainer>
      <TopNavigation ref={topNavigationRef} />
      <RootLayoutContent topOffset={topNavigationOffset}>
        {children}
      </RootLayoutContent>
    </RootLayoutContainer>
  );
};

export default RootLayout;
