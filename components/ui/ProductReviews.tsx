import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import { useFetch } from "@/hooks/useFetch";
import { getProductReviews } from "@/services/reviews";

export default function ProductReviews({
  productId,
}: {
  productId: string;
}) {
  const [showAll, setShowAll] = useState(false);

  const { data, isPending, error } = useFetch({
    queryKey: ["productReviews", productId],
    queryFn: () => getProductReviews(productId),
  });

  const reviews = data?.reviews ?? data?.data ?? [];
  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  if (isPending) {
    return (
      <View style={tw`py-5`}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <Text style={tw`text-red-500 text-center`}>
        Failed to load reviews.
      </Text>
    );
  }

  return (
    <>
      <Text
        style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2 mt-5`}
      >
        Verified Reviews ({reviews.length})
      </Text>

      <View style={tw`bg-white border border-stone-200 rounded-2xl p-4 gap-3.5`}>
        {reviews.length ? (
          <>
            {displayedReviews.map((rev: any, idx: number) => (
              <View
                key={rev._id}
                style={[
                  tw`pb-3.5`,
                  idx !== displayedReviews.length - 1
                    ? tw`border-b border-stone-100`
                    : {},
                ]}
              >
                <View style={tw`flex-row justify-between items-center mb-1.5`}>
                  <View style={tw`flex-row gap-0.5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Ionicons
                        key={i}
                        name="star"
                        size={10}
                        color={i < rev.rating ? "#fbbf24" : "#e7e5e4"}
                      />
                    ))}
                  </View>

                  <Text
                    style={[
                      tw`text-[9px] text-stone-400`,
                      { fontFamily: "monospace" },
                    ]}
                  >
                    {new Date(rev.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </View>
                <Text style={tw`text-stone-700 text-xs font-bold tracking-wider`}>
                  {rev.user.name} : <Text style={tw`text-stone-500 text-xs italic leading-normal`}>
                  &quot;{rev.review?.trim() || "Rating Only"}&quot;
                </Text>
                </Text>
                
              </View>
            ))}

            {reviews.length > 5 && (
              <TouchableOpacity
                onPress={() => setShowAll(!showAll)}
                style={tw`pt-1 flex-row justify-center items-center gap-1`}
              >
                <Text style={tw`text-xs font-semibold text-stone-700`}>
                  {showAll
                    ? "See Less"
                    : `Read All ${reviews.length} Reviews`}
                </Text>

                <Ionicons
                  name={showAll ? "chevron-up" : "chevron-down"}
                  size={14}
                  color="#44403c"
                />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={tw`text-stone-400 text-xs text-center py-2`}>
            No customer reviews written yet.
          </Text>
        )}
      </View>
    </>
  );
}