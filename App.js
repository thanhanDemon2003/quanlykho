import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kho from './components/Screens/Kho'
import Hang from './components/Screens/Hang'

import Nhapkho from './components/Screens/Nhapkho'; 
import Xuatkho from './components/Screens/Xuatkho';
import Login from './components/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Bottomtab =() =>{
  return(
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: true, headerTitle: 'Tồn Kho', headerTitleAlign: 'center', headerTitleStyle: {color: 'blue', fontSize: 25} }} name="KhoScreen" component={Kho}/>
      <Tab.Screen options={{ headerShown: true, headerTitle: 'Nhập Kho', headerTitleAlign: 'center', headerTitleStyle: {color: 'blue', fontSize: 25} }} name="NhapkhoScreen" component={Nhapkho}/>
      <Tab.Screen options={{ headerShown: true, headerTitle: 'Xuất Kho', headerTitleAlign: 'center', headerTitleStyle: {color: 'blue', fontSize: 25} }} name="XuatkhoScreen" component={Xuatkho}/>
    </Tab.Navigator>
  )
}
const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{headerTitleAlign:'center'}}>
    //   <Stack.Screen options={{headerShown: false}} name="Bottomtab" component={Bottomtab}/>
    //   <Stack.Screen options={{headerTitle: 'Chi tiết'}} name="Chitiet" component={Hang}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Login/>
  )
}

export default App

const styles = StyleSheet.create({})