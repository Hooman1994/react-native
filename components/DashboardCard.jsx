import React, { useRef, useState, useEffect } from "react";
import { Animated, Pressable, ScrollView, View } from "react-native";
import Chevron from "../assets/images/chevron.svg";
import Flash from "../assets/images/flash.svg";
import Scanning from "../assets/images/scanning.svg";
import CustomText from "../components/CustomText";
import LottieView from "lottie-react-native";

const DashboardCard = () => {
  const animation = useRef(null);
  const [open, setOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [open]);

  const animatedHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <View id="main" className="relative my-7 bg-white shadow-md">
        <View className="absolute -top-6 right-8 px-3 py-1 bg-white rounded-tl-xl rounded-tr-xl">
          <Pressable onPress={() => setOpen(!open)}>
            <View className="flex flex-row gap-x-1 ">
              <Chevron
                style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
              />
              <CustomText>مدیریت شارژ و شارژرها</CustomText>
            </View>
          </Pressable>
        </View>
        <View className="p-4">
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "100%",
              height: 150,
            }}
            source={require("../assets/images/loadingChargers.json")}
          />
        </View>
        <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
          {open && (
            <View className="flex flex-row justify-around p-3 gap-1 bg-white font-iranSansRegular">
              <Pressable
                onPress={() => {}}
                className="flex flex-row justify-evenly items-center w-[45%] rounded-lg border-purple border p-2"
              >
                <Flash width={25} height={25} />
                <CustomText className="text-purple">
                  افزودن شارژر شخصی
                </CustomText>
              </Pressable>
              <Pressable
                onPress={() => {}}
                className="flex flex-row justify-evenly items-center w-[45%] rounded-lg border-green border p-2"
              >
                <Scanning width={25} height={25} />
                <CustomText className="text-green">شروع شارژ عمومی</CustomText>
              </Pressable>
            </View>
          )}
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default DashboardCard;
