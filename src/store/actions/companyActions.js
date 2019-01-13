import { allCompany, createCompanyRequest, uploadCompanyLogo, findCompany, ratingCompany, createCompanyComment } from '../../util/API_REST';

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
              dispatch({type: 'CREATE_COMPANY', company : response })

              const formData = new FormData();
               formData.append('file',imageFile);

               uploadCompanyLogo(formData,response.id )
               .then(response=>{
                 dispatch({type: 'CREATE_COMPANY', company : response })
               }).catch(error=>{
                   dispatch({type: 'CREATE_COMPANY_ERROR', error : error })
               });
           }).catch(error => {
                 dispatch({type: 'CREATE_COMPANY_ERROR', error : error })
           });
         }
}

export const getCompany = (companyId) => {
  return (dispatch, getState) => {
    findCompany(companyId)
    .then(response =>{
      dispatch({type: 'GET_COMPANY', company : response });
    }).catch(error=>{
      if(error.status === 500) {
        dispatch({type: 'GET_COMPANY_ERROR', error : error })
      }
    })
  }
}

export const userRatingCompany = (companyId, rating) => {
  return (dispatch, getState) => {
    ratingCompany(companyId, rating)
    .then(response =>{
      console.log(response);
      dispatch({type: 'RAITING_COMPANY',company : response });
    }).catch(error=>{
      if(error.status === 500) {
        dispatch({type: 'RAITING_COMPANY_ERROR', error : error });
      }
    })
  }
}

export const userCommentCompany = (companyId, comment) => {
  return (dispatch, getState) => {
    createCompanyComment(companyId, comment)
    .then(response =>{
      console.log(response);
      dispatch({type: 'COMMENT_COMPANY',company : response });
    }).catch(error=>{
      if(error.status === 500) {
        dispatch({type: 'COMMENT_COMPANY_ERROR', error : error });
      }
    })
  }
}
