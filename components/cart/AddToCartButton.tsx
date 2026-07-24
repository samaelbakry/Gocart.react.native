import tw from "@/lib/tw";
import { addProductToCart } from "@/services/cart";
import { selectedAuthenticated } from "@/store/slices/authSlice";
import { selectedCart, setCart } from "@/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

type Props = {
  productId: string;
};

export default function AddToCartButton({ productId }: Props) {
  const [loading, setLoading] = useState(false);

  const disptch = useAppDispatch();
  const authenticated = useAppSelector(selectedAuthenticated);
  const cart = useAppSelector(selectedCart);
  const router = useRouter();
  const added = cart?.products.some((item) => item.product._id === productId);

  const queryClient = useQueryClient();

  const handlePress = async () => {
    if (loading || added) return;

    if (!authenticated) {
      Alert.alert(
        "Login Required",
        "Please log in or sign up to complete this process.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            style: "default",
            onPress: () => router.push("/(auth)/login"),
          },
        ],
      );
    }

    try {
      setLoading(true);
      const data = await addProductToCart(productId);

      if (data?.status === "success") {
        disptch(
          setCart({
            cart: data?.data,
            cartid: data?.cartId,
            numOfCartItems: data?.numOfCartItems,
          }),
        );
      }
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    } catch (error) {
      console.log(
        "Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={loading || added}
      style={tw.style(
        `rounded-xl py-3 items-center justify-center
`,
        added ? "bg-primary" : "bg-stone-900",
        loading && "opacity-70",
      )}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : added ? (
        <View style={tw`flex-row items-center`}>
          <Ionicons name="checkmark-circle" size={15} color="white" />
          <Text style={tw`text-white font-semibold ml-2`}>Added</Text>
        </View>
      ) : (
        <View style={tw`flex-row items-center`}>
          <Ionicons name="bag-handle-outline" size={15} color="white" />
          <Text style={tw`text-white font-semibold ml-2`}>Move To Bag</Text>
        </View>
      )}
    </Pressable>
  );
}
