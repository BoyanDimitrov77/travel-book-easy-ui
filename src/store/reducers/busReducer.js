const initState = {
  bus:{}
}

const busReducer = (state = initState, action) =>{

  switch (action.type) {
    case 'CREATE_BUS':
      return {
        ...state,
        bus: action.bus,
        isSuccessfullOperation : true,
        showOperationStatusMessage: true
      }
    case 'CREATE_BUS_ERROR' :
      return {
        ...state,
        isSuccessfullOperation : false,
        showOperationStatusMessage :true,
      }
    default: return state;

  }
}

export default busReducer;
