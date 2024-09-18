import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { icons } from "../../constants";
import axios from "axios";
import { Link } from "expo-router";
import { userInfoStore } from "../../stores/userInfoStore";

const Profile = () => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const setFullName = userInfoStore((state) => state.setFullName);

  const employees = [
    { name: "هومن", lastName: "رحیم پور" },
    { name: "سعید", lastName: "نصیری" },
    { name: "حسین", lastName: "وهابی" },
    { name: "جواد", lastName: "زرگر" },
    { name: "روح اله", lastName: "راستگو" },
  ];

  useEffect(() => {
    axios
      .get("https://gen.emapna.com/api/cms/mostVisited")
      .then((result) => {
        setItems(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handlePress = (employee) => {
    const fullName = `${employee.name} ${employee.lastName}`;
    setFullName(fullName);
  };

  return (
    <View className="flex-1 items-center justify-start p-5 gap-2">
      <View className="flex-row gap-1">
        <Link href={"/user-info"} asChild>
          <Pressable className="shadow-2xl bg-white rounded-full p-3">
            <Image
              source={icons.profile}
              resizeMode="contain"
              className="w-12 h-12"
            />
          </Pressable>
        </Link>
      </View>
      <View className="flex justify-center gap-2 items-end">
        {employees.map((employee, index) => (
          <View
            className="flex bg-[#DDDDDD] justify-center items-center p-3 rounded-xl min-w-[100px]"
            key={index}
          >
            <Pressable onPress={() => handlePress(employee)}>
              <Text className="font-iranSansRegular">{employee.name}</Text>
              <Text className="font-iranSansRegular">{employee.lastName}</Text>
            </Pressable>
          </View>
        ))}
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
            <View className="flex-row gap-1">
              <Text className="font-iranSansBold">Hooman</Text>
              <Text className="font-iranSansBold">Rahimpour</Text>
            </View>
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
  );
};

const styles = StyleSheet.create({
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

export default Profile;
