import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Platform,
} from "react-native";

const { width } = Dimensions?.get("window");

const CustomCarousel = ({ items }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      const updateWidth = () => {
        Dimensions?.set({
          window: { width: window.innerWidth, height: window.innerHeight },
        });
      };
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {items.map((item, index) => (
          <View key={index} style={[styles.carouselItem, { width }]}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: item.image.dataUrl,
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: "#ffffff" },
              { width: index === currentIndex ? 24 : 6 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
  },
  scrollView: {
    flexGrow: 0,
    width: Platform.OS === "web" ? 375 : undefined, // Adjust width for web
  },
  carouselItem: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F5FA",
    padding: 15,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 15,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 15,
    bottom: 5,
    left: 25,
  },
  dot: {
    height: 8,
    borderRadius: 5,
    margin: 3,
  },
});

export default CustomCarousel;
