import { usePrivy, useLogin } from "@privy-io/react-auth";
import { PrivyWalletContainer } from "./style";
import { shortenAddress } from "@/utils/address";
import Button from "../Button";

const PrivyWallet = () => {
  const { login } = useLogin({
    onComplete: () => console.log("ok"),
  });

  const { ready, authenticated, user, logout } = usePrivy();

  const wallet = user?.wallet;

  return (
    <PrivyWalletContainer>
      {ready && authenticated ? (
        <>
          {wallet && <p>{shortenAddress(wallet.address)}</p>}
          <Button onClick={logout} label="Disconnect"></Button>
        </>
      ) : (
        <Button onClick={login} label="Connect"></Button>
      )}
    </PrivyWalletContainer>
  );
};

export default PrivyWallet;
