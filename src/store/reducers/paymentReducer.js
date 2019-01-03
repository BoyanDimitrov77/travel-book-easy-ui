const initState = {
  flightBook : {}
}

const paymentReducer = (state = initState, action) => {

  switch (action.type) {
    case 'PAYMENT_FLIGHT':
    return {
      ...state,
      flightBook : action.flightBook,
      isSuccessfullPayment : true
    }

    default: return state;

  }

}

export default paymentReducer
