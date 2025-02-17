import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerItem from './CustomDrawerItems';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{headerShown: false}} drawerContent={(props: any) => {
        return <CustomDrawerItem {...props} />
      }}>
        <Drawer.Screen name='(tabs)' options={{headerShown: false}}/>
      </Drawer>
    </GestureHandlerRootView>
  );
}