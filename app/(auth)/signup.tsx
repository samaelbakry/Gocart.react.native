import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@/components/ui/Container";
import tw from "@/lib/tw";
import { signupSchema, SignupFormData } from "@/schemas/authschema";
import { signupFn } from "@/services/authServices";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectLoading, setLoading } from "@/store/slices/authSlice";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectLoading);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
  try {
    dispatch(setLoading(true));
    const res = await signupFn(data);
    if (res.message !== "success") {
        dispatch(setLoading(false));
        Alert.alert("Error", res.message);
        return;
      }

    dispatch(setLoading(false));

    router.replace("/(auth)/login");
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
          contentContainerStyle={tw`flex-grow px-5 pt-8 pb-12`}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`absolute inset-0 flex-row px-6`} pointerEvents="none">
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1 border-r border-stone-200/40`} />
            <View style={tw`flex-1`} />
          </View>

          <View style={tw`mb-10 relative z-10`}>
            <Text style={tw`text-4xl font-light tracking-tight text-stone-900`}>
              Create{" "}
              <Text style={tw`font-serif italic text-primary`}>Account</Text>
            </Text>
            <Text
              style={tw`text-sm text-stone-500 font-light leading-relaxed mt-2`}
            >
              Join the catalog. Step into curated spaces and unified archives.
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
                Full Name
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      tw`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm`,
                      errors.name ? tw`border-red-500` : tw`border-stone-200`,
                    ]}
                    placeholder="john deo"
                    placeholderTextColor="#a8a29e"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.name && (
                <Text style={tw`text-[10px] text-red-500 mt-1`}>
                  {errors.name.message}
                </Text>
              )}
            </View>

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
              <Text
                style={[
                  tw`text-[10px] uppercase text-stone-400 mb-1.5`,
                  { fontFamily: "monospace" },
                ]}
              >
                Phone Number
              </Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      tw`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm`,
                      errors.phone ? tw`border-red-500` : tw`border-stone-200`,
                    ]}
                    placeholder="01010700701"
                    placeholderTextColor="#a8a29e"
                    keyboardType="phone-pad"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.phone && (
                <Text style={tw`text-[10px] text-red-500 mt-1`}>
                  {errors.phone.message}
                </Text>
              )}
            </View>

            <View>
              <Text
                style={[
                  tw`text-[10px] uppercase text-stone-400 mb-1.5`,
                  { fontFamily: "monospace" },
                ]}
              >
                Password
              </Text>
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

            <View>
              <Text
                style={[
                  tw`text-[10px] uppercase text-stone-400 mb-1.5`,
                  { fontFamily: "monospace" },
                ]}
              >
                Confirm Password
              </Text>
              <Controller
                control={control}
                name="rePassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      tw`w-full bg-white border rounded-xl px-4 py-3.5 text-stone-900 text-sm`,
                      errors.rePassword
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
              {errors.rePassword && (
                <Text style={tw`text-[10px] text-red-500 mt-1`}>
                  {errors.rePassword.message}
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
                {isLoading ? "Loading..." : "Register Account"}
              </Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center items-center mt-2`}>
              <Text style={tw`text-stone-500 text-sm font-light`}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={tw`text-primary text-sm font-semibold`}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
