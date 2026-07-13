import tw from "@/lib/tw";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Category } from "@/types/products";

export default function CategoriesCard({
  item,
  index,
}: {
  item: Category;
  index: number;
}) {
  const [pressed, setPressed] = useState(false);

  const handleNavigation = () => {
    router.push({
      pathname: "/category/[id]",
      params: {
        id: item._id,
      },
    });
  };

  return (
    <Pressable
      style={tw`flex-1`}
      onPress={handleNavigation}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View
        style={tw.style(
          `relative overflow-hidden bg-white border border-stone-200 rounded-xl p-6`,
          pressed && `border-stone-400`
        )}
      >
        <Text style={tw`absolute top-4 left-4 text-[10px] font-mono text-stone-300`}>
          C/{String(index + 1).padStart(2, "0")}
        </Text>

        <View style={tw`w-full h-44 items-center justify-center`}>
          <Image
            source={{ uri: item.image }}
            style={tw.style(`w-full h-full`, pressed && `scale-102`)}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={tw`pt-4 flex-row items-start justify-between gap-4 border-t border-stone-200/60 mt-3`}>
        <View style={tw`flex-1`}>
          <Text
            style={tw.style(
              `text-sm font-bold text-stone-900 tracking-wide uppercase`,
              pressed && `text-emerald-600`
            )}
            numberOfLines={1}
          >
            {item.name}
          </Text>
        </View>

        <Ionicons
          name="arrow-up-outline"
          size={14}
          style={tw.style(
            `text-stone-300 mt-0.5`,
            pressed && `text-stone-900`
          )}
        />
      </View>
    </Pressable>
  );
}