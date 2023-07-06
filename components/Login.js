import React, { useState, useContext, useEffect  } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import axios from './API/Api';
import { AuthContext } from './Context/Appcontext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);
  const { loginContext } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.Login(username, password);
      const user = response.user
      console.log('hiiiii >>>', response.success);

      if (user) {
        loginContext(user);
        console.log(AuthContext);
        Alert.alert('Thông Báo', 'Đăng Nhập Thành Công')
        if (rememberPassword) {
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
        }
      }
      else {
        Alert.alert('Thông Báo', response.message)
      }
      console.log('Username:', username);
      console.log('Password:', password);
    }
    catch (error) {
      console.log(error);
      Alert.alert('Thông Báo', 'Lỗi từ server hoặc lỗi mạng');
    }
  };
  useEffect(() => {
    const getStoredCredentials = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');
  
      if (storedUsername && storedPassword) {
        setUsername(storedUsername);
        setPassword(storedPassword);
        setRememberPassword(true);
      }
    };
  
    getStoredCredentials();
  }, []);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tài khoản"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.passwordIconContainer}
          onPress={toggleShowPassword}
        >
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="gray"
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={rememberPassword}
          onPress={() => setRememberPassword(!rememberPassword)}
          checkedColor="blue"
        />
        <Text style={styles.checkboxLabel}>Lưu mật khẩu</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Đăng nhập" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 50
  }
  ,
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordIconContainer: {
    position: 'absolute',
    right: 10,
  },
  passwordIcon: {
    marginLeft: 5,
    marginTop: -10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: -15,
  },
  buttonContainer: {
    marginTop: 10,

  },
});

export default LoginForm;
