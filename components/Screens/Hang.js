import React, { useEffect, useState  } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../API/Api';


const Hang = ({route}) => {
  
  const [items, setItems] = useState([]);
  const {sp} = route.params;
  console.log(sp)


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.detailSanPham(sp);
      const data = response.items;
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.text}>Tên sản phẩm: {item.TEN_SP}</Text>
        <Text style={styles.text1}>Hạn sử dụng: {item.HSD}</Text>
        <Text style={styles.text1}>Ref: {item.REF}</Text>
        <View style={styles.itemDetails}>
        <Text style={styles.detailText}>{item.SO_LUONG} Thùng</Text>
        <Text style={styles.detailText1}>{item.KHOI_LUONG} Kg</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
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
    top:20,
    alignItems: 'left',
    justifyContent: 'Space-between',
    marginVertical: 10,
    height: 170,
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

    left: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  text1: {
    top:20,
    left: 5,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black'
  },
  itemDetails: {
    position:'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop:130
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

export default Hang;
