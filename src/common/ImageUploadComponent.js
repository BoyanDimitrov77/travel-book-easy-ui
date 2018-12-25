import React, { Component } from 'react';
import './ImageUploadComponent.css';
import { connect } from 'react-redux';
import { selectImage } from '../store/actions/imageActions';
class ImageUploadComponent extends Component{

  handleChange = async (event) => {
     const { target } = event;
     if (["imageClass"].includes(target.className)) {

       let reader = new FileReader();
       let file = target.files[0];

       reader.onloadend = () =>{
         this.props.selectImage(file, reader.result);
       }

       reader.readAsDataURL(file);
     }
  }
  render(){
    const imagePreviewUrlState = this.props.imagePreviewUrl;
    let imagePreviewUrl = imagePreviewUrlState;
    let $imagePreview = null;

    if(imagePreviewUrl){
      $imagePreview = (<img src={imagePreviewUrl} alt='selected file'/>);
    }

    return (
      <div>
        {$imagePreview}
          <input className="imageClass" type="file" label="Upload Company Logo" onChange={ (e) => {
                      this.handleChange(e)
                    } } />
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    imageFile : state.image.imageFile,
    imagePreviewUrl : state.image.imagePreviewUrl
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    selectImage : (image, imagePreviewUrl) => dispatch(selectImage(image, imagePreviewUrl))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (ImageUploadComponent);
