import actionTypes from './actionTypes';
import { createNewUserService, getAllUsers } from '../../services/userService';

export const createNewUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await createNewUserService(data);
         if (res && res.code === 0) {
            dispatch(saveUserSuccess());
         } else {
            dispatch(saveUserFailed());
         }
      } catch (e) {
         dispatch(saveUserFailed());
         console.log('Save user error', e);
      }
   };
};

export const saveUserSuccess = () => ({
   type: 'CREATE_USER_SUCCESS',
});

export const saveUserFailed = () => ({
   type: 'CREATE_USER_FAILED',
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
   type: 'FETCH_ALL_USERS_SUCCESS',
   users: data,
});

export const fetchALllUsersFailed = () => ({
   type: 'FETCH_ALL_USERS_FAILED',
});
