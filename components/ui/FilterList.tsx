import tw from "@/lib/tw";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export const FILTER_DATA = [
  { id: "all", name: "All" },
  { id: "brands", name: "Brands" },
  { id: "categories", name: "Categories" },
] as const;

interface FilterItemProps {
  item: { id: string; name: string };
  isSelected: boolean;
  onPress: () => void;
}

const FilterItem = ({ item, isSelected, onPress }: FilterItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={tw`px-3 py-2 mx-1 mt-1 rounded-full border justify-center items-center ${
        isSelected
          ? "bg-stone-900 border-stone-900"
          : "bg-white border-stone-200"
      }`}
    >
      <Text
        style={tw`text-[11px] font-mono uppercase tracking-widest ${
          isSelected ? "text-white" : "text-stone-500"
        }`}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

type FilterType = "all" | "brands" | "categories";

type Props = {
  value: FilterType;
  onChange: (value: FilterType) => void;
};

export default function FilterList({ value, onChange }: Props) {
  return (
    <View style={tw`border-b border-stone-200/60 pb-3 pt-1`}>
      <FlatList
        data={FILTER_DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8 }}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <FilterItem
            item={item}
            isSelected={item.id === value}
            onPress={() => onChange(item.id)}
          />
        )}
      />
    </View>
  );
}
