import { selectedAuthenticated } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/store";
import { Stack } from "expo-router";

export default function AppNavigator() {
  const authenticated = useAppSelector(selectedAuthenticated);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {authenticated ? (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="brand/[id]" />
          <Stack.Screen name="category/[id]" />
        </>
      ) : (
        <>
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/signup" />
        </>
      )}
    </Stack>
  );
}