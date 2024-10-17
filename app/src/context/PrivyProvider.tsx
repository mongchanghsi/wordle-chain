"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ENVIRONMENT from "@/configuration/environment";
import { PrivyProvider } from "@privy-io/react-auth";

import { createConfig } from "@privy-io/wagmi";
import { sepolia } from "viem/chains";
import { http } from "wagmi";
import { WagmiProvider } from "@privy-io/wagmi";

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

export default function CustomPrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <PrivyProvider
      appId={ENVIRONMENT.PRIVY_ID}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        // embeddedWallets: {
        //   createOnLogin: "users-without-wallets",
        // },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
