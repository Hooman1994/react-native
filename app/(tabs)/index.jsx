import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import Header from "../../components/Header";
import Carousel from "react-native-reanimated-carousel";
import axios from "axios";
import CustomCarousel from "../../components/CustomCarousel";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("موقعیت مکانی");
  const [message, setMessage] = useState("");
  const [sliderItems, setSliderItems] = useState([]);
  const width = Dimensions.get("window").width;

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
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
        <View className="flex-1 items-center justify-start gap-5 bg-backgroundTheme">
          {/* <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={sliderItems}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => {
              // console.log("current index:", index)
            }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  margin: 15,
                  }}
                  >
                  <Image
                  borderRadius={10}
                  resizeMode="contain"
                  style={{ width: "100%", height: 100 }}
                  source={{
                    uri: item.image.dataUrl,
                  }}
                />
              </View>
              )}
              /> */}

          <View  style={{maxWidth:"300px"}}>
            <CustomCarousel items={sliderItems} />
          </View>
          <Text className="font-iranSansBold text-lg">به شارینت خوش آمدید</Text>
          <Link href={"/qr-scan"}>
            <LinearGradient
              colors={["#eeaeca", "#94bde9"]}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text className="font-iranSansBold text-white">اسکن کد QR</Text>
            </LinearGradient>
          </Link>
          <Pressable
            className="flex my-3 w-44"
            title={title}
            onPress={() => {
              getCurrentLocation();
            }}
          >
            <LinearGradient
              colors={["#c2a3ff", "#ffb677"]}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text className="font-iranSansBold text-white">{title}</Text>
            </LinearGradient>
          </Pressable>
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
                    <Text className="font-iranSansBold">
                      {"lat: " + message?.coords?.latitude}
                    </Text>
                    <Text className="font-iranSansBold">
                      {"lon: " + message?.coords?.longitude}
                    </Text>
                  </View>
                ) : (
                  <Text>{message}</Text>
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      {/* </ScrollView> */}
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
