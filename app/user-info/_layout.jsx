import { View, Text } from "react-native";
import React from "react";
import { userInfoStore } from "../../stores/userInfoStore";

const UserInfo = () => {
  const fullName = userInfoStore((state) => state.fullName);

  return (
    <View className="flex-1 items-center justify-start p-5 gap-2">
      <Text className="font-iranSansRegular">نام و نام خانوادگی</Text>
      <Text className="font-iranSansBold">
        {fullName ? fullName : "No user selected"}
      </Text>
    </View>
  );
};

export default UserInfo;
