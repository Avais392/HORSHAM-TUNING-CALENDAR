import {combineReducers} from 'redux';

import authReducer from './authReducer';
import appointmentReducer from './appointmentReducer';

export default combineReducers({
  auth: authReducer,
  appointment: appointmentReducer,
});
