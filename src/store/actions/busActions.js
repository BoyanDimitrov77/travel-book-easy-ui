import { createBusRequest } from '../../util/API_REST';

export const createBus = (bus) =>{
  return (dispatch, getState) =>{

    createBusRequest(bus)
    .then(response => {
            dispatch({type : 'CREATE_BUS', bus: response});
        }).catch(error => {
            if(error.status === 500) {
              dispatch({type : 'CREATE_BUS_ERROR', error: error })
            }
        });
  }
}
