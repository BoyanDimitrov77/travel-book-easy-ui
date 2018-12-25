const initState = {
  flight:{}
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
    default : return state;
  }
}

export default flightReducer
