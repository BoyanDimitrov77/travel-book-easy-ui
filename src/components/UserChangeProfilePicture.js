import React, { Component } from 'react';
import ImageComponent from './ImageComponent'
import ImageUploadComponent from '../common/ImageUploadComponent'
import { changeUserProfilePicture } from '../store/actions/userProfileActions';
import { Button, Alert } from 'reactstrap';
import { connect } from 'react-redux'

class UserChangeProfilePicture extends Component{

saveProfilePicuture = ()=>{
  console.log( "Image:" + this.props.imageFile);
  if(this.props.imageFile){
      this.props.changeUserProfilePicture(this.props.imageFile);
  }
}

render(){
  return(
    <div>
      {
        this.props.isSuccessfullChangeUserPictureOperation ? (
            this.props.showErroMessageChangeUserPicture ? null : (<Alert className="statusMessage" color="success"> Successfull change password!</Alert>)
        ) :(
            this.props.showErroMessageChangeUserPicture ? (<Alert className="statusMessage" color="danger"> Please try again!</Alert>) : null
        )
      }
      <ImageUploadComponent/>
      <Button onClick={this.saveProfilePicuture}>Save</Button>
    </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    imageFile : state.image.imageFile,
    isSuccessfullChangeUserPictureOperation: state.userProfile.isSuccessfullChangeUserPictureOperation,
    showErroMessageChangeUserPicture: state.userProfile.showErroMessageChangeUserPicture
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    changeUserProfilePicture : (imageFile) =>dispatch(changeUserProfilePicture(imageFile))
  }
}
export default connect(mapStateToProps, mapDispactchToProps) (UserChangeProfilePicture);
