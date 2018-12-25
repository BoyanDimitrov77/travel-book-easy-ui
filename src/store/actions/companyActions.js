import { allCompany, createCompanyRequest, uploadCompanyLogo } from '../../util/API_REST';

export const getAllCompany = (companies) => {
  return (dispatch, getState) => {
    allCompany()
    .then(response =>{
      dispatch({type: 'GET_ALL_COMPANIES', companies : response });
    });
  }
}

export const createCompany = (company, imageFile) =>{
  return (dispatch, getState) =>{

    createCompanyRequest(company)
       .then(response => {
              const formData = new FormData();
               formData.append('file',imageFile);

               uploadCompanyLogo(formData,response.id )
               .then(response=>{
                 dispatch({type: 'CREATE_COMPANY', company : response })
               }).catch(error=>{
                 if(error.status === 500) {
                   dispatch({type: 'CREATE_COMPANY_ERROR', error : error })
                 }
               });
           }).catch(error => {
               if(error.status === 500) {
                 dispatch({type: 'CREATE_COMPANY_ERROR', error : error })
               }
           });
         }
}
