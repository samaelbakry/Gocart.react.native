import tw from "@/lib/tw";
import {
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/services/cart";
import { setCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import { CartProduct } from "@/types/cart";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  product: CartProduct;
};

export default function CartScreenCard({ product }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const displayTitle = product.product.title.slice(0, 25);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleCartAction = async (action: () => Promise<any>) => {
    try {
      const data = await action();
      dispatch(
        setCart({
          cart: data.data,
          cartid: data.cartId,
          numOfCartItems: data.numOfCartItems,
        }),
      );
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    } catch (error) {
      Alert.alert(
        "error",
        error instanceof Error ? error.message : "something went wrong",
      );
    }
  };
  
  return (
    <View
      style={tw`flex-row items-center justify-between py-5 border-b border-stone-200/60 bg-transparent gap-4`}
    >
      <View style={tw`flex-row items-center gap-4 flex-1`}>
        <View
          style={tw`relative overflow-hidden bg-white border border-stone-200 rounded-xl p-3 w-22 h-22 items-center justify-center shrink-0 shadow-sm`}
        >
          {!imageLoaded && (
            <View
              style={tw`absolute inset-0 items-center justify-center bg-stone-50`}
            >
              <View style={tw`w-8 h-8 rounded bg-stone-100/80`} />
            </View>
          )}
          <Image
            source={{ uri: product.product.imageCover }}
            resizeMode="contain"
            style={tw`w-16 h-16`}
            onLoad={() => setImageLoaded(true)}
          />
        </View>

        <View style={tw`flex-1 justify-center gap-3`}>
          <View style={tw`gap-0.5`}>
            <Text
              style={[
                tw`text-[9px] uppercase tracking-wider text-emerald-800 font-bold`,
                { fontFamily: "monospace" },
              ]}
            >
              {product.product.brand?.name || "Premium"} •{" "}
              {product.product.category?.name || "Edition"}
            </Text>
            <Text
              numberOfLines={1}
              style={tw`text-sm font-semibold text-stone-900 tracking-tight`}
            >
              {displayTitle}
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-1`}>
            <TouchableOpacity
              onPress={() =>
                handleCartAction(() =>
                  updateCartProductQuantity(
                    product.product._id,
                    product.count - 1,
                  ),
                )
              }
              activeOpacity={0.6}
              style={tw`w-7 h-7 flex items-center justify-center border border-stone-200 rounded-lg bg-white active:bg-stone-50 active:border-stone-300`}
            >
              <Ionicons
                name="remove"
                size={12}
                color={tw.color("text-stone-600")}
              />
            </TouchableOpacity>

            <Text
              style={[
                tw`font-mono text-xs font-bold w-8 text-center text-stone-900`,
                { fontFamily: "monospace" },
              ]}
            >
              {product.count}
            </Text>

            <TouchableOpacity
              onPress={() =>
                handleCartAction(() =>
                  updateCartProductQuantity(
                    product.product._id,
                    product.count + 1,
                  ),
                )
              }
              activeOpacity={0.6}
              style={tw`w-7 h-7 flex items-center justify-center border border-stone-200 rounded-lg bg-white active:bg-stone-50 active:border-stone-300`}
            >
              <Ionicons
                name="add"
                size={12}
                color={tw.color("text-stone-600")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={tw`items-end justify-between h-22 pl-2`}>
        <View style={tw`items-end gap-0.5`}>
          <Text style={tw`text-base font-bold text-stone-900 tracking-tight`}>
            {product.price * product.count}{" "}
            <Text
              style={[
                tw`text-[9px] font-normal text-stone-400`,
                { fontFamily: "monospace" },
              ]}
            >
              EGP
            </Text>
          </Text>

          <Text
            style={[
              tw`text-[9px] text-stone-400 uppercase tracking-wider`,
              { fontFamily: "monospace" },
            ]}
          >
            {product.count} × {product.price}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            handleCartAction(() => removeProductFromCart(product.product._id))
          }
          activeOpacity={0.5}
          style={tw`flex-row items-center gap-1 py-2 px-2 bg-stone-200 rounded-xl`}
        >
          <Text
            style={[
              tw`text-[9px] uppercase tracking-widest text-stone-600 font-semibold`,
              { fontFamily: "monospace" },
            ]}
          >
            Remove
          </Text>
          <Ionicons
            name="trash-outline"
            size={11}
            color={tw.color("text-stone-600")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
