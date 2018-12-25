export const removeTraveClass = (travelClassId) => {
  return (dispatch, getState) => {
    dispatch({type: 'REMOVE_TRAVEL_CLASS', travelClassId : travelClassId });
  }
}

export const addTravelClass = (travelClass) => {
  return (dispatch, getState) => {
    dispatch({type: 'ADD_TRAVEL_CLASS', travelClass : travelClass });
  }
}

export const updateTravelClassField = (fieldName, fieldValue , travelClassId) => {
  return (dispatch, getState) => {
    dispatch({type: 'UPDATE_TRAVEL_CLASS_FIELDS', fieldName : fieldName, fieldValue: fieldValue, travelClassId : travelClassId  });
  }
}
