import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import { useFetch } from "@/hooks/useFetch";
import { getAllProducts } from "@/services/homePageServices";
import ProductCard from "@/components/products/ProductCard";
import { Products } from "@/types/products";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products } = useFetch({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
  });

  const searchedData = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return products.filter((item: Products) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.brand.name.toLowerCase().includes(query) ||
        item.category.name.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, products]);

  return (
    <Container style={tw`flex-1 pt-4`}>
      <View style={tw`px-4 pb-3`}>
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={tw`font-black text-xl text-stone-900 tracking-tight`}>
           Discover Products
          </Text>
          <View style={tw`bg-stone-100 shadow px-2.5 py-1 rounded-full`}>
            <Text style={tw`text-xs font-bold text-stone-600`}>
              {searchedData.length} {searchedData.length === 1 ? 'item' : 'items'}
            </Text>
          </View>
        </View>

        <View style={tw`flex-row items-center w-full bg-stone-200 rounded-2xl px-3.5 border border-transparent focus-within:border-stone-300`}>
          <Ionicons name="search" size={18} style={tw`text-stone-400 mr-2.5`} />
          
          <TextInput
            placeholder="Search products, brands..."
            placeholderTextColor="#a8a29e"
            style={tw`flex-1 py-3 text-stone-900 text-sm font-semibold`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCorrect={false}
          />

          {searchQuery.length > 0 && (
            <Pressable 
              onPress={() => setSearchQuery("")} 
              style={tw`p-1 hit-slop-[10]`}
            >
              <Ionicons name="close-circle" size={18} style={tw`text-stone-400 animate-fade-in`} />
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={searchedData}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={tw`gap-4 px-4 justify-between`}
        contentContainerStyle={tw`pt-4 pb-24`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag" 
        ListEmptyComponent={
          <View style={tw`pt-20 items-center justify-center px-8`}>
            <View style={tw`w-20 h-20 rounded-3xl bg-stone-50 border border-stone-100 items-center justify-center mb-5 shadow-sm`}>
              <Ionicons name="sparkles-outline" size={28} style={tw`text-stone-300`} />
            </View>
            <Text style={tw`text-base font-bold text-stone-900 text-center mb-1.5`}>
              No items discovered
            </Text>
            <Text style={tw`text-xs text-stone-400 text-center px-6 leading-relaxed font-medium`}>
              We couldn&apos;t find matching matches for &quot;{searchQuery}&quot;
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <ProductCard item={item} index={index} />
        )}
      />
    </Container>
  );
}