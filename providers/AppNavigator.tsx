import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {

  return (
     <>

      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="brand/[id]" />
          <Stack.Screen name="category/[id]" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/signup" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}