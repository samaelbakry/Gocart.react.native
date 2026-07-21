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
 async function prepare() {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setReady(true);
    }, 2300);
  }

  prepare();
}, []);

  return (
    <ReduxProvider>
      <TanStackProvider>
        {!ready ? <AnimatedSplash/> : <AppNavigator />} 
      </TanStackProvider>
    </ReduxProvider>
  );
}
