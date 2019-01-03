const initState = {

}

const clientTokenReducer = (state = initState, action) => {

  switch (action.type) {

    case 'CLIENT_TOKEN' :
    return {
      ...state,
      clientToken : action.clientToken
    }

    default: return state;

  }
}

export default clientTokenReducer;
