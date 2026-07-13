import { View, Text, Image, Pressable, ScrollView, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useFetch } from "@/hooks/useFetch";
import { getSpecificBrand } from "@/services/getBrands";
import { getAllProducts } from "@/services/getProduct";
import { Products } from "@/types/products";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "@/components/products/ProductCard";

export default function BrandDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: brandDetails, isLoading } = useFetch({
    queryFn: () => getSpecificBrand(id),
    queryKey: ["getBrandDetails", id],
  });
  const { data: products } = useFetch({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
  });

  const specificBrand = products.filter((prod:Products)=>prod.brand._id === id)
  return (
    <View style={tw`flex-1 bg-stone-50 relative`}>
      <View style={tw`absolute inset-0 flex-row justify-between px-6 pointer-events-none`}>
        <View style={tw`border-r border-stone-200/40 h-full w-0`} />
        <View style={tw`h-full w-0`} />
      </View>

      <View style={tw`pb-12 pt-16 px-6`}>
        <View style={tw`flex-row flex-wrap gap-1 items-center mb-3`}>
          
          <Text style={tw`font-mono text-[9px] uppercase tracking-wider text-stone-900 font-medium`}>
            {specificBrand?.name || "Collection"}
          </Text>
        </View>

        <View style={tw`border-b border-stone-200 pb-8 mb-8 flex-col gap-2`}>
          <Text style={tw`text-3xl font-light tracking-tight text-stone-900 uppercase`}>
            {specificBrand?.name || "Brand Exhibit"}
          </Text>
          <Text style={tw`font-mono text-[10px] uppercase tracking-widest text-stone-400`}>
            Curated Editions ({specificBrand.length})
          </Text>
        </View>

        {specificBrand.length === 0 ? (
          <View style={tw`py-16 border border-dashed border-stone-200 rounded-2xl bg-white/40 items-center justify-center`}>
            <Text style={tw`text-xs font-light text-stone-400 font-mono uppercase tracking-widest text-center px-6`}>
              This brand is currently empty — new items coming soon.
            </Text>
          </View>
        ) : (
          <FlatList
            data={specificBrand}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={tw`gap-4 pb-10`}
            contentContainerStyle={tw`pt-6 pb-10`}
            renderItem={({ item, index }) => (
              <ProductCard item={item} index={index} />
            )}
          />
          
        )}
      </View>
    </View>
  );
}
