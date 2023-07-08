import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.2.156:3000',
  timeout: 1000,
});
//http://localhost:3000/ibibt/searchProduct/12?page=1
const getItemsPage = async (user, page, searchTerm) => {
  try {
    const response = await api.get(`/ibibt/searchProduct/${user}?page=${page}&search=${searchTerm}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//http://localhost:3000/ibibt/getimportpage/12?page=1 
const getImportItemsPage = async (user, page) => {
  try {
    const response = await api.get(`/ibibt/getimportpage/${user}?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//http://localhost:3000/ibibt/getexportpage/12?page=1 
const getExportItemsPage = async (user, page) => {
  try {
    const response = await api.get(`/ibibt/getexportpage/${user}?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const detailSanPham = async (sp) => {
  try {
    const response = await api.get(`/ibibt/detailproduct?sp=${sp}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
const detailSanPhamXuat = async (sp) => {
  try {
    const response = await api.get(`/ibibt/detailproductxuat?sp=${sp}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
const Login = async (username, password) => {
  try {
    const response = await api.post(`/ibibt/Login`, {
      username,
      password
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 400) {
      console.log(error.response.data.message)
      return (error.response.data);
    } else {
      throw error;
    }
  }
};

export default {
  getItemsPage,
  getExportItemsPage,
  getImportItemsPage,
  Login,
  detailSanPham,
  detailSanPhamXuat
};
