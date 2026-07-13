import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Image, Pressable, Text, TouchableOpacity, View, Animated } from "react-native";
import tw from "@/lib/tw";
import { Products } from "@/types/products";
import { useRouter } from "expo-router";

type Props = {
  item: Products;
  index: number;
};

export default function ProductCard({ item, index }: Props) {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: Math.min(index * 60, 300),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 350,
        delay: Math.min(index * 60, 300),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, index]);

  const handleNavigation = () => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: item._id,
      },
    });
  };

  return (
    <Animated.View
      style={[
        tw`flex-1 mb-8 h-100`,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handleNavigation}
        activeOpacity={0.85}
        style={tw`flex-1`}
      >
        <View
          style={tw`relative bg-white border border-stone-200 rounded-2xl p-5 overflow-hidden`}
        >
          <Text
            style={[
              tw`absolute left-4 top-4 text-[10px] text-stone-300`,
              { fontFamily: "monospace" },
            ]}
          >
            {(index + 1).toString().padStart(2, "0")}
          </Text>

          <View
            style={tw`absolute right-4 mt-2 bg-primary rounded-full p-1.5 z-10`}
          >
            <Ionicons
              name="arrow-up"
              size={14}
              color="white"
              style={[
                {
                  transform: [{ rotate: "50deg" }],
                },
              ]}
            />
          </View>

          <Image
            source={{ uri: item.imageCover }}
            resizeMode="contain"
            style={tw`w-full h-48`}
          />
        </View>

        <View style={tw`mt-4`}>
          <View style={tw`flex-row justify-between`}>
            <Text
              style={[
                tw`text-[10px] uppercase text-emerald-700`,
                { fontFamily: "monospace" },
              ]}
            >
              {item.category.name}
            </Text>

            <Text
              style={[
                tw`text-[10px] uppercase text-stone-400`,
                { fontFamily: "monospace" },
              ]}
            >
              {item.brand.name}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={tw`text-sm font-bold uppercase tracking-wide mt-2 text-stone-900`}
          >
            {item.title.split(" ").slice(0, 4).join(" ")}
          </Text>

          <View
            style={tw`flex-row justify-between items-center border-t border-stone-200 mt-4 pt-3`}
          >
            <Text style={tw`font-bold text-stone-900`}>
              {item.price}
              <Text
                style={[
                  tw`text-[10px] text-stone-400`,
                  { fontFamily: "monospace" },
                ]}
              >
                {" "}
                EGP
              </Text>
            </Text>

            <View style={tw`flex-row items-center`}>
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text
                style={[
                  tw`ml-1 text-xs text-stone-600`,
                  { fontFamily: "monospace" },
                ]}
              >
                {item.ratingsAverage}
              </Text>
            </View>
          </View>

          <Pressable style={tw`bg-stone-900 rounded-xl mt-4 py-3 items-center`}>
            <Text style={tw`text-white text-sm font-semibold`}>Add to Cart</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}