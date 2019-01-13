import React, { Component } from 'react';
import noImagePlaceholder from '../images/no-image-icon.png';
import noImageUserPlaceholder from '../images/user.png';
import ProgressiveImage from 'react-progressive-image'
import { fetchImage, getGoogleClientToken } from '../util/API_REST';
import './ImageComponent.css'

class ImageComponent extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      imageLoad : null
    }
  }

   componentDidMount(){
     this._isMounted = true;
     if(this.props.imageUrl != null){
       getGoogleClientToken()
       .then(response=>{
         fetchImage('https://' + this.props.imageUrl, response.data)
         .then(respone=>{
           if(this._isMounted){
             this.setState({
              imageLoad : respone
             })
           }
         })
       })
     }
   }

   componentWillUnmount(){
      this._isMounted = false;
   }

render(){
  return(
      <div>
      <ProgressiveImage src={"data:image/jpeg;base64," + this.state.imageLoad } placeholder={this.props.isProfile ? noImageUserPlaceholder : noImagePlaceholder}>
          {(src, loading) => (
            <img  className={this.props.isProfile ? 'img-circular-profile' : 'img-circular'} style={{ opacity: loading ? 0.5 : 1 }} src={src} alt="" />
          )}
        </ProgressiveImage>
      </div>
  )
}

}
export default ImageComponent;
