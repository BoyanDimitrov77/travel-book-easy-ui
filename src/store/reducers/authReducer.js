
const initState = {
  authError : null,
  isAdmin : false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    console.log("success login", action.user);
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
    default: return state;

  }
}

export default authReducer
