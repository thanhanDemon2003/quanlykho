import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Bottomtab from './Bottomtab';
import Hang from '../Screens/Hang';
import LoginForm from '../Login';
import { NavigationContainer } from '@react-navigation/native';
import Hangxuat from '../Screens/HangXuat';
import DateTimePicker from '@react-native-community/datetimepicker';

const Stack = createStackNavigator();


const AppNavigationContainer = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen options={{ headerTitle: 'Quay lại', headerShown: false, headerStyle:{fontFamily: 'seguisb', color: '#fff', fontSize: 25 } }} name="Bottomtab" component={Bottomtab}  />
      <Stack.Screen options={{ headerTitle: 'Chi tiết hàng nhập',headerTintColor: 'white', headerStyle:{fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' },}} name="Chitiet" component={Hang} />
      <Stack.Screen options={{ headerTitle: 'Chi tiết hàng xuất', headerTintColor: 'white', headerStyle:{fontFamily: 'seguisb', color: '#fff', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' }}} name="Hangxuat" component={Hangxuat} />
    </Stack.Navigator>

  )
} 
export default AppNavigationContainer;
