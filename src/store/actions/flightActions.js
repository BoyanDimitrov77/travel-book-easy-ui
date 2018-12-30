import { createFlightRequest, getAllFlights, fetchImage } from '../../util/API_REST';


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

export const allFlights = () => {
  return (dispatch, getState) =>{
    getAllFlights()
      .then(response => {
          dispatch({type: 'ALL_FLIGHTS', flights : response });
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'ALL_FLIGHTS_ERROR', error : error });
              }
            });
  }

}

export const getImage = (ImageUrl) =>{
  return (dispatch, getState) =>{
    fetchImage(ImageUrl)
      .then(response => {
          dispatch({type: 'GET_IMAGE', image : response });
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'GET_IMAGE_ERROR', error : error });
              }
            });
  }
}
