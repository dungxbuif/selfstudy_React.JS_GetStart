import axios from '../axios';

const handleLogin = (email, password) => {
   return axios.post('api/login', { email, password });
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
   return axios.delete(`/api/delete-user`, { data: { id } });
};

const editUserService = (id) => {
   return axios.delete(`/api/delete-user`, { data: { id } });
};

const getTopDoctorHomeService = (limit) => {
   return axios.get(`/api/get-top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
   return axios.get(`/api/get-all-doctors`);
};

const postInfoDoctor = (data) => {
   return axios.post(`api/post-info-doctors`, data);
};

const getDoctorDetailInfo = (doctorID) => {
   return axios.get(`/api/get-detail-doctor-by-id?doctorID=${doctorID}`);
};

const getAllCodeService = (type) => {
   return axios.get(`/api/get-allcode-by-type?type=${type}`);
};

const saveBulkDchedule = (data) => {
   return axios.post(`/api/bulk-create-schedule`, { arrData: data });
};
const getScheduleDoctorByDate = (doctorId, date) => {
   return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
const getExtraDoctorInfoById = (doctorId) => {
   return axios.get(`/api/get-extra-doctor-info-by-id?doctorId=${doctorId}`);
};

export {
   handleLogin,
   getAllUsers,
   createNewUserService,
   deleteUserService,
   editUserService,
   updateUserService,
   getTopDoctorHomeService,
   getAllDoctors,
   postInfoDoctor,
   getDoctorDetailInfo,
   getAllCodeService,
   saveBulkDchedule,
   getScheduleDoctorByDate,
   getExtraDoctorInfoById,
};
