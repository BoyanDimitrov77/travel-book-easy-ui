const initState = {
  companies:[],
  createdCompany : {}
}

const companyReducer = (state = initState, action) => {

  switch (action.type) {
    case 'GET_ALL_COMPANIES':
      return {
        ...state,
        companies : action.companies
      }
    case 'CREATE_COMPANY' : {
      return {
        ...state,
        createdCompany : action.company,
        isSuccessfullOperation : true,
        showOperationStatusMessage: true
      }
    }
    case 'CREATE_COMPANY_ERROR' :
    return {
      ...state,
      isSuccessfullOperation : false,
      showOperationStatusMessage :true,

    }
      default :
        return state;
  }

}

export default companyReducer
