
export const resetApp = () =>{
  return (dispatch, getState) =>{
    dispatch({type: 'RESET_APP'})
  }
}

export const resetAppWithoutUser = () =>{
  return (dispatch, getState) =>{
    dispatch({type: 'RESET_APP_WITHOUT_USER'})
  }
}
