import React, { useEffect } from "react";
import { Text, View, Dimensions, Platform, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Map = () => {
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "web" ? (
        <iframe
          src="https://emapna.com"
          style={{ height: "100vh", width: "100%" }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <WebView
            style={styles.webview}
            source={{ uri: "https://www.emapna.com" }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            onError={(error) => console.error("WebView error:", error)}
            renderError={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>An error occurred while loading the web page.</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});
export default Map;
