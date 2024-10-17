import { FC } from "react";
import {
  CardBackIcon,
  CardBackInnerBorder,
  CardContainer,
  CardContent,
  CardSuitImage,
  CardValueText,
  CardWrapper,
} from "./style";
import { CardSuit, CardSuitValue, CardValue } from "./types";
import Image from "next/image";
import PepeIcon from "@/assets/icons/pepe.png";
import PokerCardBackdrop from "@/assets/icons/poker-card-back.png";

interface IProps {
  id?: string;
  shown?: boolean;
  suit?: CardSuit;
  value?: CardValue;
}

const Card: FC<IProps> = ({
  id = "",
  shown = false,
  suit = CardSuit.SPADE,
  value,
}) => {
  return (
    <CardWrapper id={id}>
      <CardContainer className={shown ? "flipped" : ""}>
        {shown ? (
          <CardContent style={{ gap: "8px" }} className={"front"}>
            <CardSuitImage>
              <Image src={CardSuitValue[suit]} alt={`Card-${suit}`} fill />
            </CardSuitImage>
            <CardValueText>{value}</CardValueText>
          </CardContent>
        ) : (
          <CardContent style={{ padding: "4px" }}>
            <CardBackInnerBorder>
              <Image src={PokerCardBackdrop} alt="Back View Backdrop" fill />
              <CardBackIcon>
                <CardSuitImage style={{ position: "absolute" }}>
                  <Image src={PepeIcon} alt="Back View" fill />
                </CardSuitImage>
              </CardBackIcon>
            </CardBackInnerBorder>
          </CardContent>
        )}
      </CardContainer>
    </CardWrapper>
  );
};

export default Card;
