import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function _layout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name='index' options={{
        title: "Home",
        tabBarActiveTintColor: "#9747FF",
        tabBarIcon: ({color}) => {
        return <MaterialIcons name='home' size={25} color={color} />
      }}} />
      <Tabs.Screen name='wallet' options={{title: "wallet", tabBarActiveTintColor: "#9747FF", tabBarIcon :  ({color}) => {
        return <Ionicons name="wallet-outline" size={25} color={color} />
      } }} />
      <Tabs.Screen name='leaderboard' options={{title: "leaderboard", tabBarActiveTintColor: "#9747FF",
        tabBarIcon: ({color}) => {
        return <EvilIcons name="trophy" size={28} color={color} />
      }}} />
      <Tabs.Screen name='more' options={{title: "more", tabBarActiveTintColor: "#9747FF",
        tabBarIcon: ({color}) => {
        return <AntDesign name="appstore-o" size={23} color={color} />
      }}} />
    </Tabs>
  )
}

const styles = StyleSheet.create({})