import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Platform,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

const CustomCarousel = ({ items }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temp, setTemp] = useState(0);

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {

      const nextIndex = (currentIndex + 1) % items.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000); // Autoplay every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  const handleScroll = (event) => {
    setTemp(event.nativeEvent.contentOffset.x);
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  // Web-specific resize handling
  useEffect(() => {
    const updateWidth = () => {
      Dimensions.set({
        window: { width: window.innerWidth, height: window.innerHeight },
      });
    };
    if (Platform.OS === "web") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>{temp}</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={() => {
        Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        }
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScroll}
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
              { width: index === currentIndex ? 25 : 7 },
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
  },
  carouselItem: {
    width: width, // Ensure each item takes full width
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  image: {
    width: "100%", // Make sure the image takes full width of the carousel item
    height: 100, // Adjust height as needed
    borderRadius: 15,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 15,
    bottom: 10,
    left: 30,
  },
  dot: {
    height: 8,
    borderRadius: 5,
    margin: 5,
  },
});

export default CustomCarousel;
