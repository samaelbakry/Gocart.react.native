import tw from "@/lib/tw";
import { removeUserWishlist } from "@/services/wishlist";
import { Products } from "@/types/products";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddToCartButton from "../cart/AddToCartButton";

interface WishlistCardProps {
  product: Products;
}

export default function WishlistCard({ product }: WishlistCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const queryClient = useQueryClient();

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeUserWishlist(product._id);
      queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    } catch (error) {
      console.error(error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <View
      style={tw`flex-row border border-stone-200/60 bg-white rounded-2xl p-4 mb-4 items-center gap-4`}
    >
      <Image
        source={{ uri: product.imageCover }}
        style={tw`w-20 h-20 rounded-xl bg-stone-100`}
        resizeMode="cover"
      />

      <View style={tw`flex-1 justify-between py-1`}>
        <View style={tw`flex-row justify-between items-start gap-2 mb-2`}>
          <View style={tw`flex-1`}>
            <Text
              style={tw`text-sm font-semibold text-stone-900`}
              numberOfLines={1}
            >
              {product.title}
            </Text>
            <Text
              style={[
                tw`text-[10px] text-stone-400 uppercase tracking-wider mt-1`,
                { fontFamily: "monospace" },
              ]}
            >
              Price
            </Text>
            <Text style={tw`text-stone-800 font-bold mt-0.5`}>
              {product.price} EGP
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleRemove}
            disabled={isRemoving}
            style={tw`p-2 bg-stone-50 rounded-full border border-stone-100`}
          >
            {isRemoving ? (
              <ActivityIndicator size="small" color={tw.color("red-500")} />
            ) : (
              <Ionicons
                name="trash-outline"
                size={16}
                color={tw.color("stone-500")}
              />
            )}
          </TouchableOpacity>
        </View>
        <AddToCartButton productId={product._id} />
      </View>
    </View>
  );
}
