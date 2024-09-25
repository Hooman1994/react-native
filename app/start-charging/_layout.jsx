import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { WebSocketContext } from "../../assets/webSocketContext"; // Import WebSocket context

const StartCharging = () => {
  debugger;
  const ws = useContext(WebSocketContext);
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {

    if (ws) {
      ws.onmessage = (message) => {
        const data = message.data;
        console.log("WebSocket message received:", data);
        setServerMessage(data);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
      };
    }
  }, [ws]);

  return (
    <View>
      <Text>اطلاعات شارژ</Text>
      <Text>{serverMessage}</Text>
    </View>
  );
};

export default StartCharging;
