import AnimatedSplash from "@/components/splashScreen/AnimatedSplash";
import AppNavigator from "@/providers/AppNavigator";
import ReduxProvider from "@/providers/ReduxProvider";
import TanStackProvider from "@/providers/TanStackProvider";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

useEffect(() => {
  const prepare = async () => {
    await SplashScreen.hideAsync();

    setReady(false);

    setTimeout(() => {
      setReady(true);
    }, 2300);
  };

  prepare();
}, []);

  if (!ready) {
    return <AnimatedSplash />;
  }
  return (
    <ReduxProvider>
      <TanStackProvider>
        <AppNavigator />
      </TanStackProvider>
    </ReduxProvider>
  );
}
