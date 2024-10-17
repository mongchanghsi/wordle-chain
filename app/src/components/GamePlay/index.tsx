import { FC, useEffect, useState } from "react";
import {
  CardSuit,
  CardSuitValue,
  CardValue,
  LIST_OF_SUITS,
} from "../Shared/Card/types";
import {
  GamePlayContainer,
  GamePlayHistorySection,
  GamePlayRaceColumn,
  GamePlayRaceIcon,
  GamePlayRaceSection,
} from "./style";
import Card from "../Shared/Card";
import Image from "next/image";
import { NUM_CARDS, useGameSession } from "@/context/useGameSession";
import { BET_ACTION_TYPES } from "@/context/useGameSession/actions";

const INTERVAL = 1_000;

interface IProps {
  gamePanelOffset: number;
}

type Step = {
  [CardSuit.SPADE]: number;
  [CardSuit.HEART]: number;
  [CardSuit.CLUB]: number;
  [CardSuit.DIAMOND]: number;
};

const DEFAULT_STEP = {
  [CardSuit.SPADE]: NUM_CARDS,
  [CardSuit.HEART]: NUM_CARDS,
  [CardSuit.CLUB]: NUM_CARDS,
  [CardSuit.DIAMOND]: NUM_CARDS,
};

const GamePlay: FC<IProps> = ({ gamePanelOffset }) => {
  const { state, dispatch } = useGameSession();
  const [currentCardIndexShown, setCurrentCardsIndexShown] =
    useState<number>(-1);
  const [steps, setSteps] = useState<Step>(DEFAULT_STEP);

  useEffect(() => {
    if (state.cardsDealt.length > 0) {
      const intervalId = setInterval(() => {
        if (currentCardIndexShown >= state.cardsDealt.length - 1) {
          dispatch({ type: BET_ACTION_TYPES.END_BET });
          clearInterval(intervalId);
          return;
        }
        const nextCardIndex = currentCardIndexShown + 1;
        const nextCard = state.cardsDealt[nextCardIndex];
        if (nextCard.suit === CardSuit.SPADE) {
          setSteps((prev) => {
            return {
              ...prev,
              [CardSuit.SPADE]: prev[CardSuit.SPADE] - 1,
            };
          });
        } else if (nextCard.suit === CardSuit.CLUB) {
          setSteps((prev) => {
            return {
              ...prev,
              [CardSuit.CLUB]: prev[CardSuit.CLUB] - 1,
            };
          });
        } else if (nextCard.suit === CardSuit.DIAMOND) {
          setSteps((prev) => {
            return {
              ...prev,
              [CardSuit.DIAMOND]: prev[CardSuit.DIAMOND] - 1,
            };
          });
        } else if (nextCard.suit === CardSuit.HEART) {
          setSteps((prev) => {
            return {
              ...prev,
              [CardSuit.HEART]: prev[CardSuit.HEART] - 1,
            };
          });
        }
        scrollToItem(nextCard.suit, nextCard.value);
        setCurrentCardsIndexShown((prev) => prev + 1);
      }, INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [state.cardsDealt, currentCardIndexShown]);

  useEffect(() => {
    if (state.cardsDealt.length > 0) {
      setSteps(DEFAULT_STEP);
      setCurrentCardsIndexShown(-1);
    }
  }, [state.cardsDealt]);

  const scrollToItem = (suit: CardSuit, value: CardValue) => {
    const item = document.getElementById(`Gameplay-card-${suit}-${value}`);
    if (item) item.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <GamePlayContainer offset={gamePanelOffset}>
      <GamePlayRaceSection>
        {LIST_OF_SUITS.map((_suit) => {
          return (
            <GamePlayRaceColumn key={`Race_Column_${_suit}`}>
              {Array.from({ length: 6 }).map((_, index) => {
                if (index === steps[_suit])
                  return (
                    <GamePlayRaceIcon
                      suited
                      key={`Race_Column_${_suit}_${index}`}
                    >
                      <Image
                        src={CardSuitValue[_suit]}
                        alt={`Race-Icon-${_suit}`}
                        fill
                      />
                    </GamePlayRaceIcon>
                  );
                return (
                  <GamePlayRaceIcon key={`Race_Column_${_suit}_${index}`}>
                    •
                  </GamePlayRaceIcon>
                );
              })}
            </GamePlayRaceColumn>
          );
        })}
      </GamePlayRaceSection>

      <GamePlayHistorySection>
        {state.cardsDealt && state.cardsDealt.length > 0 ? (
          <>
            {state.cardsDealt.map((card, index) => (
              <Card
                id={`Gameplay-card-${card.suit}-${card.value}`}
                key={`Gameplay-card-${index}`}
                shown={currentCardIndexShown >= index}
                suit={card.suit}
                value={card.value}
              />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                id={`Unshown-Card-${index}`}
                key={`Unshown-Card-${index}`}
              />
            ))}
          </>
        )}
      </GamePlayHistorySection>
    </GamePlayContainer>
  );
};

export default GamePlay;
