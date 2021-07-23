import actionTypes from './actionTypes';
import {
   createNewUserService,
   getAllUsers,
   deleteUserService,
} from '../../services/userService';
import { toast } from 'react-toastify';

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
         } else {
            dispatch(fetchALllUsersFailed());
         }
      } catch (e) {
         dispatch(fetchALllUsersFailed());
         console.log('fetchALllUsersFailed err', e);
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
