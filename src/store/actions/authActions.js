import { login } from '../../util/API_REST';

export const signIn = (credentials) =>{
  return (dispatch, getState) =>{
      login(credentials)
      .then((response) =>{
          dispatch({type: 'LOGIN_SUCCESS', user: response})
      }).catch((err)=>{
        dispatch({type : 'LOGIN_ERROR', err : err})
      });

  }
}
