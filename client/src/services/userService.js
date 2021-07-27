import axios from '../axios';

const handleLogin = (email, password) => {
   return axios.post('api/login', {email, password});
};

const getAllUsers = (id) => {
   return axios.get(`/api/get-all-user?id=${id}`);
};

const createNewUserService = (data) => {
   return axios.post(`/api/create-new-user`, data);
};

const updateUserService = (data) => {
   return axios.put(`/api/update-user`, data);
};

const deleteUserService = (id) => {
   return axios.delete(`/api/delete-user`, {data: {id}});
};

const editUserService = (id) => {
   return axios.delete(`/api/delete-user`, {data: {id}});
};

const getTopDoctorHomeService = (limit) => {
   return axios.get(`/api/get-top-doctor-home?limit=${limit}`);
};

export {
   handleLogin,
   getAllUsers,
   createNewUserService,
   deleteUserService,
   editUserService,
   updateUserService,
   getTopDoctorHomeService,
};
