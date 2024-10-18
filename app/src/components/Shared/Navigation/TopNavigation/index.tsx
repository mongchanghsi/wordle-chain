import { TopNavigationContainer } from "./style";
import { LegacyRef, forwardRef } from "react";

import Title from "../../Text/Title";
import PrivyWallet from "../../PrivyWallet";

const TopNavigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  return (
    <TopNavigationContainer ref={ref}>
      <Title>Wordle3</Title>
      <PrivyWallet />
    </TopNavigationContainer>
  );
});

TopNavigation.displayName = "TopNavigation";
export default TopNavigation;
