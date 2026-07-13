import ReduxProvider from "@/providers/ReduxProvider";
import TanStackProvider from "@/providers/TanStackProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ReduxProvider>
      <TanStackProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="product/[id]"
            options={{
              title: "Product Details",
              headerShown:false
            }}
          />
          <Stack.Screen
            name="brand/[id]"
            options={{
              title: "Product Details",
              headerShown:false
            }}
          />
          <Stack.Screen
            name="category/[id]"
            options={{
              title: "Product Details",
              headerShown:false
            }}
          />
        </Stack>
      </TanStackProvider>
    </ReduxProvider>
  );
}