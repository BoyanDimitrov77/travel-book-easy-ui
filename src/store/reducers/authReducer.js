const initState = {
  authError : null,
  isAdmin : false,
  isSuccessfullResetPassowordOperation : false,
  showErroMessage : false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError : null,
        user : action.user,
        isAdmin : action.user.userRole.some(function(role){
          return role.localeCompare("ROLE_ADMIN") === 0;
        })
      }
    case 'LOGIN_ERROR' :
      console.log("error", action.err);
    return {
      ...state,
      authError : 'Login failed'
    }

    case 'RESET_PASSWORD_SUCCESS' :
    return{
      isSuccessfullResetPassowordOperation : true,
      showErroMessage : false
    }

    case 'RESET_PASSWORD_ERROR' :
    return{
      isSuccessfullResetPassowordOperation : false,
      showErroMessage : true
    }

    case 'CHANGE_PASSWORD_SUCCESS' :
    return {
      isSuccessfullResetPassowordOperation : true,
      showErroMessage : false
    }

    case 'CHANGE_PASSWORD_ERROR' :
    return {
      isSuccessfullResetPassowordOperation : false,
      showErroMessage : true
    }
    default: return state;

  }
}

export default authReducer
