import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import CustomText from "../../components/CustomText";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [connectors, setConnectors] = useState([]);
  const [chargingDataDetails, setChargingDataDetails] = useState({});
  const [connectorId, setConnectorId] = useState(0);
  const router = useRouter();
  const [ws, setWs] = useState(null);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false); // Track WebSocket state

  useEffect(() => {
    const socket = new WebSocket("wss://tgw.emapna.com/");

    socket.onopen = () => {
      console.log("WebSocket connection opened.");
      setIsWebSocketOpen(true); // WebSocket is open
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setIsWebSocketOpen(false); // WebSocket is closed
    };

    setWs(socket);

    // Clean up WebSocket connection on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    if (hasPermission === null) {
      getCameraPermissions();
    }
  }, [hasPermission]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
  };

  function handleCPID(data) {
    if (!ws || !isWebSocketOpen) return; // Ensure WebSocket is open
    ws.send(
      JSON.stringify({
        action: "v2_newCPID",
        cpID: data,
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGIyNGJjMjliYTcwMDAxM2VkMDdhZSIsInBob25lIjoiOTg5MzUzNTg2ODYzIiwicGF5bG9hZFR5cGUiOiJjaGFyZ2VyVXNlckxvZ2luIiwicHJlZml4ZSI6OTgsImlhdCI6MTcyNzI1ODM4NywiZXhwIjoxNzI4NDY3OTg3fQ.5ZhOS1KpuSyYHFVfGAijHTRQO3mtSZoYhPNjScu6dfM",
      })
    );

    ws.onmessage = (message) => {
      console.log("Message from server:", message.data);
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage && parsedMessage.action === "Connectors") {
        setConnectors(parsedMessage.connectors);
        router.push("/start-charging");
      }
    };
  }

  useEffect(() => {
    if (!ws || !isWebSocketOpen) return; // Ensure WebSocket is open

    ws.send(
      JSON.stringify({
        action: "getAllChargers",
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGIyNGJjMjliYTcwMDAxM2VkMDdhZSIsInBob25lIjoiOTg5MzUzNTg2ODYzIiwicGF5bG9hZFR5cGUiOiJjaGFyZ2VyVXNlckxvZ2luIiwicHJlZml4ZSI6OTgsImlhdCI6MTcyNzI1ODM4NywiZXhwIjoxNzI4NDY3OTg3fQ.5ZhOS1KpuSyYHFVfGAijHTRQO3mtSZoYhPNjScu6dfM",
      })
    );

    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage && parsedMessage.action === "chargeData") {
        setChargingDataDetails(parsedMessage);
      }
    };
  }, [ws, isWebSocketOpen]);

  function handleStartCharging(data) {
    setConnectorId(data.id);
    if (!ws || !isWebSocketOpen) return; // Ensure WebSocket is open
    ws.send(
      JSON.stringify({
        action: "userapproved",
        cpID: text.toUpperCase(),
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGIyNGJjMjliYTcwMDAxM2VkMDdhZSIsInBob25lIjoiOTg5MzUzNTg2ODYzIiwicGF5bG9hZFR5cGUiOiJjaGFyZ2VyVXNlckxvZ2luIiwicHJlZml4ZSI6OTgsImlhdCI6MTcyNzI1ODM4NywiZXhwIjoxNzI4NDY3OTg3fQ.5ZhOS1KpuSyYHFVfGAijHTRQO3mtSZoYhPNjScu6dfM",
        connectorId: data.id,
        sendPush: false,
      })
    );
    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage && parsedMessage.action === "chargeData") {
        setChargingDataDetails(parsedMessage);
      }
    };
  }

  function handleStopCharging(data) {
    if (!ws || !isWebSocketOpen) return; // Ensure WebSocket is open
    ws.send(
      JSON.stringify({
        action: "userstop",
        cpID: text.toUpperCase(),
        connectorId: connectorId,
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGIyNGJjMjliYTcwMDAxM2VkMDdhZSIsInBob25lIjoiOTg5MzUzNTg2ODYzIiwicGF5bG9hZFR5cGUiOiJjaGFyZ2VyVXNlckxvZ2luIiwicHJlZml4ZSI6OTgsImlhdCI6MTcyNzI1ODM4NywiZXhwIjoxNzI4NDY3OTg3fQ.5ZhOS1KpuSyYHFVfGAijHTRQO3mtSZoYhPNjScu6dfM",
      })
    );
    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
    };
  }

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
      {connectors?.length > 0 ? (
        <View className="flex gap-7 p-2">
          {connectors.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  handleStartCharging(item);
                }}
                key={index}
              >
                <View className="bg-slate-400 text-white rounded-lg p-4">
                  <Text>{item.connectorName}</Text>
                </View>
              </Pressable>
            );
          })}
          <View>
            <CustomText>
              Duration: {JSON.stringify(chargingDataDetails.duration)}
              Voltage :{JSON.stringify(chargingDataDetails.voltage)}
            </CustomText>
            <Pressable
              onPress={() => {
                handleStopCharging();
              }}
            >
              <View className="bg-red-500 text-white rounded-lg p-4">
                <Text>توقف شارژ</Text>
              </View>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
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
            <Pressable
              onPress={() => {
                handleCPID(text);
              }}
            >
              <View className="flex justify-center items-center w-full">
                <CustomText className="bg-green p-4 justify-center items-center text-white text-xs font-iranSansBold">
                  شروع شارژ
                </CustomText>
              </View>
            </Pressable>
          </SafeAreaView>
        </>
      )}
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
