const initState = {
  showErroMessage : false
}

const flightReducer = (state = initState, action) => {

  switch (action.type) {
    case 'SUCCESSFULL_BOOKING':
    return{
      ...state,
      isSuccessfullBooking: true
    }

    case 'UNSUCCESSFULL_BOOKING' :
    return {
      ...state,
      isSuccessfullBooking: false
    }

    case 'CLIENT_TOKEN' :
    return {
      ...state,
      clientToken : action.clientToken
    }

    case 'EROR_MESSAGE_SHOW' :
    return {
      ...state,
      showErroMessage : true
    }


    default: return state;

  }
}

export default flightReducer;
