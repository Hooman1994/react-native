import React, { useEffect, useState } from "react";
import { Stack } from "expo-router/stack";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import WebSocket from "react-native-websocket";
import { Image, Text, ToastAndroid, View } from "react-native";
import { useFonts } from "expo-font";
import Loading from "../assets/images/Loading.gif"

NativeWindStyleSheet.setOutput({
  default: "native",
});

const RootLayout = () => {
  const [loading, setLoading] = useState(false);
  const [fontsLoaded, error] = useFonts({
    "IranSans-Bold": require("../assets/fonts/IRANSansXFaNum-Bold.ttf"),
    "IranSans-Light": require("../assets/fonts/IRANSansXFaNum-Light.ttf"),
    "IranSans-Regular": require("../assets/fonts/IRANSansXFaNum-Regular.ttf"),
  });

  const ws = new WebSocket("wss://dgw.emapna.com/");

  useEffect(() => {
    if (fontsLoaded) {
      setLoading(false);
      ToastAndroid?.showWithGravityAndOffset(
        "WS is Ready to use!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        250
      );
      ws.onopen = () => {
        // Connection opened
        console.log("WebSocket connection opened");
        ToastAndroid.show("Hello, server!", ToastAndroid.LONG);
        ws.send("Hello, server!"); // Send a message to the server
      };
      ws.onmessage = (e) => {
        // Receive a message from the server
        console.log(e.data);
        ToastAndroid.show(e.data, ToastAndroid.LONG);
      };
      ws.onerror = (e) => {
        // An error occurred
        console.log(e.message);
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      };
      ws.onclose = (e) => {
        // Connection closed
        console.log(e.code, e.reason);
        ToastAndroid.show(e.reason, ToastAndroid.LONG);
      };
    } else {
      setLoading(true);
    }
  }, [ws, fontsLoaded]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View className="flex-col items-center justify-center h-full">
          <Image
            source={Loading}
            className="w-52 h-52"
          />
          <Text className="font-iranSansBold">لطفا شکیبایی فرمایید</Text>
        </View>
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="qr-scan"
            options={{
              title: "اسکن QR",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "IranSans-Bold",
                fontSize: 20,
              },
            }}
          />
          <Stack.Screen
            name="user-info"
            options={{
              title: "اطلاعات کاربر",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "IranSans-Bold",
                fontSize: 20,
              },
            }}
          />
        </Stack>
      )}
    </SafeAreaView>
  );
};

export default RootLayout;
