import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../API/Api';


const Nhapkho = (props) => {
  const { navigation, route } = props
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = route.params;

  const handleItemPress = (item) => {
    navigation.navigate('Chitiet', { sp: item.ID_IBT });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.getImportItemsPage(user, page);
      const data = response.items;
      setItems((prevItems) => [...prevItems, ...data]);
    } catch (error) {
      console.log(error);
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
        keyExtractor={(item) => item.ID_IBT}
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
    height: 110,
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
    marginTop: 60
  },
  detailText: {
    marginTop: 10,
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

export default Nhapkho;
