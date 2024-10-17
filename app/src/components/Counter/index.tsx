import { CounterContent, CounterLabel } from "./style";
import Button from "../Shared/Button";
import { useCounterContract } from "@/hooks/counter/useCounterContract";
import { useTonConnect } from "@/hooks/ton/useTonConnect";

const Counter = () => {
  const { connected } = useTonConnect();
  const { value, sendIncrement } = useCounterContract();

  return (
    <>
      <CounterContent>
        <CounterLabel>Value: {value}</CounterLabel>
      </CounterContent>
      <Button
        disabled={!connected}
        onClick={sendIncrement}
        label={"Increment"}
      />
    </>
  );
};

export default Counter;
