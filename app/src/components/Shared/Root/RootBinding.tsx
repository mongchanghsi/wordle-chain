import { useViewport, bindViewportCSSVars } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";

// TODO: Not sure why calling either themeParams or viewport will solve the TelegramGameProxy.receiveEvent issue
const RootBinding = ({ children }: PropsWithChildren) => {
  // const lp = useLaunchParams();
  // const miniApp = useMiniApp();
  // const themeParams = useThemeParams();

  // useEffect(() => {
  //   return bindMiniAppCSSVars(miniApp, themeParams);
  // }, [miniApp, themeParams]);

  // useEffect(() => {
  //   return bindThemeParamsCSSVars(themeParams);
  // }, [themeParams]);

  const viewport = useViewport();

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return <>{children}</>;
};

export default RootBinding;
