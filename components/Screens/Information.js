import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Information = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{left:-80, fontSize: 30, color: 'black', marginTop: 30}}>User: tung.nt</Text>
      <TouchableOpacity
      style={{top: 100,height:50, width:200, alignItems: 'center', backgroundColor: '#FF9900', borderRadius: 10, justifyContent:'center'}}>
        <Text style={{fontSize:20 }} onPress={() => navigation.navigate('Login')}>Đăng Xuất</Text></TouchableOpacity>
    </View>
  )
}

export default Information

const styles = StyleSheet.create({})