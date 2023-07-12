import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import axios from '../API/Api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const Nhapkho = ({ user }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [filterType, setSelectedFilter] = useState('all');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Chitiet', { sp: item.ID_IBT });
  };
  const handleApplyFilter = () => {
    console.log('Applied filter:', filterType);
    setItems([]);
    setPage(1);
    fetchData(filterType);
  };
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    console.log('Selected filter:', value);
    if (value === 'custom') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };
  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  
  useEffect(() => {
    setPage(1);
    fetchData();
  }, []);

  const fetchData = async (filterType = {value: 'all'}) => {
    try {
      const state = await NetInfo.fetch();
      let data;
      let response;
      console.log(filterType)
  
      if (filterType == {value: 'all'}) {
        response = await axios.getImportItemsPage(user, page);
      } else {
        response = await axios.locNhapHang(user, filterType, page);
      }
  
      if (state.isConnected) {
        data = response.items;
        await AsyncStorage.setItem('itemsNhap', JSON.stringify(data));
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
    fetchData(filterType); 
  };

  const filterOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Ngày', value: 'today' },
    { label: 'Tuần', value: 'thisWeek' },
    { label: 'Tháng', value: 'thisMonth' },
    { label: 'Tùy chọn', value: 'custom' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <SelectDropdown
          data={filterOptions}
          defaultButtonText="Tất cả"
          defaultValue={filterType}
          onSelect={(value) => handleFilterChange(value)}
          buttonTextAfterSelection={(selectedItem) => selectedItem.label}
          rowTextForSelection={(item) => item.label}
          buttonStyle={styles.filterButton}
          buttonTextStyle={styles.filterButtonText}
          dropdownStyle={styles.filterDropdown}
          dropdownTextStyle={styles.filterDropdownText}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity style={styles.locbtn} onPress={handleApplyFilter}>
          <Text style={styles.locText}>Lọc</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
    flex: 1,
    backgroundColor: 'white'
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    bottom: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  locbtn: {
    marginRight: 100,
    borderColor: '#00AFCE',
    borderWidth: 1,
    width: 60,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10
  },
  locText: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Segoe UI',
    color: '#000',
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderColor: '#00AFCE',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    left: 10
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'seguisb'
  },
  filterDropdown: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fafafa',
    borderWidth: 0,
    borderBottomColor: '#fff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  filterDropdownText: {
    fontSize: 16,
    color: '#333333',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F2F2F2',
  },
  item: {
    alignItems: 'left',
    justifyContent: 'space-between',
    height: 140,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 0.5,
  },
  itemContent: {
    position: 'relative',
    margin: 10,
  },
  text: {
    left: 3,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'seguisb',
  },
  text1: {
    top: 5,
    left: 3,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
    fontFamily: 'Segoe UI',
  },
  itemDetails: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 80,
  },
  detailText: {
    flex: 1,
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'seguisb',
    color: '#00AFCE',
  },
  detailText1: {
    flex: 0,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'seguisb',
    color: '#00AFCE',
  },
});

export default Nhapkho;
