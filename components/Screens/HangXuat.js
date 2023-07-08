import React, { useEffect, useState  } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';


const Hangxuat = ({route}) => {
  
  const [items, setItems] = useState([]);
  const {sp} = route.params;
  console.log(sp)


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.detailSanPhamXuat(sp);
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
        <Text style={styles.text1}>Hạn sử dụng: {moment(item.HSD).format('DD-MM-YYYY')}</Text>
        <Text style={styles.text1}>Ref: {item.REF}</Text>
        <View style={styles.itemDetails}>
        <Text style={styles.detailText}>{item.SL_XUAT} Thùng - </Text>
        <Text style={styles.detailText1}> {item.KL_XUAT} Kg</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(items, index) => index.toString()}  
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
    left:5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',      
  },
  detailText1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Hangxuat;
