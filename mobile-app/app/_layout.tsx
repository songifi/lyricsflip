import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "@/constants/Fonts";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [splashVisible, setSplashVisible] = useState(true);

  const [loaded] = useFonts({
    Bricolage: require("../assets/fonts/Bricolage.ttf"),
    Inter: require("../assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    SplashScreen.hideAsync();
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
  }, []);

  if (splashVisible && !loaded) {
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
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/auth" options={{ title: "Auth" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

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
