import { createTrainRequest } from '../../util/API_REST';

export const createTrain = (train) =>{
  return (dispatch, getState) =>{

    createTrainRequest(train)
    .then(response => {
             dispatch({type : 'CREATE_TRAIN', train: response })
        }).catch(error => {
            if(error.status === 500) {
              dispatch({type : 'CREATE_TRAIN_ERROR', error: error })
            }
        });
  }
}
