import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Col, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { changePassword } from '../store/actions/userProfileActions';

class UserChangePassword extends Component {

  constructor(props){
    super(props);
    this.state = {
      'oldPassword': '',
      'newPassword':'',
    }
  }

  handleChange = async (event) => {
     const { target } = event;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const { name } = target;
     await this.setState({
       [ name ]: value,
     });
  }

  handleValidSubmit(e) {
    e.persist();
    const requestObject = Object.assign({}, this.state);
    console.log(requestObject);
    this.props.changePassword(requestObject, this.props.email);
  }


  render(){

    return(

      <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } >
        <Col>
          {
            this.props.isSuccessfullChangePassowordOperation ? (
                this.props.showErroMessageChangePassword ? null : (<Alert className="statusMessage" color="success"> Successfull change password!</Alert>)
            ) :(
                this.props.showErroMessageChangePassword ? (<Alert className="statusMessage" color="danger"> Please try again!</Alert>) : null
            )
          }
        </Col>

        <Col>

          <AvField  className= "oldPassword" name="oldPassword" id="oldPassword" value="" label= " Old password" type="password" errorMessage="Invalid  old password. A minimum 8 characters password contains a combination of uppercase and lowercase letter,number and special symbol are required." required
          validate={{
              required: {value: true},
              pattern: {value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})'}
            }}
            onChange={ (e) => {
                  this.handleChange(e)
                } }/>
        </Col>

        <Col>
          <AvField  className= "newPassword" name="newPassword" id="newPassword" value="" label= "New password" type="password" errorMessage="Invalid  new password. A minimum 8 characters password contains a combination of uppercase and lowercase letter,number and special symbol are required." required
          validate={{
            required: {value: true},
            pattern: {value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})'}
            }}
            onChange={ (e) => {
                  this.handleChange(e)
                } }/>
        </Col>

        <Col>
          <Button>Change Password</Button>
        </Col>

      </AvForm>

    )
  }

}

const mapStateToProps = (state) =>{
  return {
    isSuccessfullChangePassowordOperation: state.userProfile.isSuccessfullChangePassowordOperation,
    showErroMessageChangePassword: state.userProfile.showErroMessageChangePassword,
    email : state.auth.user.email
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    changePassword : (requestObject, email) => dispatch(changePassword(requestObject, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (UserChangePassword);
