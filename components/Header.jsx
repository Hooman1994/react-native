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
      }}
    >
      <Image
        resizeMode="contain"
        style={{ width: 96, height: 40 }}
        source={constants.logo}
      />
    </View>
  );
};

export default Header;
