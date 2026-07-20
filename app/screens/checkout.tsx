import Container from "@/components/ui/Container";
import { checkoutSchema, checkoutSchemaType } from "@/schemas/checkoutschema";
import { addCashOrder, addVisaOrder } from "@/services/checkout";
import {
  selectedCart,
  selectedCartCount,
  setClearCart,
} from "@/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ShippingAddress } from "@/types/cart";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

type FormErrors = {
  details?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
};

export default function Checkout() {
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const Cart = useAppSelector(selectedCart);
  const noOfCartItems = useAppSelector(selectedCartCount);
  const cartId = useAppSelector(selectedCart)?._id;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<checkoutSchemaType>({
    details: "",
    phone: "",
    city: "",
    postalCode: "",
    type: "cash",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    field: keyof checkoutSchemaType,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  function resetCheckout() {
    dispatch(setClearCart());

    setFormData({
      details: "",
      phone: "",
      city: "",
      postalCode: "",
      type: "cash",
    });

    setErrors({});
  }

  async function handleOrder() {
    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setErrors({
        details: errors.details?.[0],
        phone: errors.phone?.[0],
        city: errors.city?.[0],
        postalCode: errors.postalCode?.[0],
      });

      return;
    }

    if (!cartId) {
      Alert.alert("Error", "Cart not ready yet");
      return;
    }

    const { details, phone, city, postalCode } = formData;

    const cashOrder: ShippingAddress = {
      details,
      phone,
      city,
      postalCode,
    };

    const visaOrder = {
      details,
      phone,
      city,
    };

    try {
      setIsFormSubmitting(true);

      if (formData.type === "cash") {
        const data = await addCashOrder(cartId, cashOrder);

        resetCheckout();
        queryClient.invalidateQueries({queryKey:["userOrders"]})
        queryClient.setQueryData(["cartProducts"], null);

        Alert.alert("Success", data.message, [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);

        return;
      }

      const data = await addVisaOrder(cartId, visaOrder);

      if (data?.status !== "success" || !data?.session?.url) {
        Alert.alert("Error", "Failed to initialize gateway");
        return;
      }

      await Linking.openURL(data.session.url);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setIsFormSubmitting(false);
    }
  }

  return (
    <Container style={tw`bg-stone-50 flex-1`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`p-5 pb-10`}
      >
        <View style={tw`border-b border-stone-200 pb-4 mb-6`}>
          <Text style={tw`text-xs uppercase tracking-widest text-stone-400`}>
            Secure Processing
          </Text>
          <Text
            style={tw`text-2xl font-light tracking-tight text-stone-900 uppercase mt-1`}
          >
            Checkout Manifest
          </Text>
        </View>

        <View
          style={tw`bg-white border border-stone-200 rounded-xl p-6 shadow-sm`}
        >
          <View style={tw`mb-6`}>
            <Text
              style={tw`text-xs uppercase tracking-wider text-stone-400 mb-3`}
            >
              Order Summary
            </Text>

            <View style={tw`flex-row items-center justify-between mb-3`}>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="bag-outline" size={14} color="#A8A29E" />
                <Text
                  style={tw`text-xs text-stone-600 uppercase tracking-wide ml-2`}
                >
                  Allotted Items
                </Text>
              </View>
              <Text style={tw`text-xs font-semibold text-stone-900`}>
                {noOfCartItems || 0} units
              </Text>
            </View>

            <View style={tw`flex-row items-center justify-between mb-3`}>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="map" size={14} color="#A8A29E" />
                <Text
                  style={tw`text-xs text-stone-600 uppercase tracking-wide ml-2`}
                >
                  Logistics/Shipping
                </Text>
              </View>
              <Text
                style={tw`text-xs font-medium text-emerald-700 uppercase tracking-wider`}
              >
                Free
              </Text>
            </View>

            <View
              style={tw`flex-row items-center justify-between border-t border-stone-100 pt-3 mt-1`}
            >
              <Text
                style={tw`text-[11px] font-semibold text-stone-900 uppercase tracking-widest`}
              >
                Total Commitment
              </Text>
              <View style={tw`flex-row items-baseline`}>
                <Text
                  style={tw`text-xl font-bold text-stone-900 tracking-tight`}
                >
                  {Cart?.totalCartPrice || 0}
                </Text>
                <Text style={tw`text-[10px] text-stone-400`}> EGP</Text>
              </View>
            </View>
          </View>

          <View style={tw`h-px bg-stone-100 mb-6`} />

          <View style={tw`mb-6`}>
            <Text
              style={tw`text-xs uppercase tracking-wider text-stone-400 mb-4`}
            >
              Delivery Destination
            </Text>

            <View style={tw`mb-4`}>
              <Text
                style={tw`text-[10px] uppercase tracking-wider text-stone-500 mb-1.5`}
              >
                Street Details / Architectural Marker
              </Text>
              <TextInput
                style={tw`w-full bg-stone-50 border rounded-lg px-3 py-2.5 text-sm text-stone-900 ${
                  errors.details ? "border-red-600" : "border-stone-200"
                }`}
                placeholder="e.g. 14 El-Gesh St, Floor 3, Apt 5"
                placeholderTextColor="#D6D3D1"
                value={formData.details}
                onChangeText={(text) => handleInputChange("details", text)}
              />
              {errors.details && (
                <Text style={tw`text-[11px] text-red-600 mt-1`}>
                  {errors.details}
                </Text>
              )}
            </View>

            <View style={tw`mb-4`}>
              <Text
                style={tw`text-[10px] uppercase tracking-wider text-stone-500 mb-1.5`}
              >
                Comms / Phone Line
              </Text>
              <View style={tw`relative `}>
                <TextInput
                  style={tw`w-full bg-stone-50 border rounded-lg pl-2 pr-3 py-2.5 text-sm text-stone-900 ${
                    errors.phone ? "border-red-600" : "border-stone-200"
                  }`}
                  placeholder="01---------"
                  placeholderTextColor="#D6D3D1"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                />
              </View>
              {errors.phone && (
                <Text style={tw`text-[11px] text-red-600 mt-1`}>
                  {errors.phone}
                </Text>
              )}
            </View>

            <View style={tw`mb-4`}>
              <Text
                style={tw`text-[10px] uppercase tracking-wider text-stone-500 mb-1.5`}
              >
                Regional Hub / City
              </Text>
              <TextInput
                style={tw`w-full bg-stone-50 border rounded-lg px-3 py-2.5 text-sm text-stone-900 ${
                  errors.city ? "border-red-600" : "border-stone-200"
                }`}
                placeholder="Select or enter city"
                placeholderTextColor="#D6D3D1"
                value={formData.city}
                onChangeText={(text) => handleInputChange("city", text)}
              />
              {errors.city && (
                <Text style={tw`text-[11px] text-red-600 mt-1`}>
                  {errors.city}
                </Text>
              )}
            </View>

            <View style={tw`mb-4`}>
              <Text
                style={tw`text-[10px] uppercase tracking-wider text-stone-500 mb-1.5`}
              >
                Postal Code
              </Text>

              <TextInput
                style={tw`w-full bg-stone-50 border rounded-lg px-3 py-2.5 text-sm ${
                  errors.postalCode ? "border-red-600" : "border-stone-200"
                }`}
                placeholder="12345"
                keyboardType="number-pad"
                placeholderTextColor="#D6D3D1"
                value={formData.postalCode}
                onChangeText={(text) => handleInputChange("postalCode", text)}
              />

              {errors.postalCode && (
                <Text style={tw`text-[11px] text-red-600 mt-1`}>
                  {errors.postalCode}
                </Text>
              )}
            </View>

            <View style={tw`mb-6`}>
              <Text
                style={tw`text-[10px] uppercase tracking-wider text-stone-500 mb-2`}
              >
                Settlement Paradigm
              </Text>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`flex-1 flex-row items-center border rounded-xl p-4 mr-2 ${
                    formData.type === "cash"
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 bg-white"
                  }`}
                  onPress={() => handleInputChange("type", "cash")}
                  activeOpacity={0.8}
                >
                  <View
                    style={tw`w-3.5 h-3.5 rounded-full border items-center justify-center mr-3 ${
                      formData.type === "cash"
                        ? "border-stone-900"
                        : "border-stone-300"
                    }`}
                  >
                    {formData.type === "cash" && (
                      <View style={tw`w-2 h-2 rounded-full bg-stone-900`} />
                    )}
                  </View>
                  <View style={tw`flex-1`}>
                    <Text
                      style={tw`text-xs font-semibold text-stone-900 uppercase tracking-wider`}
                    >
                      Cash
                    </Text>
                    <Text style={tw`text-[10px] text-stone-400 uppercase`}>
                      On Hand Drop
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`flex-1 flex-row items-center border rounded-xl p-4 ml-2 ${
                    formData.type === "visa"
                      ? "border-stone-900 bg-stone-50"
                      : "border-stone-200 bg-white"
                  }`}
                  onPress={() => handleInputChange("type", "visa")}
                  activeOpacity={0.8}
                >
                  <View
                    style={tw`w-3.5 h-3.5 rounded-full border items-center justify-center mr-3 ${
                      formData.type === "visa"
                        ? "border-stone-900"
                        : "border-stone-300"
                    }`}
                  >
                    {formData.type === "visa" && (
                      <View style={tw`w-2 h-2 rounded-full bg-stone-900`} />
                    )}
                  </View>
                  <View
                    style={tw`flex-1 flex-row items-center justify-between`}
                  >
                    <View>
                      <Text
                        style={tw`text-xs font-semibold text-stone-900 uppercase tracking-wider`}
                      >
                        Visa
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={tw`text-[10px] text-stone-400 uppercase`}
                      >
                        Online Clearing
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={tw`w-full bg-stone-900 py-3 px-4 rounded-xl items-center justify-center min-h-[42px] ${
                isFormSubmitting ? "opacity-50" : ""
              }`}
              onPress={handleOrder}
              disabled={isFormSubmitting}
              activeOpacity={0.8}
            >
              {isFormSubmitting ? (
                <ActivityIndicator color="#F5F5F4" size="small" />
              ) : (
                <Text
                  style={tw`text-stone-50 text-xs font-medium uppercase tracking-widest`}
                >
                  Execute Order
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={tw`flex-row items-center justify-between border-t border-stone-200 pt-4`}
          >
            <TouchableOpacity
              onPress={() => router.replace("/")}
              disabled={isFormSubmitting}
            >
              <Text
                style={tw`text-[10px] text-stone-400 uppercase tracking-widest`}
              >
                ← Return to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
