import { CardSuit, CardValue } from "@/components/Shared/Card/types";
import { createContext, useContext, useReducer } from "react";
import { PropsWithChildren } from "react";
import {
  BET_ACTION_TYPES,
  START_BET_ACTION,
  END_BET_ACTION,
  RESTART_BET_ACTION,
  CLAIMED_BET_ACTION,
} from "./actions";
import { getRandomCards, getWinnerSuit } from "@/utils/card-rng";

export const NUM_CARDS = 5;

type Action =
  | START_BET_ACTION
  | END_BET_ACTION
  | RESTART_BET_ACTION
  | CLAIMED_BET_ACTION;

export enum BetProgress {
  NOT_STARTED,
  IN_PROGRESS,
  ENDED, // This is for cards dealing animation, after bet submit, before winning bet claim
  CLAIMED,
}

export enum BetStatus {
  LOSE,
  WIN,
}

type State = {
  betId: string;
  suit: CardSuit | undefined | null;
  betAmount: number;
  cardsDealt: { suit: CardSuit; value: CardValue }[];
  betStatus: BetStatus;
  betProgress: BetProgress;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  betId: "",
  suit: null,
  betAmount: 0,
  cardsDealt: [],
  betStatus: BetStatus.LOSE,
  betProgress: BetProgress.NOT_STARTED,
};

const GameSessionContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const GameSessionReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case BET_ACTION_TYPES.START_BET: {
      const { betId, suit, betAmount } = action as START_BET_ACTION;
      const cards = getRandomCards(NUM_CARDS); // Means max draw is 19
      const winnerSuit = getWinnerSuit(cards);
      return {
        ...state,
        betId,
        suit,
        betAmount,
        cardsDealt: cards,
        betStatus: winnerSuit === suit ? BetStatus.WIN : BetStatus.LOSE,
        betProgress: BetProgress.IN_PROGRESS,
      };
    }
    case BET_ACTION_TYPES.END_BET: {
      return {
        ...state,
        betProgress: BetProgress.ENDED,
      };
    }
    case BET_ACTION_TYPES.CLAIMED_BET: {
      return {
        ...state,
        betProgress: BetProgress.CLAIMED,
      };
    }
    case BET_ACTION_TYPES.RESTART_BET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const GameSessionProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(GameSessionReducer, initialState);

  return (
    <GameSessionContext.Provider value={{ state, dispatch }}>
      {children}
    </GameSessionContext.Provider>
  );
};

const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (context === undefined) {
    throw new Error("useGameSession do not have context");
  }
  return context;
};

export { GameSessionProvider, useGameSession };
