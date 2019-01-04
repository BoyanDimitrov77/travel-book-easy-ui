import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Col, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { updateUserInfo } from '../store/actions/userProfileActions';
import { resetAppWithoutUser } from '../store/actions/rootActions';

class UserUpdateInfo extends Component{

  componentDidMount(){
      this.props.resetAppWithoutUser();
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
      console.log(this.state);
      const requestObject = Object.assign({}, this.state);
      this.props.updateUserInfo(requestObject);
    }

  render(){
    return(
        <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } >
        <Col>
          {
            this.props.isSuccessfullUpdateUserInfoOperation ? (
                this.props.showErroMessageUserInfo ? null : (<Alert className="statusMessage" color="success"> Successfull update personal info!</Alert>)
            ) :(
                this.props.showErroMessageUserInfo ? (<Alert className="statusMessage" color="danger"> Please try again!</Alert>) : null
            )
          }
        </Col>
        <Col>

          <AvField  className= "email" name="email" id="email"  placeholder={this.props.authUser.email} label= "Email" type="email" errorMessage="Invalid email" required
            onChange={ (e) => {
                  this.handleChange(e)
                } }/>
        </Col>

        <Col>

          <AvField name="fullName" label="Full Name" type="text" placeholder={this.props.authUser.fullName} errorMessage="Invalid full name" validate={{
              required: {value: true},
              pattern: {value: '^[A-Z a-z-]+$'}
            }}
            onChange={ (e) => {
                      this.handleChange(e)
                      } } />
        </Col>

        <Col>
          <Button>Save</Button>
        </Col>
        </AvForm>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    isSuccessfullUpdateUserInfoOperation: state.userProfile.isSuccessfullUpdateUserInfoOperation,
    showErroMessageUserInfo: state.userProfile.showErroMessageUserInfo,
    authUser : state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateUserInfo : (requestObject) => dispatch(updateUserInfo(requestObject)),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (UserUpdateInfo);
