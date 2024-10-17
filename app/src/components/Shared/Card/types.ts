import SpadeIcon from "@/assets/icons/spade.png";
import DiamondIcon from "@/assets/icons/diamond.png";
import ClubIcon from "@/assets/icons/club.png";
import HeartIcon from "@/assets/icons/heart.png";

export enum CardSuit {
  SPADE,
  HEART,
  CLUB,
  DIAMOND,
}

export enum CardValue {
  ACE = "A",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
}

export const CardSuitValue = {
  [CardSuit.SPADE]: SpadeIcon,
  [CardSuit.CLUB]: ClubIcon,
  [CardSuit.DIAMOND]: DiamondIcon,
  [CardSuit.HEART]: HeartIcon,
};

export const CardSuitLabel = {
  [CardSuit.SPADE]: "Spade",
  [CardSuit.CLUB]: "Club",
  [CardSuit.DIAMOND]: "Diamond",
  [CardSuit.HEART]: "Heart",
};

export const LIST_OF_SUITS = [
  CardSuit.SPADE,
  CardSuit.HEART,
  CardSuit.CLUB,
  CardSuit.DIAMOND,
];
