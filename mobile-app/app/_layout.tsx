import "../global.css";
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
import { darkTheme, lightTheme } from "@/theme/theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [splashVisible, setSplashVisible] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  const [loaded] = useFonts({
    Bricolage: require("../assets/fonts/Bricolage.ttf"),
    Inter: require("../assets/fonts/Inter.ttf"),
    Satoshi: require("../assets/fonts/Satoshi-Black.otf"),
    SatoshiBold: require("../assets/fonts/Satoshi-Bold.otf"),
    SatoshiBoldItalic: require("../assets/fonts/Satoshi-BoldItalic.otf"),
    SatoshiItalic: require("../assets/fonts/Satoshi-Italic.otf"),
    SatoshiLight: require("../assets/fonts/Satoshi-Light.otf"),
    SatoshiLightItalic: require("../assets/fonts/Satoshi-LightItalic.otf"),
    SatoshiMedium: require("../assets/fonts/Satoshi-Medium.otf"),
    SatoshiMediumItalic: require("../assets/fonts/Satoshi-MediumItalic.otf"),
    SatoshiRegular: require("../assets/fonts/Satoshi-Regular.otf"),
  });

  useEffect(() => {
    SplashScreen.hideAsync();
    setTimeout(() => {
      setSplashVisible(false);
    }, 5000);
  }, []);

  if (splashVisible && !loaded) {
    return <SplashScreenUI />;
  }

  // if (!fontLoaded) {
  //   return null;
  // }

  return (
    <ThemeProvider value={colorScheme === "dark" ? darkTheme : lightTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/auth" options={{ title: "Auth" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
