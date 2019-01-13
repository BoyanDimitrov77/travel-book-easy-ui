import { updateFlight, getAllUsers, enableUser } from '../../util/API_REST';

export const updateFlightInfo = (requestObject) => {
  return (dispatch, getState) => {

    updateFlight(requestObject)
      .then(response => {
          dispatch({type: 'UPDATE_FLIGHT'});
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'UPDATE_FLIGHT_ERROR', error : error });
              }
            });


  }
}

export const allUsers = () => {
  return (dispatch, getState) => {

    getAllUsers()
      .then(response => {
          dispatch({type: 'ALL_USERS', allUsers : response });
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'ALL_USERS_ERROR', error : error });
              }
            });


  }
}

export const enableUserAccount = (enabled, userId) => {
  return (dispatch, getState) => {

    enableUser(enabled,userId)
      .then(response => {
          dispatch({type: 'ENABLE_USER_ACCOUNT_SUCCESS', user : response });
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'ENABLE_USER_ACCOUNT_ERROR', error : error });
              }
            });


  }
}
