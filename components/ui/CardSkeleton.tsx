import { Animated, View } from "react-native";
import { useEffect, useRef } from "react";
import tw from "@/lib/tw";

export default function CardSkeleton() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        tw`flex-1 mb-8 h-100`,
        {
          opacity,
        },
      ]}
    >
      <View
        style={tw`bg-white border border-stone-200 rounded-2xl p-5 overflow-hidden`}
      >
        <View style={tw`w-6 h-3 rounded bg-stone-200`} />

        <View
          style={tw`absolute right-4 top-4 w-7 h-7 rounded-full bg-stone-200`}
        />

        <View style={tw`w-full h-48 rounded-xl bg-stone-200 mt-4`} />
      </View>

      <View style={tw`mt-4`}>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`w-16 h-3 rounded bg-stone-200`} />
          <View style={tw`w-14 h-3 rounded bg-stone-200`} />
        </View>

        <View style={tw`w-full h-5 rounded bg-stone-200 mt-3`} />

        <View
          style={tw`flex-row justify-between items-center border-t border-stone-200 mt-4 pt-3`}
        >
          <View style={tw`w-20 h-5 rounded bg-stone-200`} />
          <View style={tw`w-12 h-4 rounded bg-stone-200`} />
        </View>

        <View style={tw`mt-4 h-12 rounded-xl bg-stone-200`} />
      </View>
    </Animated.View>
  );
}