import { StyleSheet } from 'react-native'
import React from 'react'
import { Redirect} from 'expo-router'

export default function () {
  return (
    // <View style={{margin: 50, backgroundColor: '#ccc', padding: 20}}>
    //   <Text onPress={() => router.push("/(tabs)")}>TABS</Text>
    // </View>

    <Redirect href='/(drawer)/(tabs)' />
  )
}

const styles = StyleSheet.create({})