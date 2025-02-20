import React from "react";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OnboardingScreen />
    </GestureHandlerRootView>
  );
}