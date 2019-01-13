import React, { Component } from 'react';
import './ImageUploadComponent.css';
import noImagePlaceholder from '../images/no-image-icon.png';
import { connect } from 'react-redux';
import { selectImage } from '../store/actions/imageActions';
import ProgressiveImage from 'react-progressive-image'

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

      $imagePreview = (<ProgressiveImage src={imagePreviewUrl} placeholder={noImagePlaceholder}>
            {(src, loading) => (
              <img  className="img-circular" style={{ opacity: loading ? 0.5 : 1 }} src={src} alt="" />
            )}
          </ProgressiveImage>);

    return (
      <div className="profile-change-picture-wrapper">
        {$imagePreview}
          <input id="fileIput" className="imageClass" type="file" label="Upload Company Logo" onChange={ (e) => {
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
