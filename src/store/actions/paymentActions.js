import { paymentFlight } from '../../util/API_REST';

export const payFlightBooking = (amount, flightBookId, travelClassId, nonceFromTheClient) => {
  return (dispatch, getState) => {

    paymentFlight(amount, flightBookId, travelClassId, nonceFromTheClient)
      .then(response => {
          dispatch({type: 'PAYMENT_FLIGHT', flightBook : response });
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'PAYMENT_FLIGHT_ERROR', error : error });
              }
            });


  }
}
