// Xuatkho.js
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../API/Api';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const Xuatkho = ({ user }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [filterType, setSelectedFilter] = useState('all');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Hangxuat', { sp: item.ID_OBT });
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

  const fetchData = async (filterType = 'all') => {
    try {
      const state = await NetInfo.fetch();
      let data;
      let url;
  
      if (filterType == 'all') {
        url = await axios.getExportItemsPage(user, page);
      } else {
        url = await axios.locXuatHang(user, filterType, page);
      }
      if (state.isConnected) {
        const response = url;
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

  const renderItem = ({ item }) => {
    const jsonData = item.GHI_CHU;
    const formattedData = jsonData.replace(/\n/g, ' ');

    return(
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <View style={styles.itemContent}>
        <Text style={styles.text} allowFontScaling={false}>ND: {formattedData}</Text>
        <View style={styles.itemRow}>
          <Text style={styles.labelText}>HSD: {moment(item.NGAY_XUAT).format('DD-MM-YYYY')}</Text>
          <Text style={styles.valueText1}>Trạng thái: {item.TRANG_THAI}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.valueText2}>{item.SO_THUNG} Thùng</Text>
          <Text style={styles.valueText}>{item.KHOI_LUONG} Kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
    }

    const handleLoadMore = () => {
      setPage((prevPage) => prevPage + 1);
      fetchData(filterType); // pass filterType to fetchData
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
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
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
  },
  item: {
    alignItems: 'left',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 0.5,  
     },
  itemContent: {
    position: 'position',
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'black',
    fontFamily: 'seguisb'
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  labelText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '100',
    color: 'black',
    fontFamily: 'Segoe UI'
  },
  valueText: {
    textAlign: 'right',
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE',
    fontFamily: 'seguisb'
    
  },
  valueText2: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00AFCE',
    fontFamily: 'seguisb'
  },
  valueText1: {
    textAlign: 'right',
    flex: 1,
    fontSize: 15,
    fontWeight: '200',
    color: 'black',
    fontFamily: 'Segoe UI'
  }
});

export default Xuatkho;
