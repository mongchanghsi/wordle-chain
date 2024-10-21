import { wordleV2Abi, wordleV2Address } from "@/generated";
import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import Spinner from "../Shared/Loader/Spinner";
import {
  LeaderboardContainer,
  LeaderboardRow,
  LeaderboardRowItem,
} from "./style";
import { shortenAddress } from "@/utils/address";

type ILeaderboardRecord = {
  address: `0x${string}`;
  record: number;
};

const Leaderboard = () => {
  const publicClient = usePublicClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ILeaderboardRecord[]>([]);

  const fetchData = async () => {
    if (!publicClient) return;
    setLoading(true);
    try {
      const size = await publicClient.readContract({
        address: wordleV2Address,
        abi: wordleV2Abi,
        functionName: "getLeaderboardSize",
        args: [],
      });
      const numSize = Number(size);
      const output = [];
      for (let i = 0; i < numSize; i++) {
        output.push(
          await publicClient.readContract({
            address: wordleV2Address,
            abi: wordleV2Abi,
            functionName: "getLeaderboardEntry",
            args: [BigInt(i)],
          })
        );
      }
      const awaitedOutput = await Promise.all(output);
      setData(
        awaitedOutput.map((_record) => {
          return {
            address: _record[0],
            record: Number(_record[1]),
          };
        })
      );
    } catch (error) {
      console.log("Leaderboard | Error - ", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LeaderboardContainer>
      <LeaderboardRow>
        <LeaderboardRowItem>Address</LeaderboardRowItem>
        <LeaderboardRowItem>Guesses</LeaderboardRowItem>
      </LeaderboardRow>
      {loading ? (
        <Spinner />
      ) : (
        data.map((_record) => (
          <LeaderboardRow key={_record.address}>
            <LeaderboardRowItem>
              {shortenAddress(_record.address)}
            </LeaderboardRowItem>
            <LeaderboardRowItem>{_record.record}</LeaderboardRowItem>
          </LeaderboardRow>
        ))
      )}
    </LeaderboardContainer>
  );
};

export default Leaderboard;
