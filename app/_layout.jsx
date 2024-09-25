import React, { useEffect, useContext, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image, View } from "react-native";
import { useFonts } from "expo-font";
import Loading from "../assets/images/Loading.gif";
import { WebSocketProvider } from "../assets/webSocketContext";

const RootLayout = () => {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    "IranSans-Bold": require("../assets/fonts/IRANSansXFaNum-Bold.ttf"),
    "IranSans-Light": require("../assets/fonts/IRANSansXFaNum-Light.ttf"),
    "IranSans-Regular": require("../assets/fonts/IRANSansXFaNum-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setLoading(false);
    }
  }, [fontsLoaded]);

  if (loading || !fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-col items-center justify-center h-full">
          <Image source={Loading} className="w-52 h-52" />
        </View>
      </SafeAreaView>
    );
  }

  return (
      <SafeAreaView className="flex-1 bg-background">
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
                headerStyle: {
                  backgroundColor: "#F0F5FA",
                },
              }}
            />
            <Stack.Screen
              name="start-charging"
              options={{
                title: "شروع شارژ",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontFamily: "IranSans-Bold",
                  fontSize: 20,
                },
                headerStyle: {
                  backgroundColor: "#F0F5FA",
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
