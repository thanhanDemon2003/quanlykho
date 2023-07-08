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
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Bottomtab = () => {
  const { user } = useContext(AuthContext);
  console.log('context:', user);
  const navigation = useNavigation();
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
            iconName = focused ? 'question' : 'exclamation'
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor:'#00AFCE',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
      })}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Tồn Kho',
          headerShown: true,
          headerTitle: 'Tồn Kho',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white', fontSize: 25 },
          headerStyle: { backgroundColor: '#00AFCE' }
        }}
        name="KhoScreen">{() => <Kho user={user} />}
        </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: 'Nhập Kho',
          headerShown: true,
          headerTitle: 'Nhập Kho',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#FFFF99', fontSize: 25 },
          headerStyle: { backgroundColor: '#3399FF' }
        }}
        name="NhapkhoScreen">{() => <Nhapkho user={user} />}
        </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: 'Xuất Kho',
          headerShown: true,
          headerTitle: 'Xuất Kho',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#FFFF99', fontSize: 25 },
          headerStyle: { backgroundColor: '#3399FF' }
        }}
        name="XuatkhoScreen">{() => <Xuatkho user={user} />}
        </Tab.Screen>
       <Tab.Screen
        options={{
          tabBarLabel: 'Khác',
          headerShown: true,
          headerTitle: 'Khác',
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#FFFF99', fontSize: 25 },
          headerStyle: { backgroundColor: '#3399FF' }
        }}
        name="Information">{() => <Information user={user} />}
        </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Bottomtab;

const styles = StyleSheet.create({});
