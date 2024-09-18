import { useFonts } from "expo-font";
import { SplashScreen, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View
      // className="flex-1 justify-center items-center bg-red-700"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ height: 24, width: 24 }}
      />
      <Text
        className={`${
          focused ? "font-iranSansBold" : "font-iranSansRegular"
        } text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};
const Layout = () => {
  const [fontsLoaded, error] = useFonts({
    "IranSans-Bold": require("../../assets/fonts/IRANSansXFaNum-Bold.ttf"),
    "IranSans-Light": require("../../assets/fonts/IRANSansXFaNum-Light.ttf"),
    "IranSans-Regular": require("../../assets/fonts/IRANSansXFaNum-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          margin: 10,
          height: 70,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // For Android
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="پروفایل"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.search}
              color={color}
              name="نقشه"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="خانه"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
