import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "ton";
import { useAsyncInitialize } from "../common/useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { CHAIN } from "@tonconnect/protocol";

export const useTonClient = () => {
  const { network } = useTonConnect();

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;
      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
        }),
      });
    }, [network]),
  };
};
