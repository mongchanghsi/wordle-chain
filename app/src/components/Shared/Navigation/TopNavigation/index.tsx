import { TopNavigationContainer } from "./style";
import { LegacyRef, forwardRef } from "react";

import { TonConnectButton } from "@tonconnect/ui-react";
import Title from "../../Text/Title";

const TopNavigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  return (
    <TopNavigationContainer ref={ref}>
      <Title>Wordle3</Title>
      <TonConnectButton />
    </TopNavigationContainer>
  );
});

TopNavigation.displayName = "TopNavigation";
export default TopNavigation;
