import axios from "axios";
import * as Location from "expo-location";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CustomCarousel from "../../components/CustomCarousel";
import CustomText from "../../components/CustomText";
import DashboardCard from "../../components/DashboardCard";
import Header from "../../components/Header";
import Scanning from "../../assets/images/scanning.svg";
import Wallet from "../../assets/images/wallet.svg";
import Car from "../../assets/images/car.svg";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("موقعیت مکانی");
  const [message, setMessage] = useState("");
  const [sliderItems, setSliderItems] = useState([]);

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setTitle("لطفا منتظر بمانید...");
    if (status !== "granted") {
      setTitle("موقعیت مکانی");
      setModalVisible(true);
      return setMessage("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    setTitle("موقعیت مکانی");
    setModalVisible(true);
    return setMessage(location);
  }

  useEffect(() => {
    axios
      .get("https://gen.emapna.com/api/appslider/getAll")
      .then((result) => {
        setSliderItems(result.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-start bg-backgroundTheme">
          <View>
            <CustomCarousel items={sliderItems} />
          </View>
          <View className="w-full mt-2">
            <DashboardCard />
          </View>
          <View className="w-full">
            <View className="m-4">
              <CustomText className="font-iranSansBold">شارژر عمومی</CustomText>
            </View>
            <View className="flex flex-row justify-around p-2 rounded-xl">
              <View className="items-center gap-2">
                <Pressable
                  title={title}
                  onPress={() => {
                    getCurrentLocation();
                  }}
                >
                  <View className="bg-white rounded-xl p-3">
                    <Car width={48} height={48} />
                  </View>
                </Pressable>
                <CustomText className="text-xs font-iranSansBold">
                  شارژ اضطراری
                </CustomText>
              </View>
              <View className="items-center gap-2">
                <View className="bg-white rounded-xl p-3">
                  <Wallet width={48} height={48} />
                </View>
                <CustomText className="text-xs font-iranSansBold">
                  افزایش موجودی
                </CustomText>
              </View>
              <View className="items-center gap-2">
                <View className="bg-white rounded-xl p-3">
                  <Link href={"/qr-scan"}>
                    <Scanning width={48} height={48} />
                  </Link>
                </View>
                <CustomText className="text-xs font-iranSansBold">
                  شروع شارژ
                </CustomText>
              </View>
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {message?.coords ? (
                  <View className="flex-col gap-1">
                    <CustomText className="font-iranSansBold">
                      {"lat: " + message?.coords?.latitude}
                    </CustomText>
                    <CustomText className="font-iranSansBold">
                      {"lon: " + message?.coords?.longitude}
                    </CustomText>
                  </View>
                ) : (
                  <CustomText>{message}</CustomText>
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <CustomText style={styles.textStyle}>Close</CustomText>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    gap: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#b80202",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Home;
