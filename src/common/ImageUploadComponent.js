import React, { Component } from 'react';
import './ImageUploadComponent.css';
class ImageUploadComponent extends Component{
  render(){

    let {imagePreviewUrl} = this.props;
    let $imagePreview = null;

    if(imagePreviewUrl){
      $imagePreview = (<img src={imagePreviewUrl} alt='selected file'/>);
    }

    return (
      <div>
        {$imagePreview}
          <input className="imageClass" type="file" label="Upload Company Logo" onChange={ (e) => {
                      this.props.handleChange(e)
                    } } />
      </div>
    )
  }




}

export default ImageUploadComponent;
