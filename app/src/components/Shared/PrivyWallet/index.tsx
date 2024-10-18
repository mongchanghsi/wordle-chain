import { usePrivy, useLogin } from "@privy-io/react-auth";
import { PrivyWalletContainer } from "./style";
import { shortenAddress } from "@/utils/address";

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
          <button onClick={logout}>Disconnect</button>
        </>
      ) : (
        <button onClick={login}>Connect</button>
      )}
    </PrivyWalletContainer>
  );
};

export default PrivyWallet;
