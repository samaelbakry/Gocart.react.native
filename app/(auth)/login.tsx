import Container from "@/components/ui/Container";
import tw from "@/lib/tw";
import { LoginFormData, loginSchema } from "@/schemas/authschema";
import { loginFn } from "@/services/authServices";
import {
  selectLoading,
  setCredentials,
  setLoading
} from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
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

type TokenPayload = {
  id: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
};

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(setLoading(true));
      const res = await loginFn(data);
      
      if (res.message !== "success") {
        dispatch(setLoading(false));
        Alert.alert("Error", res.message);
        return;
      }
      const decode = jwtDecode<TokenPayload>(res.token)
      
      dispatch(
        setCredentials({
          user: {
            ...res.user,
            id:decode.id
          },
          token: res.token,
        }),
      );

     dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      const error = err instanceof Error ? err.message : "something went wrong"
      Alert.alert("Error", error);
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
              Welcome{" "}
              <Text style={tw`font-serif italic text-primary`}>Back</Text>
            </Text>
            <Text
              style={tw`text-sm text-stone-500 font-light leading-relaxed mt-2`}
            >
              Access your archive, review orders, and explore modern designs.
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
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
                  Password
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      tw`text-[10px] uppercase text-stone-400`,
                      { fontFamily: "monospace" },
                    ]}
                  >
                    Forgot?
                  </Text>
                </TouchableOpacity>
              </View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      tw`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm`,
                      errors.password
                        ? tw`border-red-500`
                        : tw`border-stone-200`,
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor="#a8a29e"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text style={tw`text-[10px] text-red-500 mt-1`}>
                  {errors.password.message}
                </Text>
              )}
            </View>
            <TouchableOpacity
              disabled={isLoading}
              onPress={handleSubmit(onSubmit)}
              style={tw`bg-stone-900 rounded-xl py-4 items-center mt-4 shadow-sm`}
            >
              <Text
                style={tw`text-white text-sm font-semibold tracking-wide uppercase`}
              >
                {isLoading ? "Loading..." : "Login"}
              </Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center items-center mt-2`}>
              <Text style={tw`text-stone-500 text-sm font-light`}>
                Don&apos;t have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={tw`text-primary text-sm font-semibold`}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
