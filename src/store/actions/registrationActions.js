import { registrationUser } from '../../util/API_REST';

export const registration = (registrationRequest) => {
  return (dispatch, getState) => {

    registrationUser(registrationRequest)
      .then(response => {
          dispatch({type: 'REGISTER_USER'});
          }).catch(error => {
              if(error.status === 500) {
                dispatch({type: 'REGISTER_USER_ERROR'});
              }
            });


  }
}
