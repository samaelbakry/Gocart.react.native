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
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

import Container from "@/components/ui/Container";
import tw from "@/lib/tw";
import { resetPasswordfn } from "@/services/OTP";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/schemas/otpschemas";

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setLoading(true);
      await resetPasswordfn(data.email, data.newPassword);

      Alert.alert(
        "Success",
        "Your password has been reset successfully. Please log in with your new password.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/login"),
          },
        ],
      );
    } catch (err) {
      const errorMessage =  err instanceof Error ? err.message : "Failed to reset password";
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
                ← Back
              </Text>
            </TouchableOpacity>
            <Text style={tw`text-4xl font-light tracking-tight text-stone-900`}>
              New{" "}
              <Text style={tw`font-serif italic text-primary`}>Password</Text>
            </Text>
            <Text
              style={tw`text-sm text-stone-500 font-light leading-relaxed mt-2`}
            >
              Set a strong password to protect your account archive and access.
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

            <View>
              <View style={tw`flex-row justify-between items-center mb-1.5`}>
                <Text
                  style={[
                    tw`text-[10px] uppercase text-stone-400`,
                    { fontFamily: "monospace" },
                  ]}
                >
                  New Password
                </Text>
                <TouchableOpacity
                  onPress={() => setShowNewPassword((prev) => !prev)}
                >
                  <Text
                    style={[
                      tw`text-[10px] uppercase text-stone-400`,
                      { fontFamily: "monospace" },
                    ]}
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      tw`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm`,
                      errors.newPassword
                        ? tw`border-red-500`
                        : tw`border-stone-200`,
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor="#a8a29e"
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!loading}
                  />
                )}
              />
              {errors.newPassword && (
                <Text style={tw`text-[10px] text-red-500 mt-1`}>
                  {errors.newPassword.message}
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
                  Reset Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
