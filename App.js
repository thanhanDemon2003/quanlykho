import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './components/Context/Appcontext';
import AppNavigation from './components/Navigation/NavigationContainer';
import LoginForm from './components/Login';

const App = () => {
 const  isLoggedIn = useContext(AuthContext);
  return (

    <AuthProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})