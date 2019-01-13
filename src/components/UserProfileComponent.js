import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { Container } from 'reactstrap';
import UserUpdateInfo from './UserUpdateInfo'
import UserChangePassword from './UserChangePassword'
import UserChangeProfilePicture from './UserChangeProfilePicture'
import './UserProfileComponent.css'

class UserProfileComponent extends Component{

  render(){
    return(
      <div>
        <AppNavBar/>
        <Container className= "ContainerForm profile-picture-container">
        <h2> Change profile picture </h2>
        <UserChangeProfilePicture/>
        </Container>
        <Container className= "ContainerForm">
        <h2> Personal information </h2>
        <UserUpdateInfo/>
        </Container>

        <Container className= "ContainerForm">
        <h2> Change password </h2>
        <UserChangePassword/>
        </Container>

      </div>
    )
  }

}

export default UserProfileComponent;
