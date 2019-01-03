const initState = {
  flight:{},
  flights : {},
  bookTransport:{
    flightId: null,
    travelClassId: '',
    price : null,

  },
  passengers :[{'passengerName':'', 'email': '', 'phoneNumber': ''}]
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
    case 'RESET_PASSENGERS' :
    return{
      ...state,
      passengers : []
    }
    case 'ADD_NEW_PASSENGER' :
    return{
      ...state,
      passengers :[...state.passengers, action.passenger]
    }

    case 'BOOK_TRANSPORT_PARAMETER' :
    return {
      ...state,
      bookTransport : {
        flightId: action.flightId,
        travelClassId: action.travelClassId,
        price : action.price ? action.price : calculatePrice(state.flights, action.flightId, action.travelClassId, state.passengers.length)
      }
    }

    case  'UPDATE_PASSENGER_FIELDS' :
        let updatedPassengers = state.passengers;
        updatedPassengers[action.passengerId][action.fieldName] = action.fieldValue;
      return {
        ...state,
        passengers : updatedPassengers
      }

    default : return state;
  }

}

const calculatePrice = (flights, flightId, travelClassId, numberOfTicket) =>{
  var flight  = flights.find(function(element){
    return element.id == flightId;
  });
  var travelClass = flight.travelClasses.find(function(element){
    return element.id == travelClassId;
  })

  return travelClass.price * numberOfTicket;
}

export default flightReducer
