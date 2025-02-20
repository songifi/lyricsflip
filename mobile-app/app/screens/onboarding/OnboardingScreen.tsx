import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "@/app/components/form/Button";
import { ScrollView } from "react-native-gesture-handler";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import onboardingSteps from "@/app/data/OnboardingSteps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const onboardingImage = require("../../../assets/images/card.png");

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const handleNext = (): void => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      scrollViewRef.current?.scrollTo({
        x: width * nextStep,
        animated: true,
      });

      setTimeout(() => {
        scrollX.setValue(width * nextStep);
      }, 100);
    }
  };

  const handleScrollEnd = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newStep = Math.round(contentOffsetX / width);
    setCurrentStep(newStep);
    if (contentOffsetX !== newStep * width) {
      scrollViewRef.current?.scrollTo({
        x: newStep * width,
        animated: true,
      });
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  const imageAnimatedStyle = (index: number) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    return {
      transform: [{ scale }, { rotate }],
      opacity,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.skipContainer}>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            router.push("/screens/auth/CreateAccount")
          }}
        >
          <Text style={styles.skipText}>SKIP </Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        style={[styles.scrollView, { width: width }]}
        contentContainerStyle={{ width: width * onboardingSteps.length }}
      >
        {onboardingSteps.map((step, index) => (
          <View key={index} style={styles.slide}>
            <Animated.View
              style={[styles.imageContainer, imageAnimatedStyle(index)]}
            >
              <Image
                source={onboardingImage}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
        <Text style={styles.description}>
          {onboardingSteps[currentStep].description}
        </Text>
      </View>

      <View style={styles.pagination}>
        {onboardingSteps.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity: dotOpacity,
                  backgroundColor: index === currentStep ? Colors.light.primary : "rgba(255, 255, 255, 0.3)",
                },
              ]}
            />
          );
        })}
      </View>

      {currentStep === onboardingSteps.length - 1 ? (
        <View style={styles.buttonRow}>
          <Button
            title={"Login"}
            primary={false}
            onPress={async () => {
              await AsyncStorage.setItem("hasSeenOnboarding", "true");
              router.push("/screens/auth/CreateAccount")
            }}
            isFullWidth={false}
          />
          <Button
            title={"Create Account"}
            onPress={async () => {
              await AsyncStorage.setItem("hasSeenOnboarding", "true");
              router.push("/screens/auth/CreateAccount")
            }}
            isFullWidth={false}
          />
        </View>
      ) : (
        <Button title={"Next"} onPress={handleNext} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.secondary,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  skipContainer: {
    alignSelf: "flex-end",
    paddingVertical: 10,
  },
  skipText: {
    color: Colors.light.primary,
    fontFamily: Fonts.Inter,
    fontSize: 16,
  },
  scrollView: {
    width: width,
    maxHeight: width,
  },
  slide: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: width - 30,
    height: width - 30,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: Fonts.Bricolage,
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: Fonts.Inter,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.light.primary,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 10,
  },
});

export default OnboardingScreen;
