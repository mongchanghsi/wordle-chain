import Instruction from "@/components/Instruction";
import {
  IntroductionCards,
  IntroductionContainer,
  IntroductionTitle,
  IntroductionTitleIcon,
  IntroductionTitleText,
} from "./styles";
import Image from "next/image";
import PepeIcon from "@/assets/icons/pepe.png";
import { CardValue, LIST_OF_SUITS } from "@/components/Shared/Card/types";
import Card from "@/components/Shared/Card";

const Introduction = () => {
  return (
    <IntroductionContainer>
      <IntroductionTitle>
        <IntroductionTitleIcon>
          <Image src={PepeIcon} alt="Pepe Racing" fill />
        </IntroductionTitleIcon>
        <IntroductionTitleText>Pepe Racing</IntroductionTitleText>
      </IntroductionTitle>
      <Instruction />
      <IntroductionCards>
        {LIST_OF_SUITS.map((suit) => (
          <Card
            key={`Introduction_Card_${suit}`}
            shown
            suit={suit}
            value={CardValue.ACE}
          />
        ))}
      </IntroductionCards>
    </IntroductionContainer>
  );
};

export default Introduction;
