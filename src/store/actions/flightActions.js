import { createFlightRequest, getAllFlights, fetchImage, searchFlights } from '../../util/API_REST';


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

export const resetPassengers = () =>{
  return (dispatch, getState) =>{
    dispatch({type : "RESET_PASSENGERS"});
  }
}

export const addNewPassenger = (passenger) =>{
  return (dispatch, getState) =>{
    dispatch({type : "ADD_NEW_PASSENGER", passenger : passenger });
  }
}

export const setBookTrasnportParameter = (flightId, price, travelClassId) =>{
  return (dispatch, getState) =>{
    dispatch({type: "BOOK_TRANSPORT_PARAMETER", flightId : flightId, price : price, travelClassId: travelClassId })
  }
}

export const updatePassengerField = (fieldName, fieldValue , passengerId) => {
  return (dispatch, getState) => {
    dispatch({type: 'UPDATE_PASSENGER_FIELDS', fieldName : fieldName, fieldValue: fieldValue, passengerId : passengerId  });
  }
}

export const findFlights = (searchRequest) => {
  return (dispatch, getState) => {
    searchFlights(searchRequest)
    .then(response =>{
      dispatch({type: 'FIND_FLIGHTS',flights : response });
    }).catch(error=>{
      if(error.status === 500) {
        dispatch({type: 'FIND_FLIGHTS_ERROR', error : error });
      }
    })

  }
}
