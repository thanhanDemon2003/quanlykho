import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const Kho = ({ user }) => {


  console.log(user)
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setsearchTerm] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const state = await NetInfo.fetch();
      let data;

      if (state.isConnected) {
        const response = await axios.getItemsPage(user, page, searchTerm);
        data = response.products;
        await AsyncStorage.setItem('products', JSON.stringify(data));
      } else {
        const savedData = await AsyncStorage.getItem('products');
        data = JSON.parse(savedData);
      }

      if (page === 1) {
        setItems(data);
      } else {
        setItems((prevItems) => [...prevItems, ...data]);
      }
    } catch (error) {
      console.log('error>>', error);
      const savedData = await AsyncStorage.getItem('products');
      const data = JSON.parse(savedData);
      setItems(data);
    }
    
  };

  const handleSearchButtonPress = () => {
    setItems([]);
    setPage(1);
    fetchData();
  };


  const renderItem = ({ item }) => {
    const productName = item.TEN_SP.split(" - ")[0];
  return(
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>{productName}</Text>
        <View style={styles.itemRow}>
          <Text style={styles.labelText}>HSD: {moment(item.HSD).format('DD-MM-YYYY')}</Text>
       {item.SO_CONT &&  <Text style={styles.valueText1}>Số cont: {item.SO_CONT}</Text>}
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.labelText}>Ref: {item.REF}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.valueText2}>{item.SL_TONKHO} Thùng</Text>
          <Text style={styles.valueText}>{item.KHOI_LUONG} Kg</Text>
        </View>
      </View>
    </View>
    )
  }
  

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <View style={{  flexDirection: 'column', // Hiển thị các phần tử ngang hàng // Canh giữa các phần tử theo chiều dọc
    paddingHorizontal: 'center',
    marginBottom: 5, backgroundColor:'white'
     }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChangeText={text => setsearchTerm(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
        <Text style={styles.searchButtonText}>Tìm kiếm</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(items, index) => index.toString()} 
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor:'white'
  },
  searchBar: {
    left: 10,
    marginTop: 20,
    height: 40,
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    width: 100,
    marginLeft: 280,
    marginTop: -50,
    backgroundColor: '#00AFCE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '1000',
  },
  listContainer: {
    
    top: 20,
    flexGrow: 1,
    justifyContent: 'flex-start',   
  },
  item: {
    alignItems: 'left',
    justifyContent: 'center',
    height: 160,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  itemContent: {
    position: 'position',
    margin: 10
  },
  text: {
    
    fontSize: 16,
    fontWeight: '400',
    color: 'black'
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  labelText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '300',
    color: 'black'
  },
  valueText: {
    top: 10,
    textAlign: 'right',
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE'
  },
  valueText2: {
    flex: 1,
    top: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE'
  },
  valueText1: {
    textAlign: 'right',
    flex: 1,
    fontSize: 15,
    fontWeight: '300',
    color: 'black'
  },
});

export default Kho;
