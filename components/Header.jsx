import { View, Text, Image } from "react-native";
import React from "react";
import constants from "../constants/images";
import Notification from "../assets/images/notification.svg";

const Header = () => {
  return (
    <View
      style={{
        display: "flex",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor:"#F0F5FA"
      }}
    >
      <Image
        resizeMode="contain"
        style={{ width: 96, height: 40 }}
        source={constants.logo}
      />
      <Notification
        width={25}
        height={25}
        style={{
          position: "absolute",
          top: "auto",
          left: 20,
        }}
      />
    </View>
  );
};

export default Header;
