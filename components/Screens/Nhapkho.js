import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../API/Api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const Nhapkho = (props) => {
  const { user } = props
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Chitiet', { sp: item.ID_IBT });
  };

  useEffect(() => {
    setPage(1);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const state = await NetInfo.fetch();
      let data;
      if (state.isConnected) {
      const response = await axios.getImportItemsPage(user, page);
      data = response.items;
      await AsyncStorage.setItem('', JSON.stringify(data));
      } else {
        const savedData = await AsyncStorage.getItem('itemsNhap');
        data = JSON.parse(savedData);
      }
  
      if (page === 1) {
        setItems(data);
      } else {
        setItems((prevItems) => [...prevItems, ...data]);
      }
    } catch (error) {
      console.log('error>>', error);
      const savedData = await AsyncStorage.getItem('itemsNhap');
      const data = JSON.parse(savedData);
      setItems(data);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>ND: {item.GHI_CHU}</Text>
        <Text style={styles.text1}>Trạng thái: {item.TRANG_THAI}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.detailText}>{item.SO_THUNG} Thùng</Text>
          <Text style={styles.detailText1}>{item.KHOI_LUONG} Kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(items, index) => index.toString()} 
        numColumns={1}
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
  listContainer: {
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
    position: 'relative',
    margin: 10
  },
  text: {
    left: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  text1: {
    top: 5,
    left: 3,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black'
  },
  itemDetails: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 80
  },
  detailText: { 
    flex: 1,
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
  detailText1: {
    flex: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Nhapkho;
