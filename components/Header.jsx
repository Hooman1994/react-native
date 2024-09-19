import { View, Text, Image } from "react-native";
import React from "react";
import constants from "../constants/images";

const Header = () => {
  return (
    <View
      style={{
        display: "flex",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Image
        resizeMode="contain"
        style={{ width: 96, height: 40 }}
        source={constants.logo}
      />
      <Image
        style={{
          position: "absolute",
          top: "auto",
          left: 20,
        }}
        source={constants.notification}
      />
    </View>
  );
};

export default Header;
