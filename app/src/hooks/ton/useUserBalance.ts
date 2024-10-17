import { useEffect, useState } from "react";
import { useTonConnect } from "./useTonConnect";
import { useTonClient } from "./useTonClient";
import { Address } from "ton";
import { toReadableTon } from "@/utils/parse";

const useUserBalance = () => {
  const { connected, wallet } = useTonConnect();
  const { client } = useTonClient();
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && wallet && client) {
        try {
          const userAddress = Address.parse(wallet);
          const accountInfo = await client.getBalance(userAddress);
          const balanceInTon = toReadableTon(Number(accountInfo));
          setBalance(balanceInTon.toString());
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, [connected, wallet, client]);

  return { balance };
};

export default useUserBalance;
