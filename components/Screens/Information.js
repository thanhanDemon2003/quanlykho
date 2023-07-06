import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, {useContext } from 'react'
import { AuthContext } from '../Context/Appcontext';

const Information = ({user}) => {
    const { logoutContext } = useContext(AuthContext);
  
    const handleLogout = () => {
      Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn đăng xuất?',
        [
          { text: 'Không', style: 'cancel' },
          { text: 'Có', onPress: logoutContext }
        ]
      );
    };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{left:-40, fontSize: 30, color: 'black', marginTop: 30}}>User Id_KH: {user}</Text>
      <TouchableOpacity
      style={{top: 100,height:50, width:200, alignItems: 'center', backgroundColor: '#FF9900', borderRadius: 10, justifyContent:'center'}}>
        <Text style={{fontSize:20 }} onPress={handleLogout}>Đăng Xuất</Text></TouchableOpacity>
        {/* () => navigation.navigate('Login') */}
    </View>
  )
}

export default Information

const styles = StyleSheet.create({})