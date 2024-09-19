import React, { useEffect, useState } from "react";
import { Stack } from "expo-router/stack";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image, Text, ToastAndroid, View } from "react-native";
import { useFonts } from "expo-font";
import Loading from "../assets/images/Loading.gif";
import WebSocket from "react-native-websocket";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const RootLayout = () => {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
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
        console.log("WebSocket connection opened");
        ToastAndroid.show("Hello, server!", ToastAndroid.LONG);
        ws.send("Hello, server!");
      };

      ws.onmessage = (e) => {
        console.log(e.data);
        ToastAndroid.show(e.data, ToastAndroid.LONG);
      };

      ws.onerror = (e) => {
        console.log(e.message);
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      };

      ws.onclose = (e) => {
        console.log(e.code, e.reason);
        ToastAndroid.show(e.reason, ToastAndroid.LONG);
      };
    }
  }, [ws, fontsLoaded]);

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-col items-center justify-center h-full">
          <Image source={Loading} className="w-52 h-52" />
          <Text style={{ fontFamily: "IranSans-Bold" }}>
            لطفا شکیبایی فرمایید
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RootLayout;
