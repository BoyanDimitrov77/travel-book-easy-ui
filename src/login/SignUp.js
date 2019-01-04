import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Container, Col, Button, Alert } from 'reactstrap';
import { registration } from '../store/actions/registrationActions';
import { connect } from 'react-redux';

class SignUp extends Component{

  constructor(props){
    super(props);
    this.state = {
      'password': '',
      'repetedPassword':'',
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

  checkIfPasswordsIsTheSame = () =>{
    const { password, repetedPassword } = this.state;

     if(password.localeCompare(repetedPassword) == 0){
       return true;
     }else{
       return false;
     }
  }

  handleValidSubmit(e) {
    e.persist();
    console.log(this.state);

    const requestObject = Object.assign({}, this.state);
    let registrationRequest = {};
    registrationRequest["email"] = requestObject.email.trim();
    registrationRequest["fullName"] = requestObject.name.trim();
    registrationRequest["userName"] = requestObject.userName.trim();
    registrationRequest["password"] = requestObject.password;

    this.props.registration(registrationRequest);

  }

  render(){
    return(
      <div>
        <AppNavBar/>

        <Container className= "ContainerForm">

          <h2> Registration </h2>

          <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } >
            <Col>
              {
                this.props.isSuccessfullRegistration ? (
                    this.props.showErroMessage ? null : ( <Alert className="statusMessage" color="success"> Please check your email for account validation!</Alert> )
                ) :(
                    this.props.showErroMessage ? (<Alert className="statusMessage" color="danger"> Please try again!</Alert>) : null
                )
              }
            </Col>

            <Col>

              <AvField  className= "email" name="email" id="email" value="" label= "Email" type="email" errorMessage="Invalid email" required
                onChange={ (e) => {
                      this.handleChange(e)
                    } }/>
            </Col>

            <Col>

              <AvField name="name" label="Full Name" type="text" errorMessage="Invalid full name" validate={{
                  required: {value: true},
                  pattern: {value: '^[A-Z a-z-]+$'}
                }}
                onChange={ (e) => {
                          this.handleChange(e)
                          } } />
            </Col>

            <Col>

              <AvField name="userName" label="Username " type="text" errorMessage="Invalid userName" validate={{
                  required: {value: true},
                  pattern: {value: '^[A-Za-z-0-9_]+$'}
                }}
                onChange={ (e) => {
                          this.handleChange(e)
                          } } />
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
              <Button>Register</Button>
            </Col>

          </AvForm>
        </Container>

      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    isSuccessfullRegistration: state.registration.isSuccessfullRegistration,
    showErroMessage: state.registration.showErroMessage
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    registration : (registrationRequest) => dispatch(registration(registrationRequest))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignUp);
