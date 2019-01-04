const initState = {
  isSuccessfullRegistration : false,
  showErroMessage : false

}
const registrationReducer = (state = initState, action) => {

  switch (action.type) {
    case 'REGISTER_USER':
    return {
      isSuccessfullRegistration : true,
      showErroMessage : false
    }

    case 'REGISTER_USER_ERROR':
    return {
      isSuccessfullRegistration : false,
      showErroMessage : true
    }

    default: return state;

  }

}
export default registrationReducer;
