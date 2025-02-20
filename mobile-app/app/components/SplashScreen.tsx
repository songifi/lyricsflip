import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "@/constants/Fonts";

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.light.gradient, Colors.light.primary]}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.splashTitle}>
          Lyric
          <Text style={styles.splashFlip}>Flip</Text>
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.splashSubtitle}>
          Have fun testing your lyrical knowledge 🎵
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.light.gradient,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashTitle: {
    fontSize: 48,
    color: "white",
    fontFamily: Fonts.Bricolage,
  },
  bottomContainer: {
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
  },
  splashSubtitle: {
    fontSize: 16,
    color: "white",
    fontFamily: Fonts.Inter,
  },
  splashFlip: {
    color: Colors.light.tetiary,
    fontFamily: Fonts.Bricolage,
  },
});

export default SplashScreen;
