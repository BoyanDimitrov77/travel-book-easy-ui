import authReducer from './authReducer';
import flightReducer from './flightReducer';
import fligtBookReducer from './flightBookReducer'
import companyReducer from './companyReducer';
import traveClassReducer from './traveClassReducer';
import trainReducer from './trainReducer';
import busReducer from './busReducer';
import imageReducer from './imageReducer';
import clientTokenReducer from './clientTokenReducer'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
  auth: authReducer,
  flight : flightReducer,
  flightBook : fligtBookReducer,
  train: trainReducer,
  bus : busReducer,
  companies : companyReducer,
  travelClasses : traveClassReducer,
  image : imageReducer,
  clientToken : clientTokenReducer
});

const rootReducer = (state, action) =>{
  if(action.type === 'RESET_APP'){
    console.log("reset State");
    Object.keys(state).forEach(key=>{
      storage.removeItem(`persist:${key}`);
    });

    state = undefined;
  }
  if(action.type === 'RESET_APP_WITHOUT_USER'){
    Object.keys(state).forEach(key=>{
      if(`${key}` !== "auth"){
        storage.removeItem(`persist:${key}`);
      }
    });
    const { auth } = state;
    state = { auth };
  }
  return appReducer(state,action);
}

export default rootReducer;
