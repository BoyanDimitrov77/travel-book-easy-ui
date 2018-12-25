const initState = {
  train : {}
}

const trainReducer = (state = initState, action) =>{
  switch (action.type) {
    case 'CREATE_TRAIN':
      return {
        ...state,
        train : action.train,
        isSuccessfullOperation : true,
        showOperationStatusMessage: true
      }
    case 'CREATE_TRAIN_ERROR' :
      return {
        ...state,
        isSuccessfullOperation : false,
        showOperationStatusMessage :true,
      }

    default: return state;

  }
}

export default trainReducer
