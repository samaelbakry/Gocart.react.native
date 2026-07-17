import AddToCartButton from "@/components/cart/AddToCartButton";
import AddReview from "@/components/products/AddReview";
import ProductImageCarousel from "@/components/ui/ProductImageCarousel";
import ProductInfo from "@/components/ui/ProductInfo";
import ProductReviews from "@/components/ui/ProductReviews";
import AddToWishlistButton from "@/components/wishlist/AddToWishlistButton";
import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import { getSpecificProduct } from "@/services/homePageServices";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Share,
  Text,
  View
} from "react-native";

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const { data: itemDetails, isLoading } = useFetch({
    queryFn: () => getSpecificProduct(id),
    queryKey: ["getProductDetails", id],
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out the ${itemDetails?.title || "Product"} on our store!`,
      });
    } catch (error) {
      console.log("Error sharing product:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-stone-50`}>
        <ActivityIndicator size="large" color="#1c1917" />
      </View>
    );
  }

  if (!itemDetails) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-stone-50 p-6`}>
        <Text style={tw`text-stone-500 font-semibold text-center mb-4`}>
          Product details could not be found.
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={tw`bg-stone-900 px-5 py-3 rounded-xl`}
        >
          <Text style={tw`text-white font-medium`}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-stone-50`}>
      <View
        style={tw`flex-row justify-between items-center px-4 pt-12 pb-4 bg-white border-b border-stone-200`}
      >
        <Pressable
          onPress={() => router.back()}
          style={tw`bg-stone-100 p-2 rounded-full`}
        >
          <Ionicons name="arrow-back" size={20} color="#44403c" />
        </Pressable>
        <Text
          style={tw`text-xs font-bold uppercase tracking-widest text-stone-900`}
        >
          Product Details
        </Text>
        <Pressable
          onPress={handleShare}
          style={tw`bg-stone-100 p-2 rounded-full`}
        >
          <Ionicons name="share-social" size={18} color="#44403c" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={tw`pb-36`}
        showsVerticalScrollIndicator={false}
      >
        <ProductImageCarousel itemDetails={itemDetails} />

        <View style={tw`p-5`}>
          <ProductInfo itemDetails={itemDetails} />

          <AddReview productId={id}/>
          <ProductReviews productId={id} />
        </View>
      </ScrollView>

      <View
        style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-5 pb-8 flex-row items-center gap-4`}
      >
        <AddToWishlistButton productId={id} />

        <View style={tw`flex-1`}>
          <AddToCartButton productId={id} />
        </View>
      </View>
    </View>
  );
}
