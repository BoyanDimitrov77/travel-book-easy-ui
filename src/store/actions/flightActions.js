import { createFlightRequest } from '../../util/API_REST';


export const createFlight = (flight) => {
  return (dispatch, getState) => {

    createFlightRequest(flight)
      .then(response => {
          dispatch({type: 'CREATE_FLIGHT', flight : response });
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'CREATE_FLIGHT_ERROR', error : error });
              }
            });


  }
}
