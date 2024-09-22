// File: RootLayout.js

import { NativeWindStyleSheet } from "nativewind";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Correct import for SafeAreaView
import NavigationTabs from "./app/_layout.jsx";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <NavigationTabs />
    </SafeAreaProvider>
  );
};

export default RootLayout;
