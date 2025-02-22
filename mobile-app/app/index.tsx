import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import SplashScreen from "./components/SplashScreen";

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );
        setShowOnboarding(hasSeenOnboarding !== "true");
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingStatus();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {showOnboarding ? (
        <OnboardingScreen />
      ) : (
        <Redirect href="/(drawer)/(tabs)" />
      )}
    </GestureHandlerRootView>
  );
}
