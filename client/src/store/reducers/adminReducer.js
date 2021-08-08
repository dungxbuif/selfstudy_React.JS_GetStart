import actionTypes from '../actions/actionTypes';

const initialState = {
   users: [],
   topDoctors: [],
   allDoctors: [],
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
      case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
         state.topDoctors = action.dataDoctors;
         return {
            ...state,
         };
      case actionTypes.FETCH_TOP_DOCTORS_FAILED:
         state.topDoctors = [];
         return {
            ...state,
         };
      case actionTypes.FETCH_All_DOCTORS_SUCCESS:
         state.allDoctors = action.dataDoctors;
         return {
            ...state,
         };
      case actionTypes.FETCH_All_DOCTORS_FAILED:
         state.allDoctors = [];
         return {
            ...state,
         };
      default:
         return state;
   }
};

export default adminReducer;
