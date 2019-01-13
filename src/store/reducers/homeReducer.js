const initState = {
  userFlightBookings : {},
  companies : {}
}

const homeReducer = (state = initState, action) => {

  switch (action.type) {
    case 'GET_ALL_FLIGHT_BOOKINGS':
    return {
      ...state,
      userFlightBookings : action.userFlightBookings
    }

    case 'GET_ALL_FLIGHT_BOOKINGS_ERROR' :
    return {
      ...state
    }

    case 'GET_ALL_COMPANY_ORDER_BY_RATING' :
    return {
      ...state,
      companies : action.companies
    }
    case 'GET_ALL_COMPANY_ORDER_BY_RATING_ERROR' :
    return {
      ...state
    }

    default: return state;

  }
}

export default homeReducer
