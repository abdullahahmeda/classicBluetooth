import React from 'react'
import DevicesList from './screens/devices-list'
import Home from './screens/home'
import About from './screens/about'
import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

// const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
/*
const Root = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='الرئيسية' component={Home} />
      <Stack.Screen name='الأجهزة' component={DevicesList} />
    </Stack.Navigator>
  )
}
*/
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ drawerPosition: 'right', headerShown: false, drawerLabelStyle: { fontFamily: 'ReadexPro-Regular' } }}>
        <Drawer.Screen name='الرئيسية' component={Home} />
        <Drawer.Screen name='الأجهزة' component={DevicesList} />
        <Drawer.Screen name='من نحن' component={About} options={{ title: 'من نحن' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App
