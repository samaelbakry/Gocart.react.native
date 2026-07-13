import tw from "@/lib/tw";
import React from "react";
import { FlatList } from "react-native";
import CardSkeleton from "./CardSkeleton";

export default function SkeletonList() {
  return (
    <FlatList
      data={Array.from({ length: 6 })}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={tw`gap-4 px-5`}
      contentContainerStyle={tw`pt-6 pb-10`}
      renderItem={() => <CardSkeleton />}
    />
  );
}
