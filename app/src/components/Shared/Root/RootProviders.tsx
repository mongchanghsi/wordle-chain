import { SDKProvider, isTMA } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect, useState } from "react";
import RootLayout from "./RootLayout";
import RootBinding from "./RootBinding";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "@/theme";
import CustomPrivyProvider from "@/context/PrivyProvider";

const RootProviders = ({ children }: PropsWithChildren) => {
  const debug = false;
  const [isInTelegramWebApp, setIsInTelegramWebApp] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());

      // mockTelegramEnv({
      //   themeParams: {
      //     accentTextColor: "#6ab2f2",
      //     bgColor: "#17212b",
      //     buttonColor: "#5288c1",
      //     buttonTextColor: "#ffffff",
      //     destructiveTextColor: "#ec3942",
      //     headerBgColor: "#17212b",
      //     hintColor: "#708499",
      //     linkColor: "#6ab3f3",
      //     secondaryBgColor: "#232e3c",
      //     sectionBgColor: "#17212b",
      //     sectionHeaderTextColor: "#6ab3f3",
      //     subtitleTextColor: "#708499",
      //     textColor: "#f5f5f5",
      //   },
      //   initData: {
      //     user: {
      //       id: 99281932,
      //       firstName: "Andrew",
      //       lastName: "Rogue",
      //       username: "rogue",
      //       languageCode: "en",
      //       isPremium: true,
      //       allowsWriteToPm: true,
      //     },
      //     hash: "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
      //     authDate: new Date(1716922846000),
      //     startParam: "debug",
      //     chatType: "sender",
      //     chatInstance: "8428209589180549439",
      //   },
      //   initDataRaw: new URLSearchParams([
      //     [
      //       "user",
      //       JSON.stringify({
      //         id: 99281932,
      //         first_name: "Andrew",
      //         last_name: "Rogue",
      //         username: "rogue",
      //         language_code: "en",
      //         is_premium: true,
      //         allows_write_to_pm: true,
      //       }),
      //     ],
      //     [
      //       "hash",
      //       "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
      //     ],
      //     ["auth_date", "1716922846"],
      //     ["start_param", "debug"],
      //     ["chat_type", "sender"],
      //     ["chat_instance", "8428209589180549439"],
      //   ]).toString(),
      //   version: "7.2",
      //   platform: "tdesktop",
      // });
    }
  }, [debug]);

  useEffect(() => {
    const checkIsTelegramApp = async () => {
      try {
        const result = await isTMA();
        setIsInTelegramWebApp(result);
      } catch (error) {
        console.error("Error checking if in Telegram Web App:", error);
        setIsInTelegramWebApp(false);
      }
    };

    checkIsTelegramApp();
  }, []);

  if (isInTelegramWebApp === null) {
    return <div>Loading...</div>;
  }

  return (
    <CustomPrivyProvider>
      <SDKProvider acceptCustomStyles debug={debug}>
        <ThemeProvider theme={darkTheme}>
          <RootLayout>
            {isInTelegramWebApp ? (
              <RootBinding>{children}</RootBinding>
            ) : (
              <div>
                This app is designed to run within Telegram. Please open it in
                the Telegram app.
              </div>
            )}
          </RootLayout>
        </ThemeProvider>
      </SDKProvider>
    </CustomPrivyProvider>
  );
};

export default RootProviders;
