import { CardSuit } from "@/components/Shared/Card/types";

export const BET_ACTION_TYPES = {
  START_BET: "START_BET",
  END_BET: "END_BET",
  RESTART_BET: "RESTART_BET",
  CLAIMED_BET: "CLAIMED_BET",
};

export type START_BET_ACTION = {
  type: typeof BET_ACTION_TYPES.START_BET;
  betId: string;
  suit: CardSuit;
  betAmount: number;
};

export type END_BET_ACTION = {
  type: typeof BET_ACTION_TYPES.END_BET;
};

export type RESTART_BET_ACTION = {
  type: typeof BET_ACTION_TYPES.RESTART_BET;
};

export type CLAIMED_BET_ACTION = {
  type: typeof BET_ACTION_TYPES.CLAIMED_BET;
};
