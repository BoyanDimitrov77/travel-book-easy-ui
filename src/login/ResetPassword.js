import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Container, Col, Button, Alert } from 'reactstrap';
import { resetAndChangePassword } from '../store/actions/authActions';
import { resetApp } from '../store/actions/rootActions';
import { connect } from 'react-redux';

class ResetPassword extends Component {

  constructor(props){
    super(props);
    this.state = {
      'password': '',
      'repetedPassword':'',
    }
  }

  componentDidMount(){
      this.props.resetApp();
  }

  checkIfPasswordsIsTheSame = () =>{
    const { password, repetedPassword } = this.state;

     if(password.localeCompare(repetedPassword) == 0){
       return true;
     }else{
       return false;
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

      let requesObjectForPasswordReset = {};
      requesObjectForPasswordReset["password"] = this.state.password;
      this.props.resetAndChangePassword(requesObjectForPasswordReset,this.props.verificationToken);
  }

  render(){
    console.log(this.props.isSuccessfullResetPassowordOperation);
    console.log(this.props.showErroMessage);
    return(
      <div>
        <AppNavBar/>

        <Container className= "ContainerForm">

          <h2> Change password </h2>

          <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } >
            <Col>
              {
                this.props.isSuccessfullResetPassowordOperation ? (
                    this.props.showErroMessage ? null : ( <Alert className="statusMessage" color="success"> Successfull change password!</Alert> )
                ) :(
                    this.props.showErroMessage ? (<Alert className="statusMessage" color="danger"> Token is expired or used!</Alert>) : null
                )
              }
            </Col>

            <Col>

              <AvField  className= "password" name="password" id="password" value="" label= "Password" type="password" errorMessage="Invalid passoword. A minimum 8 characters password contains a combination of uppercase and lowercase letter,number and special symbol are required." required
              validate={{
                  required: {value: true},
                  pattern: {value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})'}
                }}
                onChange={ (e) => {
                      this.handleChange(e)
                    } }/>
            </Col>

            <Col>
              <AvField  className= "repeted-password" name="repetedPassword" id="repeted-password" value="" label= "Repeat Password" type="password" errorMessage="Password no match" required
              validate={{
                  required: {value: true},
                  isTheSamePassword : this.checkIfPasswordsIsTheSame
                }}
                onChange={ (e) => {
                      this.handleChange(e)
                    } }/>
            </Col>

            <Col>
              <Button>Change Password</Button>
            </Col>

          </AvForm>
        </Container>

      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) =>{

  const verificationToken = ownProps.match.params.verificationToken;
  return {
    isSuccessfullResetPassowordOperation: state.auth.isSuccessfullResetPassowordOperation,
    showErroMessage: state.auth.showErroMessage,
    verificationToken : verificationToken
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    resetAndChangePassword : (requestObject, verificationToken) => dispatch(resetAndChangePassword(requestObject, verificationToken)),
    resetApp : () => dispatch(resetApp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ResetPassword);
