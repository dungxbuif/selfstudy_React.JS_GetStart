import actionTypes from './actionTypes';
import {
   createNewUserService,
   getAllUsers,
   deleteUserService,
   updateUserService,
   getTopDoctorHomeService,
} from '../../services/userService';
import {toast} from 'react-toastify';

export const createNewUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await createNewUserService(data);
         if (res && res.code === 0) {
            toast.success('Creating user succeed!!');
            dispatch(saveUserSuccess());
         } else {
            dispatch(saveUserFailed());
            toast.error('Create user error!!');
         }
      } catch (e) {
         toast.error('Create user error!!');
         dispatch(saveUserFailed());
         console.log('Save user error', e);
      }
   };
};

export const saveUserSuccess = () => ({
   type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
   type: actionTypes.CREATE_USER_FAILED,
});

export const fetchALllUsersStart = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllUsers('ALL');
         if (res && res.code === 0) {
            dispatch(fetchALllUsersSuccess(res.data));
            toast.success('Load all users succeed!!');
         } else {
            dispatch(fetchALllUsersFailed());
            toast.error('Load all users failed!!');
         }
      } catch (e) {
         dispatch(fetchALllUsersFailed());
         console.log('fetchALllUsersFailed err', e);
         toast.error('Load all users failed!!');
      }
   };
};

export const fetchALllUsersSuccess = (data) => ({
   type: actionTypes.FETCH_ALL_USERS_SUCCESS,
   users: data,
});

export const fetchALllUsersFailed = () => ({
   type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (userId) => {
   return async (dispatch, getState) => {
      try {
         let res = await deleteUserService(userId);
         if (res && res.code === 0) {
            toast.success('Delete user succeed!!');
            dispatch(deleteUserSuccess());
         } else {
            dispatch(deleteUserFailed());
         }
      } catch (e) {
         toast.error('Delete user error!!');
         dispatch(deleteUserFailed());
         console.log('Save user error', e);
      }
   };
};

export const deleteUserSuccess = () => ({
   type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
   type: actionTypes.DELETE_USER_FAILED,
});

export const updateUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await updateUserService(data);
         if (res && res.code === 0) {
            toast.success('Editing user succeed!!');
            dispatch(updateUserSuccess());
            dispatch(fetchALllUsersStart());
         } else {
            dispatch(updateUserFailed());
            toast.error('Editing user error!!');
         }
      } catch (e) {
         toast.error('Create user error!!');
         dispatch(updateUserFailed());
         console.log('Save user error', e);
      }
   };
};

export const updateUserSuccess = () => ({
   type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
   type: actionTypes.UPDATE_USER_FAILED,
});

export const fetchTopDoctors = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getTopDoctorHomeService();
         if (res && res.code === 0) {
            dispatch({
               type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
               dataDoctors: res.data,
            });
            console.log('Get doctor succeeded!!');
         } else {
            dispatch({
               type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
            console.log('Get doctor error!!');
         }
      } catch (e) {}
   };
};
// let res1 = await getTopDoctorHomeService();