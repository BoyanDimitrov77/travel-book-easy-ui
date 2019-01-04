const initState = {
  isSuccessfullChangePassowordOperation : false,
  showErroMessageChangePassword : false,
  isSuccessfullUpdateUserInfoOperation : false,
  showErroMessageUserInfo :  false
}

const userProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_FROM_PROFILE_SUCCESS' :
    return {
      ...state,
      isSuccessfullChangePassowordOperation : true,
      showErroMessageChangePassword : false
    }

    case 'CHANGE_PASSWORD_FROM_PROFILE_ERROR' :
    return {
      ...state,
      isSuccessfullChangePassowordOperation : false,
      showErroMessageChangePassword : true
    }

    case 'UPDATE_USER_INFO_SUCCESS' :
    return{
      isSuccessfullUpdateUserInfoOperation : true,
      showErroMessageUserInfo :  false
    }

    case 'UPDATE_USER_INFO_ERROR' :
    return{
      ...state,
      isSuccessfullUpdateUserInfoOperation : false,
      showErroMessageUserInfo :  true
    }


    default: return state;

  }
}

export default userProfileReducer
