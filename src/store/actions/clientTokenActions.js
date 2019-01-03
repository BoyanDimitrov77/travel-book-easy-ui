import {  getClientToken} from '../../util/API_REST';

export const clientToken = () =>{
  return (dispatch, getState) =>{
    getClientToken()
    .then(response =>{
      dispatch({type: 'CLIENT_TOKEN', clientToken : response.data});
    }).catch(error=>{
      dispatch({type: 'ERROR_CLIENT_TOKEN', error : error});
    })
  }
}
