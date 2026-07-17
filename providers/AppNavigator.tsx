import { selectedAuthenticated } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/store";
import { Stack  } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const authenticated = useAppSelector(selectedAuthenticated);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={authenticated === true}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="brand/[id]" />
        <Stack.Screen name="category/[id]" />
      </Stack.Protected>

      <Stack.Protected guard={authenticated !== true}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
      </Stack.Protected>
      <StatusBar style="dark" />
    </Stack>
  );
}