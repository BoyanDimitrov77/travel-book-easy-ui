import { updateFlight, getAllUsers, enableUser, updateCompanyName, uploadCompanyLogo } from '../../util/API_REST';

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

export const updateCompanyNameAdminWithoutLogo = (companyId, name) => {
  return (dispatch, getState) => {

    updateCompanyName(companyId,name)
      .then(response => {
          dispatch({type: 'UPDATE_COMPANY'});
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'UPDATE_COMPANY_ERROR', error : error });
              }
            });


  }
}

export const updateCompanyNameAdminWithLogo = (companyId, name, imageFile) => {
  return (dispatch, getState) => {

    updateCompanyName(companyId,name)
      .then(response => {
          dispatch({type: 'UPDATE_COMPANY'});

             const formData = new FormData();
             formData.append('file',imageFile);

              uploadCompanyLogo(formData, response.id)
              .then(response =>{
                dispatch({type: 'UPDATE_COMPANY'});
              }).catch(error=>{
                dispatch({type: 'UPDATE_COMPANY_ERROR', error : error });
              })

          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'UPDATE_COMPANY_ERROR', error : error });
              }
            });
  }
}
