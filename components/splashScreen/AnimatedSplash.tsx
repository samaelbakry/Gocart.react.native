import LottieView from "lottie-react-native";
import React from "react";
import Animated, { FadeOut } from "react-native-reanimated";

import tw from "@/lib/tw";
import { Text } from "react-native";

export default function AnimatedSplash() {
  return (
    <Animated.View
      exiting={FadeOut.duration(500)}
      style={tw`flex-1 bg-white items-center justify-center`}
    >
      <LottieView
        source={require("@/assets/animation/Shop.json")}
        autoPlay
        loop={false}
        style={{
          width: 220,
          height: 220,
        }}
      />
      <Text style={tw`mt-6 text-center text-stone-500 tracking-wide leading-6`}>
        Where Great Shopping Begins{"\n"}
        <Text style={tw`text-stone-400 text-sm`}>Fast • Secure • Reliable</Text>
      </Text>
    </Animated.View>
  );
}
