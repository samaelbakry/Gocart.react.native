import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tw";
import { Ionicons } from "@expo/vector-icons";
import { CreateReview } from "@/services/reviews";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/store/store";
import { selectedAuthenticated } from "@/store/slices/authSlice";
import { useRouter } from "expo-router";

export default function AddReview({ productId }: { productId: string }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient()
  const authenticated = useAppSelector(selectedAuthenticated)
  const router = useRouter()

  const handleSubmition = async () => {
    
     if (!authenticated) {
      Alert.alert(
        "Login Required",
        "Please log in or sign up to complete this process.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            style: "default",
            onPress: () => router.push("/(auth)/login"),
          },
        ],
      );
    }

    if (!rating) {
      Alert.alert("Rating Required", "Please select a star rating first.");
      return;
    }
    if (!review.trim()) {
      Alert.alert("Review Required", "Please write a few words about your experience.");
      return;
    }
    try {
      setLoading(true);
      await CreateReview(productId, review.trim(), rating);
      queryClient.invalidateQueries({ queryKey: ["productReviews", productId]})
      setRating(0);
      setReview("");
      Alert.alert("Success", "Thank you! Your review has been submitted");
    } catch (error) {
      const errorMsg = error instanceof Error ? error : "Something went wrong. Please try again later"
      console.log(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`mt-2`}>
      <Text
        style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider my-2`}
      >
        Share Your Experience
      </Text>
      
      <View style={tw`bg-white border border-stone-200 rounded-2xl p-5 shadow-sm`}>
        <View style={tw`items-center pb-4 mb-4 border-b border-stone-100`}>
          <Text style={tw`text-xs text-stone-400 mb-2 font-medium`}>
            Tap to Rate
          </Text>
          <View style={tw`flex-row items-center gap-1`}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <TouchableOpacity
                style={tw`p-1.5`}
                onPress={() => setRating(star)}
                key={index}
                activeOpacity={0.7}
              >
                <Ionicons
                  size={28}
                  name={rating >= star ? "star" : "star-outline"}
                  color={rating >= star ? "#fbbf24" : "#d6d3d1"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2`}>
          Your Comments
        </Text>
        <TextInput
          value={review}
          onChangeText={setReview}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={tw`w-full min-h-[50px] bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-stone-800 text-sm leading-normal`}
          placeholder="What did you like or dislike?..."
          placeholderTextColor="#a8a29e"
        />

        <TouchableOpacity
          style={[
            tw`bg-stone-900 rounded-xl py-3 mt-4 flex-row justify-center items-center`,
            loading && tw`opacity-80`
          ]}
          onPress={handleSubmition}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#f5f5f4" />
          ) : (
            <Text style={tw`text-xs uppercase text-stone-100 font-bold tracking-wider`}>
              Submit Review
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}