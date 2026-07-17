import { View, Text } from 'react-native'
import React from 'react'
import tw from '@/lib/tw'
import { Products } from '@/types/products'
import { Ionicons } from '@expo/vector-icons'

export default function ProductInfo({itemDetails}:{itemDetails:Products}) {
  return (
    <>
     <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={[
                tw`text-[10px] uppercase text-emerald-700 font-bold`,
                { fontFamily: "monospace" },
              ]}
            >
              {itemDetails.category?.name}
            </Text>
            <Text
              style={[
                tw`text-[10px] uppercase text-stone-400 font-bold`,
                { fontFamily: "monospace" },
              ]}
            >
              {itemDetails.brand?.name}
            </Text>
          </View>

          <Text
            style={tw`text-xl font-bold uppercase tracking-wide mt-2.5 text-stone-900`}
          >
            {itemDetails.title}
          </Text>

          <View style={tw`flex-row items-center mt-3 gap-3`}>
            <View
              style={tw`flex-row items-center bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200`}
            >
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text
                style={[
                  tw`ml-1 text-xs text-stone-700 font-bold`,
                  { fontFamily: "monospace" },
                ]}
              >
                {itemDetails.ratingsAverage}
              </Text>
              <Text style={tw`text-[10px] text-stone-400 ml-1`}>
                ({itemDetails.ratingsQuantity})
              </Text>
            </View>

            <View
              style={tw`bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200`}
            >
              <Text
                style={[
                  tw`text-xs text-stone-600 font-semibold`,
                  { fontFamily: "monospace" },
                ]}
              >
                {itemDetails.quantity > 0
                  ? `${itemDetails.quantity} available`
                  : "Out of Stock"}
              </Text>
            </View>
          </View>

          <View
            style={tw`border-y border-stone-200 my-5 py-4 flex-row justify-between items-center`}
          >
            <View>
              <Text
                style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider`}
              >
                Total Price
              </Text>
              <Text style={tw`text-2xl font-black text-stone-900 mt-0.5`}>
                {itemDetails.price}
                <Text
                  style={[
                    tw`text-xs text-stone-400 font-normal`,
                    { fontFamily: "monospace" },
                  ]}
                >
                  {" "}
                  EGP
                </Text>
              </Text>
            </View>
            <View style={tw`items-end`}>
              <Text
                style={[
                  tw`text-[9px] text-stone-400 uppercase font-bold`,
                  { fontFamily: "monospace" },
                ]}
              >
                Volume Sold
              </Text>
              <Text style={tw`text-xs font-bold text-stone-600 mt-1`}>
                {itemDetails.sold || 0} units orders
              </Text>
            </View>
          </View>

          <Text
            style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2`}
          >
            Product Specs
          </Text>
          <View style={tw`bg-white border border-stone-200 rounded-2xl p-4`}>
            <Text style={tw`text-stone-700 text-sm leading-relaxed`}>
              {itemDetails.description ||
                "No specific design or material configuration listed."}
            </Text>
          </View>

    </>
  )
}