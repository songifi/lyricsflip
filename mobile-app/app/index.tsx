import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
<<<<<<< HEAD
import { Redirect, router } from 'expo-router'

export default function () {
  return (
    // <View style={{margin: 50, backgroundColor: '#ccc', padding: 20}}>
    //   <Text onPress={() => router.push("/(tabs)")}>TABS</Text>
    // </View>

    <Redirect href='/(drawer)/(tabs)' />
=======
import OnboardingScreen from "./screens/onboarding/onboarding.screen";

export default function index() {
  return (
    <View>
 <OnboardingScreen />
    </View>
>>>>>>> 4b52bc85332eecc28d69d39ab2f4c88bc262745a
  )
}

const styles = StyleSheet.create({})