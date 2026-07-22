import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

import Container from "@/components/ui/Container";
import tw from "@/lib/tw";
import { verifyResetCodefn } from "@/services/OTP";
import { resetCodeSchema, ResetCodeFormData } from "@/schemas/otpschemas";

export default function VerifyResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }} = useForm<ResetCodeFormData>({
    resolver: zodResolver(resetCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: ResetCodeFormData) => {
    try {
      setLoading(true);
      await verifyResetCodefn(data.code);
      router.push("/(auth)/resetPassword");
    } catch (err) {
       const errorMessage = err instanceof Error ? err.message : 'Failed to reset code';
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center px-5 py-12`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`absolute inset-0 flex-row px-6`} pointerEvents="none">
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1`} />
          </View>

          <View style={tw`mb-10 relative z-10`}>
            <Text style={tw`text-4xl font-light tracking-tight text-stone-900`}>
              Reset <Text style={tw`font-serif italic text-primary`}>Code</Text>
            </Text>
            <Text style={tw`text-sm text-stone-500 font-light leading-relaxed mt-2`}>
              Please enter the code sent to your email.
            </Text>
          </View>

          <View style={tw`gap-5 relative z-10`}>
            <View>
              <Text
                style={[
                  tw`text-[10px] uppercase text-stone-400 mb-1.5`,
                  { fontFamily: "monospace" },
                ]}
              >
                Reset Code
              </Text>

              <Controller
                control={control}
                name="code"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      tw`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm`,
                      errors.code ? tw`border-red-500` : tw`border-stone-200`,
                    ]}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    placeholder="enter your code"
                    placeholderTextColor="#a8a29e"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              {errors.code && (
                <Text style={tw`text-[10px] text-red-500 mt-1`}>
                  {errors.code.message}
                </Text>
              )}
            </View>

            <TouchableOpacity
              disabled={loading}
              style={tw`bg-stone-900 rounded-xl py-4 items-center mt-2 shadow-sm`}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={tw`text-white text-sm font-semibold tracking-wide uppercase`}>
                {loading ? "Loading..." : "Send"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}