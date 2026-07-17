import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "@/lib/tw";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout, selectedUser } from "@/store/slices/authSlice";
import { addAddress } from "@/services/address";
import { selectedAddress, setAddress } from "@/store/slices/addressSlice";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const image = require("@/assets/images/user.png");
  const user = useAppSelector(selectedUser);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const address = useAppSelector(selectedAddress) || {};
  const router = useRouter();

  const handelSubmition = async () => {
    setLoading(true);
    try {
      await addAddress(name, details, phone, city);
      dispatch(
        setAddress({
          name,
          details,
          phone,
          city,
        }),
      );
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            dispatch(logout());
            router.replace("/");
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleToggleEdit = () => {
    if (!isEditing) {
      setName(address.name || "");
      setDetails(address.details || "");
      setPhone(address.phone || "");
      setCity(address.city || "");
    }

    setIsEditing((prev) => !prev);
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-stone-50`}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={tw`bg-white pt-16 pb-6 items-center w-88 mx-auto rounded-3xl shadow-md border-b border-stone-100 `}
      >
        <View style={tw`relative`}>
          <Image
            source={image}
            style={tw`w-34 h-24 rounded-full`}
          />
        </View>
        <Text style={tw`text-xl font-bold text-stone-900`}>
          {user?.name || "User Name"}
        </Text>
        <Text style={tw`text-xs text-stone-400 font-medium mt-0.5`}>
          {user?.email || "user@example.com"}
        </Text>
      </View>

      <View style={tw`p-5 gap-5`}>
        <View>
          <View style={tw`flex-row justify-between items-center mb-2.5`}>
            <Text
              style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider`}
            >
              Saved Addresses
            </Text>
            <TouchableOpacity
              onPress={handleToggleEdit}
              style={tw`flex-row items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200`}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isEditing ? "close" : "create-outline"}
                size={12}
                color="#44403c"
              />
              <Text
                style={tw`text-[10px] font-bold text-stone-700 uppercase tracking-wide`}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={tw`bg-white border border-stone-200 rounded-2xl p-4 shadow-sm`}
          >
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <View style={tw`flex-row items-center gap-2 flex-1 mr-3`}>
                <View style={tw`bg-stone-100 p-2 rounded-xl`}>
                  <Ionicons
                    name="home"
                    size={18}
                    color={tw.color("primary") || "#1c1917"}
                  />
                </View>
                {isEditing ? (
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    style={tw`flex-1 text-sm font-bold text-stone-900 border-b border-stone-300 py-0.5`}
                    placeholderTextColor="#a8a29e"
                    placeholder="Address Label (e.g. Home)"
                  />
                ) : (
                  <Text style={tw`text-sm font-bold text-stone-900`}>
                    {address?.name || "No label set"}
                  </Text>
                )}
              </View>
              {!isEditing && (
                <View
                  style={tw`bg-stone-100 border border-stone-200 px-2 py-1 rounded-md`}
                >
                  <Text
                    style={tw`text-[10px] uppercase text-stone-500 font-bold`}
                  >
                    Default
                  </Text>
                </View>
              )}
            </View>

            <View style={tw`gap-3.5`}>
              <View style={tw`flex-row items-start gap-2.5`}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color="#78716c"
                  style={tw`mt-1`}
                />
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`text-stone-400 font-medium uppercase tracking-wide text-[9px]`}
                  >
                    City
                  </Text>
                  {isEditing ? (
                    <TextInput
                      value={city}
                      onChangeText={setCity}
                      style={tw`text-stone-800 text-sm font-medium border-b border-stone-200 py-0.5 mt-0.5`}
                      placeholderTextColor="#a8a29e"
                      placeholder="Enter city"
                    />
                  ) : (
                    <Text style={tw`text-stone-800 text-sm font-medium mt-0.5`}>
                      {address?.city || "Not provided"}
                    </Text>
                  )}
                </View>
              </View>

              <View style={tw`flex-row items-start gap-2.5`}>
                <Ionicons
                  name="map-outline"
                  size={14}
                  color="#78716c"
                  style={tw`mt-1`}
                />
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`text-stone-400 font-medium uppercase tracking-wide text-[9px]`}
                  >
                    Address Line
                  </Text>
                  {isEditing ? (
                    <TextInput
                      value={details}
                      onChangeText={setDetails}
                      style={tw`text-stone-600 text-sm border-b border-stone-200 py-0.5 mt-0.5`}
                      placeholderTextColor="#a8a29e"
                      placeholder="Street, building, apartment..."
                      multiline
                    />
                  ) : (
                    <Text style={tw`text-stone-600 text-sm mt-0.5`}>
                      {address?.details || "Not provided"}
                    </Text>
                  )}
                </View>
              </View>

              <View style={tw`flex-row items-start gap-2.5`}>
                <Ionicons
                  name="call-outline"
                  size={14}
                  color="#78716c"
                  style={tw`mt-1`}
                />
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`text-stone-400 font-medium uppercase tracking-wide text-[9px]`}
                  >
                    Phone Number
                  </Text>
                  {isEditing ? (
                    <TextInput
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      style={tw`text-stone-800 text-sm font-semibold tracking-wide border-b border-stone-200 py-0.5 mt-0.5`}
                      placeholderTextColor="#a8a29e"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <Text
                      style={tw`text-stone-800 text-sm font-semibold tracking-wide mt-0.5`}
                    >
                      {address?.phone || "Not provided"}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {isEditing && (
              <TouchableOpacity
                onPress={handelSubmition}
                style={tw`bg-stone-900 rounded-xl py-3 mt-5 flex-row justify-center items-center`}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <View style={tw`flex-row items-center`}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={16}
                      color="white"
                    />
                    <Text
                      style={tw`text-xs uppercase text-stone-100 font-bold tracking-wider ml-2`}
                    >
                      Save Changes
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          <Text
            style={tw`text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-2.5`}
          >
            Account Settings
          </Text>
          <View
            style={tw`bg-white border border-stone-200 rounded-2xl overflow-hidden`}
          >
            <TouchableOpacity
              style={tw`flex-row justify-between items-center p-4 border-b border-stone-100`}
              activeOpacity={0.6}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Ionicons name="person-outline" size={18} color="#44403c" />
                <Text style={tw`text-sm font-medium text-stone-800`}>
                  Edit Profile Details
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#a8a29e" />
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row justify-between items-center p-4 border-b border-stone-100`}
              activeOpacity={0.6}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Ionicons name="receipt-outline" size={18} color="#44403c" />
                <Text style={tw`text-sm font-medium text-stone-800`}>
                  Order History
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#a8a29e" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              style={tw`flex-row justify-between items-center p-4`}
              activeOpacity={0.6}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Ionicons name="log-out-outline" size={18} color="#ef4444" />
                <Text style={tw`text-sm font-medium text-red-500`}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}