import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import { addProductToWishlist, getLoggedUserWishlist } from "@/services/wishlist";
import { selectedAuthenticated } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable } from "react-native";

export default function AddToWishlistButton({ productId}: { productId: string }) {

 const { data: WishlistData } = useFetch({
    queryFn: getLoggedUserWishlist,
    queryKey: ["wishlistProducts"],
  });

  const wishlistList = WishlistData?.data ?? [];
  const added = wishlistList?.some((item:any)=>(item._id === productId)) ?? false

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient()
  const authenticated = useAppSelector(selectedAuthenticated)
  const router = useRouter()

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
      console.log(added);
      const data = await addProductToWishlist(productId);
      if (data?.status === "success") {
      }
      queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
    } catch (error) {
      console.log("Error", error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={tw`border ${added ? "border-red-200 bg-red-50" : " border-stone-200 bg-stone-50"}  p-3.5 rounded-xl justify-center items-center `}
    >
      {loading ? (
        <ActivityIndicator size={20} color={"gray"} />
      ) : (
        <Ionicons
          name={`${added ? "heart" : "heart-outline"}`}
          size={20}
          color={`${added ? "red" : "#44403c"}`}
        />
      )}
    </Pressable>
  );
}
