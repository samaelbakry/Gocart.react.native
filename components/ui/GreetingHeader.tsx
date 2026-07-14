import React from "react";
import { View, Text } from "react-native";
import tw from "@/lib/tw";
import { useAppSelector } from "@/store/store";
import { selectedUser } from "@/store/slices/authSlice";

export default function GreetingHeader() {
    
  const user = useAppSelector(selectedUser);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      
      <View style={tw`px-5 pt-6 pb-2 relative z-10`}>
        {user && (
          <>
            <Text style={[tw`text-[10px] uppercase text-stone-400 tracking-widest mb-1`, { fontFamily: "monospace" }]}>
              {getGreeting()}
            </Text>
            <Text style={tw`text-2xl font-light tracking-tight text-stone-900`}>
              Hello,{" "}
              <Text style={tw`text-2xl font-light tracking-tight text-stone-900`}>
                {user.name.split(" ")[0]}
              </Text>
            </Text>
          </>
        )}
      </View>
    </>
  );
}