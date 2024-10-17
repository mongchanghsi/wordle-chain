import { CardSuit, CardValue } from "@/components/Shared/Card/types";

export const getRandomCards = (numCards: number) => {
  const suits = Object.keys(CardSuit)
    .filter((key) => isNaN(Number(key))) // Filter out numeric keys
    .map((key) => CardSuit[key as keyof typeof CardSuit]);
  const values = Object.values(CardValue);

  // Create a full deck
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  // Shuffle the deck using Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  const suitCount = {
    [CardSuit.SPADE]: 0,
    [CardSuit.HEART]: 0,
    [CardSuit.CLUB]: 0,
    [CardSuit.DIAMOND]: 0,
  };

  const selectedCards = [];

  // Draw cards until numCards is reached or suit count reaches 10
  for (let i = 0; i < deck.length; i++) {
    const card = deck[i];
    const { suit } = card;

    selectedCards.push(card);
    suitCount[suit]++;

    if (suitCount[suit] === numCards) {
      break;
    }
  }

  return selectedCards;
};

export const getWinnerSuit = (
  cards: { suit: CardSuit; value: CardValue }[]
) => {
  const suitCount = {
    [CardSuit.SPADE]: 0,
    [CardSuit.HEART]: 0,
    [CardSuit.CLUB]: 0,
    [CardSuit.DIAMOND]: 0,
  };

  cards.forEach((card) => {
    suitCount[card.suit]++;
  });

  if (suitCount[CardSuit.SPADE] === 5) return CardSuit.SPADE;
  if (suitCount[CardSuit.DIAMOND] === 5) return CardSuit.DIAMOND;
  if (suitCount[CardSuit.CLUB] === 5) return CardSuit.CLUB;
  if (suitCount[CardSuit.HEART] === 5) return CardSuit.HEART;
  return CardSuit.SPADE;
};
