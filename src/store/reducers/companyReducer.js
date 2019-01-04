const initState = {
  companies:[],
  createdCompany : {},
  company : {
    showErrorMessage : false,
    errorMessage : ""
  }
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

    case 'GET_COMPANY' :
    return {
      ...state,
      company : action.company
    }

    case 'GET_COMPANY_ERROR' :
    return {
      ...state,
      company : {
        showErrorMessage : true,
        errorMessage : action.error.message
      }
    }

    case 'RAITING_COMPANY' :
    return {
      ...state,
      company : action.company
    }

    case 'RAITING_COMPANY_ERROR' :
    return {
       ...state,
       company :{
         ...state,
         showErrorMessage : true,
         errorMessage : action.error.message
       }
    }

    case 'COMMENT_COMPANY' :
    return {
      ...state,
      company : action.company
    }

    case 'COMMENT_COMPANY_ERROR' :
    return{
      ...state,
      company :{
        ...state,
        showErrorMessage : true,
        errorMessage : action.error.message
      }
    }

      default :
        return state;
  }

}

export default companyReducer
