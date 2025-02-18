import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { router, usePathname } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';

 export default function CustomDrawerItems(props: any) {
  const pathname = usePathname()

  const isActiveRoute = (routePath : string) => {
    return pathname === routePath
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems:'center', gap:10, paddingVertical: 15, paddingHorizontal: 20, paddingTop: 60, borderBottomWidth: 1, borderColor: '#DBE1E7'}}>
        <Image style={styles.imageAvatar} source={require('../../assets/images/avatar.png')} />
        <View>
          <Text style={{fontWeight:700, fontSize: 20}}>theOxneedeth</Text>
          <Text style={{fontWeight:200, fontSize: 12}}>0x05e8c...d4b08fd4637c</Text>
        </View>
      </View>
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <DrawerItem label={'Profile'} icon={() => <Octicons name='person' size={25} color={'#212121'}/>} onPress={() => router.push('/(drawer)/(tabs)')} />    
            <DrawerItem label={'Charts'} icon={() => <Ionicons name="chatbubbles-outline" size={24} color={'#212121'}/>} onPress={() => router.push('/(drawer)/(tabs)')} />    
            <DrawerItem label={'About Us'} icon={() => <Feather name='info' size={25} color={'#212121'}/>} onPress={() => router.push('/(drawer)/(tabs)')}   />    
            <DrawerItem label={'Settings'} icon={() => <Feather name='settings' size={25} color={'#212121'}/>} onPress={() => router.push('/(drawer)/(tabs)')}/>    
        </DrawerContentScrollView> 

        <View style={{paddingHorizontal: 10}}>
          <DrawerItem label={'Log Out'} icon={() => <MaterialIcons name='logout' size={24} color={'#212121'}/>} onPress={() => router.push('/(drawer)/(tabs)')} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
})