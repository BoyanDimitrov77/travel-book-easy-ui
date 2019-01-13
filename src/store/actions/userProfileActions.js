import { USERNAME, PASSWORD } from '../../constants/constants';
import { changeUserPassword, changeUserInfo, uploadProfilePicture } from '../../util/API_REST';

export const changePassword = (requestObject, email) =>{
  return (dispatch, getState) =>{
      changeUserPassword(requestObject)
      .then((response) =>{
          localStorage.setItem(USERNAME, email);
          localStorage.setItem(PASSWORD, requestObject.newPassword);
          dispatch({type: 'CHANGE_PASSWORD_FROM_PROFILE_SUCCESS'})
      }).catch((err)=>{
        dispatch({type : 'CHANGE_PASSWORD_FROM_PROFILE_ERROR'})
      });
  }
}

export const updateUserInfo = (requestObject) =>{
  return (dispatch, getState) =>{
      changeUserInfo(requestObject)
      .then((response) =>{
          localStorage.setItem(USERNAME, requestObject.email);
          dispatch({type: 'UPDATE_USER_INFO_SUCCESS', user: response})
          dispatch({type: 'UPDATE_USER', user: response})
      }).catch((err)=>{
        dispatch({type : 'UPDATE_USER_INFO_ERROR'})
      });
  }
}

export const changeUserProfilePicture = (imageFile) =>{
  return (dispatch, getState) =>{

      const formData = new FormData();
      formData.append('file',imageFile);

      uploadProfilePicture(formData)
      .then((response) =>{
        dispatch({type: 'UPDATE_USER_PROFILE_SUCCESS'})
        dispatch({type : 'UPDATE_USER', user: response })
      }).catch((err)=>{
        dispatch({type : 'UPDATE_USER_PROFILE_ERROR'})
      });
  }
}
