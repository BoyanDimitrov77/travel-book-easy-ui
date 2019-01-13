const initState = {
  editFlight:{
    isSuccessfullOperation : false,
    showOperationStatusMessage : false
  },
  editCompany:{
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

    case 'ENABLE_USER_ACCOUNT_SUCCESS' :
    let updatedUsers = state.users;
    let index = updatedUsers.findIndex(user => user.id == action.user.id);
    updatedUsers.splice(index, 1, action.user);

    return {
      ...state,
      users : updatedUsers
    }

    case 'ENABLE_USER_ACCOUNT_ERROR' :
    return {
      ...state
    }

    case 'UPDATE_COMPANY' :
    return {
      ...state,
      editCompany:{
        isSuccessfullOperation : true,
        showOperationStatusMessage : true
      }
    }

    case 'UPDATE_COMPANY_ERROR' :
    return {
      ...state,
      editCompany:{
        isSuccessfullOperation : false,
        showOperationStatusMessage : true
      }
    }

    default : return state;
  }
}

export default adminReducer
