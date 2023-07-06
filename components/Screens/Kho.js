import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const Kho = ({user}) => {


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
    }
  };

  const handleSearchButtonPress = () => {
    setItems([]);
    setPage(1);
    fetchData();
  };


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>{item.TEN_SP}</Text>
        <Text style={styles.text1}>Hạn sử dụng: {moment(item.HSD).format('DD-MM-YYYY')}</Text>
        <Text style={styles.text1}>Ref: {item.REF}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.detailText}>{item.SL_TONKHO} Thùng</Text>
          <Text style={styles.detailText1}>{item.KHOI_LUONG} Kg</Text>
        </View>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChangeText={text => setsearchTerm(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
        <Text style={styles.searchButtonText}>Tìm kiếm</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    top: 5,
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2'
  },
  item: {
    alignItems: 'left',
    justifyContent: 'Space-between',
    marginVertical: 10,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,

  },
  itemContent: {
    position: 'position',
    margin: 10
  },
  text: {
    left: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  text1: {
    marginTop: 2,
    left: 3,
    fontSize: 15,
    fontWeight: 'normal',
    color: 'black'
  },
  itemDetails: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 90
  },
  detailText: {
    flex: 1,
    textAlign:'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
  detailText1: {
    flex: 0,
    textAlign:'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Kho;
