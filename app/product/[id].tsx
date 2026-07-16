import AddToCartButton from "@/components/cart/AddToCartButton";
import AddToWishlistButton from "@/components/wishlist/AddToWishlistButton";
import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import { getSpecificProduct } from "@/services/homePageServices";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const imageCarouselRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const scrollToImage = (index: number) => {
    setActiveIndex(index);
    imageCarouselRef.current?.scrollTo({
      x: index * (width - 40),
      animated: true,
    });
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
        <View
          style={tw`bg-white border-b border-stone-200 p-5 items-center justify-center`}
        >
          <ScrollView
            ref={imageCarouselRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / (width - 40),
              );
              setActiveIndex(newIndex);
            }}
            style={{ width: width - 40, height: 320 }}
          >
            {itemDetails.images && itemDetails.images.length > 0 ? (
              itemDetails.images.map((imgUrl: string, idx: number) => (
                <Image
                  key={idx}
                  source={{ uri: imgUrl }}
                  resizeMode="contain"
                  style={{ width: width - 40, height: 320 }}
                />
              ))
            ) : (
              <Image
                source={{ uri: itemDetails.imageCover }}
                resizeMode="contain"
                style={{ width: width - 40, height: 320 }}
              />
            )}
          </ScrollView>

          {itemDetails.images && itemDetails.images.length > 1 && (
            <View style={tw`flex-row mt-4 gap-2 justify-center flex-wrap`}>
              {itemDetails.images.map((imgUrl: string, idx: number) => (
                <Pressable
                  key={idx}
                  onPress={() => scrollToImage(idx)}
                  style={tw`border ${activeIndex === idx ? "border-stone-900 bg-stone-100" : "border-stone-200 bg-white"} rounded-xl p-1`}
                >
                  <Image
                    source={{ uri: imgUrl }}
                    style={tw`w-11 h-11`}
                    resizeMode="contain"
                  />
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={tw`p-5`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={[
                tw`text-[10px] uppercase text-emerald-700 font-bold`,
                { fontFamily: "monospace" },
              ]}
            >
              {itemDetails.category?.name}
            </Text>
            <Text
              style={[
                tw`text-[10px] uppercase text-stone-400 font-bold`,
                { fontFamily: "monospace" },
              ]}
            >
              {itemDetails.brand?.name}
            </Text>
          </View>

          <Text
            style={tw`text-xl font-bold uppercase tracking-wide mt-2.5 text-stone-900`}
          >
            {itemDetails.title}
          </Text>

          <View style={tw`flex-row items-center mt-3 gap-3`}>
            <View
              style={tw`flex-row items-center bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200`}
            >
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text
                style={[
                  tw`ml-1 text-xs text-stone-700 font-bold`,
                  { fontFamily: "monospace" },
                ]}
              >
                {itemDetails.ratingsAverage}
              </Text>
              <Text style={tw`text-[10px] text-stone-400 ml-1`}>
                ({itemDetails.ratingsQuantity})
              </Text>
            </View>

            <View
              style={tw`bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200`}
            >
              <Text
                style={[
                  tw`text-xs text-stone-600 font-semibold`,
                  { fontFamily: "monospace" },
                ]}
              >
                {itemDetails.quantity > 0
                  ? `${itemDetails.quantity} available`
                  : "Out of Stock"}
              </Text>
            </View>
          </View>

          <View
            style={tw`border-y border-stone-200 my-5 py-4 flex-row justify-between items-center`}
          >
            <View>
              <Text
                style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider`}
              >
                Total Price
              </Text>
              <Text style={tw`text-2xl font-black text-stone-900 mt-0.5`}>
                {itemDetails.price}
                <Text
                  style={[
                    tw`text-xs text-stone-400 font-normal`,
                    { fontFamily: "monospace" },
                  ]}
                >
                  {" "}
                  EGP
                </Text>
              </Text>
            </View>
            <View style={tw`items-end`}>
              <Text
                style={[
                  tw`text-[9px] text-stone-400 uppercase font-bold`,
                  { fontFamily: "monospace" },
                ]}
              >
                Volume Sold
              </Text>
              <Text style={tw`text-xs font-bold text-stone-600 mt-1`}>
                {itemDetails.sold || 0} units orders
              </Text>
            </View>
          </View>

          <Text
            style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2`}
          >
            Product Specs
          </Text>
          <View style={tw`bg-white border border-stone-200 rounded-2xl p-4`}>
            <Text style={tw`text-stone-700 text-sm leading-relaxed`}>
              {itemDetails.description ||
                "No specific design or material configuration listed."}
            </Text>
          </View>

          <Text
            style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2 mt-5`}
          >
            Verified Reviews ({itemDetails.reviews?.length || 0})
          </Text>
          <View
            style={tw`bg-white border border-stone-200 rounded-2xl p-4 gap-3.5`}
          >
            {itemDetails.reviews && itemDetails.reviews.length > 0 ? (
              itemDetails.reviews.slice(0, 5).map((rev: any, idx: number) => (
                <View
                  key={rev._id}
                  style={[
                    tw`pb-3.5`,
                    idx !== Math.min(itemDetails.reviews.length, 5) - 1
                      ? tw`border-b border-stone-100`
                      : {},
                  ]}
                >
                  <View
                    style={tw`flex-row justify-between items-center mb-1.5`}
                  >
                    <View style={tw`flex-row gap-0.5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={10}
                          color={i < rev.rating ? "#fbbf24" : "#e7e5e4"}
                        />
                      ))}
                    </View>
                    <Text
                      style={[
                        tw`text-[9px] text-stone-400`,
                        { fontFamily: "monospace" },
                      ]}
                    >
                      {new Date(rev.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                  <Text
                    style={tw`text-stone-600 text-xs italic leading-normal`}
                  >
                    "
                    {rev.review && rev.review.trim().length > 0
                      ? rev.review
                      : "Rating Only"}
                    "
                  </Text>
                </View>
              ))
            ) : (
              <Text style={tw`text-stone-400 text-xs text-center py-2`}>
                No customer reviews written yet.
              </Text>
            )}
          </View>
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
