import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function FlipCardScreen() {
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const handleFlip = () => {
    setFlipped(!flipped);
    rotation.value = withTiming(flipped ? 0 : 180, { duration: 800 });
  };

  const frontStyle = useAnimatedStyle(() => {
    let rotateY = interpolate(
      rotation.value,
      [0, 180],
      [0, Math.PI],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ rotateY: `${rotateY}rad` }],
      opacity: interpolate(
        rotation.value,
        [90, 90.01],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  const backStyle = useAnimatedStyle(() => {
    let rotateY = interpolate(
      rotation.value,
      [0, 180],
      [Math.PI, 2 * Math.PI],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ rotateY: `${rotateY}rad` }],
      opacity: interpolate(
        rotation.value,
        [90, 90.01],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Pressable style={styles.container} onPress={handleFlip}>
      <Animated.View style={[styles.card, frontStyle]}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Front</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Back</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    width: 200,
    top: 20,
    height: 120,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
    borderRadius: 8,
  },
  cardBack: {
    backgroundColor: "purple",
  },
});
