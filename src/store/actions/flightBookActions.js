import { bookFlightRequest, addPassengersToBookedFlight } from '../../util/API_REST';


export const bookFlight = (booktTransport, passengers) =>{
  return (dispatch, getState) =>{

     bookFlightRequest(booktTransport.flightId)
       .then(response => {
             console.log("BookTransportResponse:" + response);
             addPassengersToBookedFlight(response.id, booktTransport.travelClassId, passengers )
             .then(response =>{
               console.log("BookTransportAddPassengersResponse:" + response);
               dispatch({type: 'SUCCESSFULL_BOOKING', flightBook : response});
             }).catch(error =>{
               if(error.status === 500) {
                 dispatch({type: 'UNSUCCESSFULL_BOOKING', error : error });
               }
             })
           }).catch(error => {
               if(error.status === 500) {
                 dispatch({type: 'UNSUCCESSFULL_BOOKING', error : error });
               }
             });
  }
}

export const showErroMessage = () =>{
  return (dispatch, getState) =>{
    dispatch({type: 'EROR_MESSAGE_SHOW'});
  }
}
