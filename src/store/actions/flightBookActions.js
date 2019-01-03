import { bookFlightRequest, addPassengersToBookedFlight} from '../../util/API_REST';


export const bookFlight = (booktTransport, passengers) =>{
  return (dispatch, getState) =>{
    bookFlightRequest(booktTransport.flightId)
      .then(response => {
            console.log("BookTransportResponse:" + response);
            addPassengersToBookedFlight(response.id, booktTransport.travelClassId, passengers )
            .then(response =>{
              console.log("BookTransportAddPassengersResponse:" + response);
            }).catch(error =>{
              if(error.status === 500) {
                //dispatch({type: 'CREATE_FLIGHT_ERROR', error : error });
              }
            })
          }).catch(error => {
              if(error.status === 500) {
                //dispatch({type: 'CREATE_FLIGHT_ERROR', error : error });
              }
            });
  }
}
