import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Bottomtab from './Bottomtab';
import Hang from '../Screens/Hang';
import LoginForm from '../Login';
import { NavigationContainer } from '@react-navigation/native';
import Hangxuat from '../Screens/HangXuat';
import DrawerNavigation from '../Screens/Information';

const Stack = createStackNavigator();


const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} name="Bottomtab" component={Bottomtab}  />
      <Stack.Screen options={{ headerTitle: 'Chi tiết hàng nhập' }} name="Chitiet" component={Hang} />
      <Stack.Screen options={{ headerTitle: 'Chi tiết hàng xuất' }} name="Hangxuat" component={Hangxuat} />
    </Stack.Navigator>

  )
} 

export default AppNavigation;
