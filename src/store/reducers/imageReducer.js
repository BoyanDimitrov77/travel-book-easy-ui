const initState = {
  imageFile : {},
  imagePreviewUrl :""
}

const imageReducer = (state = initState, action) =>{
  switch (action.type) {
    case 'SELECT_IMAGE':
      //console.log(action.image, action.imagePreviewUrl);
      return {
        ...state,
        imageFile : action.image,
        imagePreviewUrl : action.imagePreviewUrl
      }
    default: return state;
  }

}

export default imageReducer;
