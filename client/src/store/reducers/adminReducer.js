import actionTypes from '../actions/actionTypes';

const initialState = {
   users: [],
};

const adminReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.FETCH_ALL_USERS_SUCCESS:
         state.users = action.users;
         return {
            ...state,
         };
      case actionTypes.FETCH_ALL_USERS_FAILED:
         state.user = [];
         return {
            ...state,
         };
      default:
         return state;
   }
};

export default adminReducer;
