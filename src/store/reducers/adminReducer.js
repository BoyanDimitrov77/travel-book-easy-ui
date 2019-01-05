const initState = {
  editFlight:{
    isSuccessfullOperation : false,
    showOperationStatusMessage : false
  },
  users : null,
}

const adminReducer = (state = initState, action) => {

  switch (action.type) {
    case 'ALL_USERS' :
    return {
      ...state,
      users : action.allUsers
    }
    case 'ALL_USERS_ERROR' :
    return {
      ...state
    }

    case 'UPDATE_FLIGHT' :
    return {
      ...state,
      editFlight:{
        isSuccessfullOperation : true,
        showOperationStatusMessage : true
      }
    }
      case 'UPDATE_FLIGHT_ERROR' :
      return {
        ...state,
        editFlight:{
          isSuccessfullOperation : false,
          showOperationStatusMessage : true
        }
    }

    default : return state;

  }
}

export default adminReducer
