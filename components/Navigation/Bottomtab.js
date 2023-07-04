import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import Kho from '../Screens/Kho';
import Nhapkho from '../Screens/Nhapkho';
import Xuatkho from '../Screens/Xuatkho';
import Information from '../Screens/Information';
import { AuthContext } from '../Context/Appcontext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const Bottomtab = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log('context:', user);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'KhoScreen') {
            iconName = focused ? 'home' : 'archive';
          } else if (route.name === 'NhapkhoScreen') {
            iconName = focused ? 'plus-square' : 'pencil-square';
          } else if (route.name === 'XuatkhoScreen') {
            iconName = focused ? 'arrow-circle-right' : 'share-square';
          } else if (route.name === 'Information') {
            iconName = focused ? 'question' : 'file-exclamation'
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3399FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
      })}
    >
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitle: 'Tồn Kho',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#FFFF99', fontSize: 25 },
          headerStyle: { backgroundColor: '#3399FF' }
        }}
        name="KhoScreen"
        component={Kho}
        initialParams={{ user }}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitle: 'Nhập Kho',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#FFFF99', fontSize: 25 },
          headerStyle: { backgroundColor: '#3399FF' }
        }}
        initialParams={{ user }}
        name="NhapkhoScreen"
        component={Nhapkho}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitle: 'Xuất Kho',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#FFFF99', fontSize: 25 },
          headerStyle: { backgroundColor: '#3399FF' }
        }}
        initialParams={{ user }}
        name="XuatkhoScreen"
        component={Xuatkho}
      />
       <Tab.Screen
        options={{
          headerShown: true,
          headerTitle: 'Khác',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#FFFF99', fontSize: 25 },
          headerStyle: { backgroundColor: '#3399FF' }
        }}
        initialParams={{ user }}
        name="Information"
        component={Information}
      />
    </Tab.Navigator>
  );
};

export default Bottomtab;

const styles = StyleSheet.create({});
