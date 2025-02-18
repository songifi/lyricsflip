import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'

export default function index() {
  const navigate = useNavigation()
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <Text>Index</Text>
    </View>
  )
}

const styles = StyleSheet.create({})