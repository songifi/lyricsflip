import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { HeaderProps } from "@/app/types/all_types";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.light.gradient, Colors.light.primary]}
        style={styles.header}
      >
        <View style={styles.container}>
          <Text style={styles.logo}>
            Lyric<Text style={styles.logoAccent}>Flip</Text>
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#9747FF",
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
  },
  container: {
    gap: 50,
  },
  logo: {
    fontSize: 24,
    color: "white",
    fontFamily: Fonts.Bricolage,
  },
  logoAccent: {
    color: Colors.light.tetiary,
  },
  textContainer: {
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter,
    color: "white",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Fonts.Inter,
    color: "white",
    lineHeight: 32,
  },
});

export default Header;
