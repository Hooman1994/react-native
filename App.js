import React, { createContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WebSocketProvider } from "./assets/webSocketContext.js";
import { Slot } from "expo-router";

const App = () => {
  return (
    <WebSocketProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </WebSocketProvider>
  );
};

export default App;
