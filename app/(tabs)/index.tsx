import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/ui/Container";
import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import { getAllProducts } from "@/services/getProduct";
import React from "react";
import { FlatList, View } from "react-native";

export default function Index() {
  const { data } = useFetch({queryFn:getAllProducts , queryKey:["getAllProducts"]});

  return (
    <Container style={{flex:1}}>
      <View
        style={tw`absolute inset-y-0 left-1/2 w-[1px] bg-stone-200/40 z-0`}
        pointerEvents="none"
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={tw`gap-4 px-5`}
        contentContainerStyle={tw`pt-6 pb-10`}
        renderItem={({ item, index }) => (
          <ProductCard item={item} index={index} />
        )}
      />
    </Container>
  );
}
