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
import SplashScreenUI from "./components/SplashScreen";

import { useColorScheme } from "@/hooks/useColorScheme";

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
    }, 5000);
  }, []);

  if (splashVisible && !loaded) {
    return (
     <SplashScreenUI />
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