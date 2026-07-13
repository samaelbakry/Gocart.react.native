import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Container({ children , style }: { children: React.ReactNode , style?:any }) {
  return <SafeAreaView style={style} edges={["top"]}>{children}</SafeAreaView>;
}
