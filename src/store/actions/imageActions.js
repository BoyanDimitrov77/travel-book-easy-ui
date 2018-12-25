export const selectImage = (image, imagePreviewUrl) =>{
  return (dispatch, getState)=>{
    dispatch({type: "SELECT_IMAGE", image : image, imagePreviewUrl : imagePreviewUrl });
  }
}
