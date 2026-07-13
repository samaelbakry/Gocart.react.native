import BrandCard from "@/components/brands/BrandsCard";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/ui/Container";
import FilterList from "@/components/ui/FilterList";
import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import { getBrands } from "@/services/getBrands";
import { getAllProducts } from "@/services/getProduct";
import React, { useState } from "react";
import { FlatList, View, Text } from "react-native";

export default function Index() {
  const [filter, setFilter] = useState<"all" | "brands" | "categories">("all");
  const { data: products } = useFetch({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
  });
  const { data: brands } = useFetch({
    queryFn: getBrands,
    queryKey: ["getAllBrands"],
  });

  return (
    <Container style={{ flex: 1 }}>
      <FilterList value={filter} onChange={setFilter} />
      {filter === "all" && (
        <>
          <View style={tw`absolute inset-0 flex-row px-6`} pointerEvents="none">
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1`} />
          </View>

          <View style={tw`px-5 pb-6 border-b border-stone-200 relative z-10`}>
            <Text style={tw`text-4xl font-light tracking-tight text-stone-900`}>
              The Full{" "}
              <Text style={tw`font-serif italic text-emerald-600`}>Collection</Text>
            </Text>

            <Text style={tw`text-sm text-stone-500 font-light leading-relaxed mt-3`}>
              Every piece, every house, one catalog — curated for those who
              notice the details.
            </Text>
          </View>

          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={tw`gap-4 px-5`}
            contentContainerStyle={tw`pt-6 pb-10`}
            renderItem={({ item, index }) => (
              <ProductCard item={item} index={index} />
            )}
          />
        </>
      )}

      {filter === "brands" && (
        <>
          <View style={tw`absolute inset-0 flex-row px-6`} pointerEvents="none">
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1`} />
          </View>

          <View style={tw`px-5 pb-6 border-b border-stone-200 relative z-10`}>
            <Text style={tw`text-4xl font-light tracking-tight text-stone-900`}>
              Houses of{" "}
              <Text style={tw`font-serif italic text-emerald-600`}>Design</Text>
            </Text>

            <Text style={tw`text-sm text-stone-500 font-light leading-relaxed mt-3`}>
              Discover global and local houses shaping contemporary aesthetics,
              architecture, and craftsmanship.
            </Text>
          </View>

          <FlatList
            data={brands}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={tw`gap-4 px-5`}
            contentContainerStyle={tw`pt-6 pb-10`}
            renderItem={({ item, index }) => (
              <BrandCard item={item} index={index} />
            )}
          />
        </>
      )}
    </Container>
  );
}