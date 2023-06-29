import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';



const item  = {}
const Hang = ({ route }) => {
      const { item } = route.params;

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <Text style={styles.label}>ID_IBT:</Text>
            <Text style={styles.value}>{item.ID_IBT}</Text>

            <Text style={styles.label}>ID_KHO:</Text>
            <Text style={styles.value}>{item.ID_KHO}</Text>

            <Text style={styles.label}>ID_KH:</Text>
            <Text style={styles.value}>{item.ID_KH}</Text>

            <Text style={styles.label}>MA_KH:</Text>
            <Text style={styles.value}>{item.MA_KH}</Text>

            <Text style={styles.label}>TEN_KH:</Text>
            <Text style={styles.value}>{item.TEN_KH}</Text>

            <Text style={styles.label}>NGAY_NHAP:</Text>
            <Text style={styles.value}>{item.NGAY_NHAP}</Text>

            <Text style={styles.label}>TRANG_THAI:</Text>
            <Text style={styles.value}>{item.TRANG_THAI}</Text>

            <Text style={styles.label}>KHOI_LUONG:</Text>
            <Text style={styles.value}>{item.KHOI_LUONG}</Text>

            <Text style={styles.label}>SO_THUNG:</Text>
            <Text style={styles.value}>{item.SO_THUNG}</Text>

            <Text style={styles.label}>SO_PALLET:</Text>
            <Text style={styles.value}>{item.SO_PALLET}</Text>

            <Text style={styles.label}>SO_INV:</Text>
            <Text style={styles.value}>{item.SO_INV}</Text>

            <Text style={styles.label}>CUA_SO:</Text>
            <Text style={styles.value}>{item.CUA_SO}</Text>

            <Text style={styles.label}>SO_THAM_CHIEU:</Text>
            <Text style={styles.value}>{item.SO_THAM_CHIEU}</Text>

            <Text style={styles.label}>NGAY_KET_THUC:</Text>
            <Text style={styles.value}>{item.NGAY_KET_THUC}</Text>

            <Text style={styles.label}>SO_KIEM_DICH:</Text>
            <Text style={styles.value}>{item.SO_KIEM_DICH}</Text>

            <Text style={styles.label}>NOI_CAP:</Text>
            <Text style={styles.value}>{item.NOI_CAP}</Text>

            <Text style={styles.label}>NGAY_CAP:</Text>
            <Text style={styles.value}>{item.NGAY_CAP}</Text>

            <Text style={styles.label}>NOI_DEN:</Text>
            <Text style={styles.value}>{item.NOI_DEN}</Text>

            <Text style={styles.label}>SL_KIEM_DICH:</Text>
            <Text style={styles.value}>{item.SL_KIEM_DICH}</Text>

            <Text style={styles.label}>KL_KIEM_DICH:</Text>
            <Text style={styles.value}>{item.KL_KIEM_DICH}</Text>

            <Text style={styles.label}>GHI_CHU:</Text>
            <Text style={styles.value}>{item.GHI_CHU}</Text>

            <Text style={styles.label}>TEN_LX:</Text>
            <Text style={styles.value}>{item.TEN_LX}</Text>

            <Text style={styles.label}>SDT:</Text>
            <Text style={styles.value}>{item.SDT}</Text>

            <Text style={styles.label}>BKS:</Text>
            <Text style={styles.value}>{item.BKS}</Text>

            <Text style={styles.label}>SO_CONT:</Text>
            <Text style={styles.value}>{item.SO_CONT}</Text>

            <Text style={styles.label}>SO_CHI:</Text>
            <Text style={styles.value}>{item.SO_CHI}</Text>

            <Text style={styles.label}>CREATE_BY:</Text>
            <Text style={styles.value}>{item.CREATE_BY}</Text>

            <Text style={styles.label}>CREATE_TIME:</Text>
            <Text style={styles.value}>{item.CREATE_TIME}</Text>

            <Text style={styles.label}>UPDATE_BY:</Text>
            <Text style={styles.value}>{item.UPDATE_BY}</Text>

            <Text style={styles.label}>UPDATE_TIME:</Text>
            <Text style={styles.value}>{item.UPDATE_TIME}</Text>

            <Text style={styles.label}>PHI_MA_CAN:</Text>
            <Text style={styles.value}>{item.PHI_MA_CAN}</Text>

            <Text style={styles.label}>PHI_BOC_XEP:</Text>
            <Text style={styles.value}>{item.PHI_BOC_XEP}</Text>

            <Text style={styles.label}>PHI_DAN_TEM:</Text>
            <Text style={styles.value}>{item.PHI_DAN_TEM}</Text>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F2F2F2',
      },
      fieldContainer: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      label: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
      },
      value: {
        flex: 2,
        fontSize: 16,
      },
});

export default Hang;
