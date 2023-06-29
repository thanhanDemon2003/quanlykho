import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.3:3000',
  timeout: 5000,
});

const getItemsPage = async (page) => {
  try {
    const response = await api.get(`/ibibt/getpage?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getImportItemsPage = async (page) => {
  try {
    const response = await api.get(`/ibibt/getimportpage?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getExportItemsPage = async (page) => {
  try {
    const response = await api.get(`/ibibt/getexportpage?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
    getItemsPage,
    getExportItemsPage,
    getImportItemsPage
  };
