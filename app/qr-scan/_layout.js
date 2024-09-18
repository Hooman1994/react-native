import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    if (hasPermission === null) {
      getCameraPermissions();
    }
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 w-full justify-center items-center p-2">
        <Text className="border border-1 p-2 rounded-md">
          درخواست مجوز دسترسی به دوربین
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1 w-full justify-center items-center p-2">
        <Text className="">دسترسی به دوربین وجود ندارد</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />
        {scanned && (
          <Button
            style={styles.button}
            title={"Tap to Scan Again"}
            onPress={() => {
              setText("");
              setScanned(false);
            }}
          />
        )}
      </View>
      <SafeAreaView style={styles.inputContainer}>
        <Text style={styles.title}>شناسه شارژر</Text>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="شناسه شارژر را وارد کنید"
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    margin: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 250,
  },
  inputContainer: {
    display: "flex",
    alignItems: "end",
  },
});
