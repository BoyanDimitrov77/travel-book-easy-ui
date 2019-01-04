import { login, resetUserPassword, resetAndChangeUserPassword } from '../../util/API_REST';

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

export const resetPassword = (requestObject) =>{
  return (dispatch, getState) =>{
      resetUserPassword(requestObject)
      .then((response) =>{
          dispatch({type: 'RESET_PASSWORD_SUCCESS'})
      }).catch((err)=>{
        dispatch({type : 'RESET_PASSWORD_ERROR'})
      });

  }
}

export const resetAndChangePassword = (requestObject, verificationToken) =>{
  return (dispatch, getState) =>{
      resetAndChangeUserPassword(requestObject, verificationToken)
      .then((response) =>{
          dispatch({type: 'CHANGE_PASSWORD_SUCCESS'})
      }).catch((err)=>{
        dispatch({type : 'CHANGE_PASSWORD_ERROR'})
      });

  }
}
