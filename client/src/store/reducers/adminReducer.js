import actionTypes from '../actions/actionTypes';

const initialState = {
   users: [],
   topDoctors: [],
   allDoctors: [],
   allScheduleTime: [],
   dataDoctorRequired: {},
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

      case actionTypes.FETCH_AllCODES_SCHEDULE_HOURS_SUCCESS:
         state.allScheduleTime = action.dataTime;
         return {
            ...state,
         };
      case actionTypes.FETCH_AllCODES_SCHEDULE_HOURS_FAILED:
         state.allScheduleTime = [];
         return {
            ...state,
         };
      case actionTypes.GET_DOCTOR_ALL_CODE_SUCCEED:
         state.dataDoctorRequired = action.dataDoctorRequired;
         return {
            ...state,
         };
      case actionTypes.GET_DOCTOR_ALL_CODE_FAILED:
         state.dataDoctorRequired = {};
         return {
            ...state,
         };
      default:
         return state;
   }
};

export default adminReducer;
