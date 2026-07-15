import CartScreenCard from "@/components/ui/CartScreenCard";
import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import { clearUserCart, getLoggedUserCart } from "@/services/cart";
import { setClearCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Cart() {
  const { data: CartProducts, isPending } = useFetch({
    queryFn: getLoggedUserCart,
    queryKey: ["cartProducts"],
  });

  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const handleClear = async () => {
    Alert.alert("Clear", "Do you want to clear your cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sure",
        style: "destructive",
        onPress: async () => {
          await clearUserCart();
          queryClient.invalidateQueries({queryKey:["cartProducts"]})
          dispatch(setClearCart())
        },
      },
    ]);
  };

  const cartList = CartProducts?.data?.products ?? [];
  const totalCount = cartList.length;

  return (
    <View style={tw`flex-1 bg-stone-50 relative`}>
      <View
        style={tw`absolute inset-0 flex-row justify-between px-6 pointer-events-none`}
      >
        <View style={tw`border-r border-stone-200/30 h-full w-0`} />
        <View style={tw`border-l border-stone-200/30 h-full w-0`} />
      </View>

      <View style={tw`flex-1 pb-12 pt-16 px-6`}>
        <View style={tw`flex-row flex-wrap gap-1 items-center mb-2`}>
          <Text
            style={[
              tw`text-[9px] uppercase tracking-widest text-emerald-700 font-bold`,
              { fontFamily: "monospace" },
            ]}
          >
            Selected Items
          </Text>
        </View>

        <View style={tw`border-b border-stone-200 pb-6 mb-6 flex-col gap-1`}>
          <Text
            style={tw`text-3xl font-light tracking-tight text-stone-900 uppercase`}
          >
            Your Bag
          </Text>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={[
                tw`text-[10px] uppercase tracking-widest text-stone-400 font-medium`,
                { fontFamily: "monospace" },
              ]}
            >
              Curated Editions ({totalCount})
            </Text>
            {totalCount > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                activeOpacity={0.5}
                style={tw`flex-row items-center gap-1 py-2 px-2 bg-red-100 rounded-xl`}
              >
                <Text
                  style={[
                    tw`text-[9px] uppercase tracking-widest text-red-600 font-semibold`,
                    { fontFamily: "monospace" },
                  ]}
                >
                  Clear Cart
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isPending ? (
          <View style={tw`flex-1 items-center justify-center py-20`}>
            <ActivityIndicator size="small" color={tw.color("stone-400")} />
          </View>
        ) : totalCount === 0 ? (
          <View
            style={tw`py-16 border border-dashed border-stone-200/80 rounded-2xl bg-white/50 items-center justify-center`}
          >
            <Text
              style={[
                tw`text-[10px] font-medium text-stone-400 uppercase tracking-widest text-center px-8 leading-relaxed`,
                { fontFamily: "monospace" },
              ]}
            >
              This bag is currently empty — find something beautiful to add.
            </Text>
          </View>
        ) : (
          <FlatList
            data={cartList}
            keyExtractor={(item) => item.product._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-12`}
            renderItem={({ item }) => <CartScreenCard product={item} />}
          />
        )}
      </View>
    </View>
  );
}
