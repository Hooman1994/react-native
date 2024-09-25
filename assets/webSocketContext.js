import React, { createContext, useState, useEffect } from "react";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    debugger;

    const webSocket = new WebSocket("wss://dgw.emapna.com/");

    webSocket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    webSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    webSocket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setWs(webSocket);

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
