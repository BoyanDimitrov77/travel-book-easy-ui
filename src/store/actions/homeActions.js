import { getAllFlightBookings, getAllCompaniesOrderByRating } from '../../util/API_REST';

export const getAllUsersFlightBooking = () => {
  return (dispatch, getState) => {

     getAllFlightBookings()
       .then(response => {
           dispatch({type: 'GET_ALL_FLIGHT_BOOKINGS', userFlightBookings : response});
           }).catch(error => {
               if(error.status === 500) {
                 dispatch({type: 'GET_ALL_FLIGHT_BOOKINGS_ERROR', error : error });
               }
             });


  }
}

export const getAllCompanies = () => {
  return (dispatch, getState) => {

     getAllCompaniesOrderByRating()
       .then(response => {
           dispatch({type: 'GET_ALL_COMPANY_ORDER_BY_RATING', companies : response});
           }).catch(error => {
               if(error.status === 500) {
                 dispatch({type: 'GET_ALL_COMPANY_ORDER_BY_RATING_ERROR', error : error });
               }
             });


  }
}
