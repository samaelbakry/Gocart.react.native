import WishlistCard from "@/components/wishlist/WishlistCard";
import { useFetch } from "@/hooks/useFetch";
import tw from "@/lib/tw";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from "react-native";

import { getLoggedUserWishlist } from "@/services/wishlist";

export default function Wishlist() {
  const { data: WishlistData, isPending } = useFetch({
    queryFn: getLoggedUserWishlist,
    queryKey: ["wishlistProducts"],
  });

  const wishlistList = WishlistData?.data ?? [];
  const totalCount = wishlistList.length;

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
            Saved Items
          </Text>
        </View>

        <View style={tw`border-b border-stone-200 pb-6 mb-6 flex-col gap-1`}>
          <Text
            style={tw`text-3xl font-light tracking-tight text-stone-900 uppercase`}
          >
            Wishlist
          </Text>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={[
                tw`text-[10px] uppercase tracking-widest text-stone-400 font-medium`,
                { fontFamily: "monospace" },
              ]}
            >
              Favourited items ({totalCount})
            </Text>
            
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
              Your wishlist is empty — save items here for later inspiration.
            </Text>
          </View>
        ) : (
          <FlatList
            data={wishlistList}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-12`}
            renderItem={({ item }) => (
              <WishlistCard
                product={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}