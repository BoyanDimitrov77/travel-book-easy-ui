import authReducer from './authReducer';
import flightReducer from './flightReducer';
import companyReducer from './companyReducer';
import traveClassReducer from './traveClassReducer';
import trainReducer from './trainReducer';
import busReducer from './busReducer';
import imageReducer from './imageReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  auth: authReducer,
  flight : flightReducer,
  train: trainReducer,
  bus : busReducer,
  companies : companyReducer,
  travelClasses : traveClassReducer,
  image : imageReducer
});

export default rootReducer;
