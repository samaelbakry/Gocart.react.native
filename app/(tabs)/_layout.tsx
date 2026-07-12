import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const activeColor = "#059669"; 
  const inactiveColor = "#a8a29e"; 
  const borderLineColor = "#e7e5e4"; 
  const surfaceBackground = "#ffffff"; 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1c1917",
        tabBarInactiveTintColor: inactiveColor,
        
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 28, 
          height: 84,       
          borderTopWidth: 1,
          borderTopColor: borderLineColor,
          backgroundColor: surfaceBackground,
          elevation: 0,    
          shadowOpacity: 0, 
        },

        tabBarLabelStyle: {
          fontFamily: "monospace",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center h-7 relative">
              <Ionicons name="home" size={19} color={focused ? activeColor : inactiveColor} strokeWidth={1.5} />
              {focused && <View className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-600" />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center h-7 relative">
              <Ionicons name="search" size={19} color={focused ? activeColor : inactiveColor} strokeWidth={1.5} />
              {focused && <View className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-600" />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center h-7 relative">
              <Ionicons name="cart-outline" size={19} color={focused ? activeColor : inactiveColor} strokeWidth={1.5} />
              {focused && <View className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-600" />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center h-7 relative">
              <Ionicons name="person" size={19} color={focused ? activeColor : inactiveColor} strokeWidth={1.5} />
              {focused && <View className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-600" />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}