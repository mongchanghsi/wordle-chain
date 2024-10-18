import { useState, useEffect, useCallback } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useWalletClient, usePublicClient } from "wagmi";
import { http } from "viem";
import { SmartAccountClient, createSmartAccountClient } from "permissionless";
import { toSimpleSmartAccount } from "permissionless/accounts";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { entryPoint07Address } from "viem/account-abstraction";
import { useSetActiveWallet } from "@privy-io/wagmi";

export function useSmartWalletClient() {
  const { authenticated, ready } = usePrivy();
  const { data: wagmiWalletClient } = useWalletClient();
  const { wallets } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();
  const publicClient = usePublicClient();

  const [smartAccountClient, setSmartAccountClient] =
    useState<SmartAccountClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setupSmartAccount = useCallback(async () => {
    if (!authenticated || !ready) {
      setSmartAccountClient(null);
      setIsLoading(false);
      return;
    }

    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );

    if (!embeddedWallet) {
      setError("No embedded wallet found");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Set the embedded wallet as the active wallet
      await setActiveWallet(embeddedWallet);

      // Create a wallet client from the embedded wallet

      const chain = wagmiWalletClient?.chain;
      if (!chain) throw new Error("Chain not found");

      const pimlicoUrl = `https://api.pimlico.io/v2/${chain.id}/rpc?apikey=pim_As77M6yp9fi7YKpymfBs84`;

      const pimlicoClient = createPimlicoClient({
        transport: http(pimlicoUrl),
        entryPoint: {
          address: entryPoint07Address,
          version: "0.7",
        },
      });

      const smartAccount = await toSimpleSmartAccount({
        client: publicClient!,
        owner: wagmiWalletClient,
        entryPoint: {
          address: entryPoint07Address,
          version: "0.7",
        },
      });

      const smartAccountClient = createSmartAccountClient({
        account: smartAccount,
        chain: chain,
        bundlerTransport: http(pimlicoUrl),
        paymaster: pimlicoClient,
        userOperation: {
          estimateFeesPerGas: async () => {
            return (await pimlicoClient.getUserOperationGasPrice()).fast;
          },
        },
      });

      setSmartAccountClient(smartAccountClient);
    } catch (err) {
      console.error("Error setting up smart account:", err);
      setError("Failed to set up smart account");
    } finally {
      setIsLoading(false);
    }
  }, [
    authenticated,
    wallets,
    setActiveWallet,
    wagmiWalletClient,
    ready,
    publicClient,
  ]);

  useEffect(() => {
    setupSmartAccount();
  }, [setupSmartAccount]);

  return { smartAccountClient, isLoading, error };
}
