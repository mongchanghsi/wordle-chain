import { Address, OpenedContract } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { useTonConnect } from "../ton/useTonConnect";
import { useAsyncInitialize } from "../common/useAsyncInitialize";
import { useTonClient } from "../ton/useTonClient";
import Counter from "@/contracts/counter";

/**
 * This is a sample counter contract that is available
 */
export function useCounterContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQBPEDbGdwaLv1DKntg9r6SjFIVplSaSJoJ-TVLe_2rqBOmH"
          : "EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb"
      )
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  const { data, isFetching } = useQuery(
    ["counter"],
    async () => {
      if (!counterContract) return null;
      return (await counterContract!.getCounter()).toString();
    },
    { refetchInterval: 3000 }
  );

  return {
    value: isFetching ? null : data,
    address: counterContract?.address.toString(),
    sendIncrement: () => {
      return counterContract?.sendIncrement(sender);
    },
  };
}
