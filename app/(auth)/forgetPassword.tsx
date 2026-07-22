import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Container from "@/components/ui/Container";
import tw from "@/lib/tw";
import { forgetPassFn } from "@/services/OTP";

import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/schemas/otpschemas";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      const res = await forgetPassFn(data.email);

      if (res.statusMsg !== "success") {
        Alert.alert("Error", res.message || "Failed to send reset code");
        return;
      }
      router.push("/(auth)/verifyResetPassword");
    } catch (err) {
      const errorMessage =  err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
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
          keyboardShouldPersistTaps="handled"
        >
          <View style={tw`absolute inset-0 flex-row px-6`} pointerEvents="none">
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1`} />
          </View>

          <View style={tw`mb-8 relative z-10`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`mb-6 self-start`}
            >
              <Text style={tw`text-stone-500 text-xs uppercase tracking-wider`}>
                ← Back to Login
              </Text>
            </TouchableOpacity>
            <Text style={tw`text-4xl font-light tracking-tight text-stone-900`}>
              Forgot{" "}
              <Text style={tw`font-serif italic text-primary`}>Password?</Text>
            </Text>
            <Text
              style={tw`text-sm text-stone-500 font-light leading-relaxed mt-2`}
            >
              Enter the email address associated with your account and
              we&apos;ll send you a verification code.
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
                Email Address
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      tw`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm`,
                      errors.email ? tw`border-red-500` : tw`border-stone-200`,
                    ]}
                    placeholder="name@example.com"
                    placeholderTextColor="#a8a29e"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!loading}
                  />
                )}
              />
              {errors.email && (
                <Text style={tw`text-[10px] text-red-500 mt-1`}>
                  {errors.email.message}
                </Text>
              )}
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              style={tw`bg-stone-900 rounded-xl py-4 items-center mt-2 shadow-sm ${
                loading ? "opacity-70" : ""
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text
                  style={tw`text-white text-sm font-semibold tracking-wide uppercase`}
                >
                  Send Reset Code
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
