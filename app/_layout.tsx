import AppNavigator from "@/providers/AppNavigator";
import ReduxProvider from "@/providers/ReduxProvider";
import TanStackProvider from "@/providers/TanStackProvider";

export default function RootLayout() {
  return (
    <ReduxProvider>
        <TanStackProvider>
          <AppNavigator />
        </TanStackProvider>
    </ReduxProvider>
  );
}
