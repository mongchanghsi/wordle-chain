import { forwardRef, useState } from "react";
import {
  GameDetailBetItem,
  GameDetailRow,
  GameDetailsContainer,
  GameDetailsLabel,
} from "./style";
import Button from "../Shared/Button";
import { CardSuit, CardSuitLabel, LIST_OF_SUITS } from "../Shared/Card/types";
import Card from "../Shared/Card";
import { isTrue } from "@/utils/styled-helper";
import { useTonConnect } from "@/hooks/ton/useTonConnect";
import { useTonConnectUI } from "@tonconnect/ui-react";
import useUserBalance from "@/hooks/ton/useUserBalance";
import {
  BetProgress,
  BetStatus,
  useGameSession,
} from "@/context/useGameSession";
import { BET_ACTION_TYPES } from "@/context/useGameSession/actions";

const BET_INCREMENTAL = 1;

// eslint-disable-next-line
const GameDetails = forwardRef<HTMLElement, any>(
  // eslint-disable-next-line
  (_, ref: any) => {
    const { connected } = useTonConnect();
    const [tonConnectUI] = useTonConnectUI();
    const { balance } = useUserBalance();
    const { state, dispatch } = useGameSession();

    const [betId, setBetId] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [selectedSuit, setSelectedSuit] = useState<CardSuit>();
    const [betAmount, setBetAmount] = useState<number>(0);
    const handleShowDetail = () => setShow(!show);
    const handleSuitChange = (_suit: CardSuit) => setSelectedSuit(_suit);

    const handleBetAmountChange = (_amount: number) => {
      if (_amount < 0) return;
      if (_amount > +balance) return;
      setBetAmount(_amount);
    };

    const handleSubmitBet = async () => {
      if (selectedSuit === null || selectedSuit === undefined) return;
      if (betAmount <= 0) return;
      if (betAmount > +balance) return;

      // TODO: Submit contract to start betting
      const betId = await handleSubmitBetTransaction(betAmount);
      if (betId) {
        setBetId(betId);
        dispatch({
          type: BET_ACTION_TYPES.START_BET,
          betId,
          suit: selectedSuit,
          betAmount,
        });
      }
    };

    const handleSubmitBetTransaction = async (_amount: number) => {
      return `1234-${_amount}`; // TODO: Return a bet Id
    };

    const handleClaimWinnings = (betId: string) => {
      console.log(`Claiming winnings for ${betId}`);
      dispatch({ type: BET_ACTION_TYPES.CLAIMED_BET });
    };

    const handleRestartBet = () => {
      setBetId("");
      setSelectedSuit(undefined);
      setBetAmount(0);
      dispatch({ type: BET_ACTION_TYPES.RESTART_BET });
    };

    return (
      <GameDetailsContainer ref={ref}>
        {show ? (
          <>
            <Button label="Close Menu" onClick={handleShowDetail} />
            {betId ? (
              <>
                {state.betProgress === BetProgress.IN_PROGRESS && (
                  <>
                    <GameDetailRow>
                      <GameDetailsLabel>Bet Id #{betId}</GameDetailsLabel>
                    </GameDetailRow>
                    <GameDetailRow>
                      {selectedSuit !== null && selectedSuit !== undefined && (
                        <GameDetailsLabel>
                          You&apos;ve betted {CardSuitLabel[selectedSuit]} for{" "}
                          {betAmount}
                        </GameDetailsLabel>
                      )}
                    </GameDetailRow>
                  </>
                )}

                {state.betProgress === BetProgress.ENDED && (
                  <>
                    <GameDetailRow>
                      <GameDetailsLabel>Bet Id #{betId}</GameDetailsLabel>
                    </GameDetailRow>
                    <GameDetailRow>
                      {selectedSuit !== null && selectedSuit !== undefined && (
                        <GameDetailsLabel>
                          You&apos;ve{" "}
                          {state.betStatus === BetStatus.WIN ? "won" : "lost"}
                        </GameDetailsLabel>
                      )}
                    </GameDetailRow>
                    {state.betStatus === BetStatus.WIN ? (
                      <Button
                        label={`Claim winnings`}
                        onClick={() => handleClaimWinnings(betId)}
                      />
                    ) : (
                      <Button
                        label={`Start new bet`}
                        onClick={handleRestartBet}
                      />
                    )}
                  </>
                )}

                {state.betProgress === BetProgress.CLAIMED && (
                  <>
                    <GameDetailRow>
                      <GameDetailsLabel>Bet Id #{betId}</GameDetailsLabel>
                    </GameDetailRow>
                    <GameDetailRow>
                      <GameDetailsLabel>
                        You&apos;ve claimed your winnings
                      </GameDetailsLabel>
                    </GameDetailRow>
                    <Button
                      label={`Start new bet`}
                      onClick={handleRestartBet}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <GameDetailRow style={{ justifyContent: "space-around" }}>
                  {LIST_OF_SUITS.map((_suit) => (
                    <GameDetailBetItem
                      key={_suit}
                      selected={isTrue(selectedSuit === _suit)}
                      onClick={() => handleSuitChange(_suit)}
                    >
                      <Card shown suit={_suit} />
                    </GameDetailBetItem>
                  ))}
                </GameDetailRow>
                <GameDetailRow>
                  <GameDetailsLabel>Bet Amount: {betAmount}</GameDetailsLabel>
                  <GameDetailsLabel>
                    Your Balance: {balance}TON
                  </GameDetailsLabel>
                </GameDetailRow>
                <GameDetailRow style={{ gap: "8px" }}>
                  <Button
                    label={`+${BET_INCREMENTAL}`}
                    onClick={() =>
                      handleBetAmountChange(betAmount + BET_INCREMENTAL)
                    }
                  />
                  <Button
                    label={`-${BET_INCREMENTAL}`}
                    onClick={() =>
                      handleBetAmountChange(betAmount - BET_INCREMENTAL)
                    }
                  />
                </GameDetailRow>
                {connected ? (
                  <Button label="Submit Bet" onClick={handleSubmitBet} />
                ) : (
                  <Button
                    label="Connect Wallet"
                    onClick={() => tonConnectUI.openModal()}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <Button label="Open Menu" onClick={handleShowDetail} />
        )}
      </GameDetailsContainer>
    );
  }
);

GameDetails.displayName = "GameDetails";
export default GameDetails;
