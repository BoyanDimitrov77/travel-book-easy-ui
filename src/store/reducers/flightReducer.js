const initState = {
  flight:{},
  flights : {}
}

const flightReducer = (state = initState, action) => {

  switch (action.type) {
    case 'CREATE_FLIGHT':
      return {
        ...state,
        flight : action.flight,
        isSuccessfullOperation : true,
        showOperationStatusMessage: true
      }
    case 'CREATE_FLIGHT_ERROR' :
      return {
        ...state,
        isSuccessfullOperation : false,
        showOperationStatusMessage :true,
      }
    case 'ALL_FLIGHTS' :
    return {
      ...state,
      flights : action.flights
    }
    case 'ALL_FLIGHTS_ERROR' :
    return {
      ...state
    }
    case 'GET_IMAGE' :
    return {
      ...state,
      image : action.image
    }
    case 'GET_IMAGE_ERROR' :
    return {
      ...state
    }
    default : return state;
  }
}

export default flightReducer
