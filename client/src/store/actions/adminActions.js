import actionTypes from './actionTypes';
import { createNewUserService } from '../../services/userService';

export const createNewUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await createNewUserService(data);
         console.log(res);
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
