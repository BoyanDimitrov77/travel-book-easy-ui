const initState = {
  travelClasses : [{'travelClass':'', 'maxSeats': '', 'price': ''}]
}

const traveClassReducer = (state = initState, action) => {

  switch (action.type) {
    case 'REMOVE_TRAVEL_CLASS':
      console.log(' remove travelClass', action.travelClassId);
      let newTravelClasses = state.travelClasses.filter((s, sidx) => action.travelClassId !== sidx);
      return{
        ...state,
        travelClasses : newTravelClasses
      }
    case 'ADD_TRAVEL_CLASS' :
      console.log(' add TravelClass', action.travelClass);
      return {
        ...state,
        travelClasses: [...state.travelClasses, action.travelClass]
      }
    case  'UPDATE_TRAVEL_CLASS_FIELDS' :
        console.log(action.fieldName, action.fieldValue, action.travelClassId);
        let updatedTravelClasses = state.travelClasses;
        updatedTravelClasses[action.travelClassId][action.fieldName] = action.fieldValue;
      return {
        ...state,
        travelClasses : updatedTravelClasses
      }

      case 'LOAD_TRAVEL_CLASSES_ADMIN' :
      return {
        ...state,
        travelClasses : action.travelClasses
      }

    default : return state;
  }
}

export default traveClassReducer
