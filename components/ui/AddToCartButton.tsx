import tw from "@/lib/tw";
import { addProductToCart } from "@/services/cart";
import { setCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  View,
} from "react-native";

type Props = {
  productId: string;
};

export default function AddToCartButton({ productId }: Props) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false)
  const disptch = useAppDispatch()

  const handlePress = async () => {
    if (loading || added) return;

    try {
      setLoading(true);

      const data = await addProductToCart(productId);

      if (data?.status === "success") {
        setAdded(true);
        disptch(setCart({
        cart:data?.data,
        cartid:data?.cartId,
        numOfCartItems: data?.numOfCartItems 
        }))
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Something went wrong"
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
        "rounded-xl py-3 items-center justify-center",
        added ? "bg-primary" : "bg-stone-900",
        loading && "opacity-70"
      )}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : added ? (
        <View style={tw`flex-row items-center`}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color="white"
          />
          <Text style={tw`text-white font-semibold ml-2`}>
            Added to Cart
          </Text>
        </View>
      ) : (
        <Text style={tw`text-white text-sm font-semibold`}>
          Add To Cart
        </Text>
      )}
    </Pressable>
  );
}