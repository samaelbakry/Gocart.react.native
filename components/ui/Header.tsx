import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tw";

type Props = {
  heading: string;
  primaryText?: string;
  subText?: string;
};

export default function Header({ heading, primaryText, subText }: Props) {
  return (
    <>
      <View style={tw`absolute inset-0 flex-row px-6`} pointerEvents="none">
        <View style={tw`flex-1 border-r border-stone-200/40`} />
        <View style={tw`flex-1 border-r border-stone-200/40`} />
        <View style={tw`flex-1`} />
      </View>

      <View style={tw`px-5 pb-6 border-b border-stone-200 relative z-10 mt-2`}>
        <Text style={tw`text-4xl font-light tracking-tight text-stone-900`}>
          {heading}{" "}
          <Text style={tw`font-serif italic text-primary`}>{primaryText}</Text>
        </Text>
        {subText && (
          <Text
            style={tw`text-sm text-stone-500 font-light leading-relaxed mt-3`}
          >
            {subText}
          </Text>
        )}
      </View>
    </>
  );
}
