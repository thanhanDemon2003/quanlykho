import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from '../API/Api';
import { AuthContext } from '../Context/Appcontext';

const Kho = (props) => {
  const { navigation, route } = props;
  const { user } = route.params;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setsearchTerm] = useState('')
  console.log(user, searchTerm, '11111111111')

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.replace('Bottomtab');
      return true;
    });

    return () => backHandler.remove();
  }, []);
  
  const handleSearchButtonPress = () => {
    console.log(searchTerm,'222222')
    setItems([]);
    setPage(1);
    fetchData();
    
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.getItemsPage(user, page, searchTerm);
      const data = response.products;
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
      console.log('error>>', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>{item.TEN_SP}</Text>
        <Text style={styles.text1}>Hạn sử dụng: {item.HSD}</Text>
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
    fetchData();
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
    left:10,
    marginTop: 20,
    height: 40,
    width:260,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    width: 100,
    marginLeft:280,
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

    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
  detailText1: {
    marginLeft: 200,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Kho;
