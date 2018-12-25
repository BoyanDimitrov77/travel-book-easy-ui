import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col, Form,
FormGroup, Label, Input,
Button, FormText, FormFeedback, } from 'reactstrap';
import './Login.css';
import { login } from '../util/API_REST';

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      'email':'',
      'password':'',
      validate : {
        emailState: '',
        passwordState: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success';
      } else {
        validate.emailState = 'has-danger';
      }
      this.setState({ validate })
    }

    validatePassword(e){
      const passRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})/;
      const { validate } = this.state;
      if(passRex.test(e.target.value)){
        validate.passwordState = 'has-success';
      }else{
        validate.passwordState = 'has-danger';
      }
      this.setState({ validate })
    }

    handleChange = async (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      await this.setState({
        [ name ]: value,
      });
  }

  submitForm(e) {
    e.preventDefault();
    const {validate } = this.state;

    if(validate.emailState === 'has-success' || validate.passwordState === 'has-success'){
      const loginRequest = Object.assign({}, this.state);
      login(loginRequest)
      .then(response => {
          var isUser =  response.userRole.find(e => {
              if(e.localeCompare("ROLE_USER") === 0){
                return true;
              }
              return false;

          });

          var isAdmin =  response.userRole.find(e => {
              if(e.localeCompare("ROLE_ADMIN") === 0){
                return true;
              }
              return false;

          });

          if(isAdmin){
            this.props.onLogin(response);
            this.props.history.push("/admin");
          }else if(isUser){
            this.props.onLogin(response);
            this.props.history.push("/");
          }

          console.log("isUser:"+isUser);

      }).catch(error => {
          if(error.status === 401) {
            console.log("Your Username or Password is incorrect. Please try again!");
          } else {
              console.log("Sorry! Something went wrong. Please try again!");
          }
      });

    }
  }

  render() {
    const { email, password } = this.state;
      return (
        <div>
          <AppNavBar/>
          <Container className= "ContainerForm">

          <h2>Sign In</h2>
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                  <Col>
                    <FormGroup>
                      <Label>Username</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="myemail@email.com"
                        value={ email }
                        valid={ this.state.validate.emailState === 'has-success' }
                        invalid={ this.state.validate.emailState === 'has-danger' }
                        onChange={ (e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                  } }
                      />
                      <FormFeedback valid>
                        That's a tasty looking email you've got there.
                      </FormFeedback>
                      <FormFeedback>
                        Uh oh! Looks like there is an issue with your email. Please input a correct email.
                      </FormFeedback>
                      <FormText>Your username is most likely your email.</FormText>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        value={ password }
                        valid={ this.state.validate.passwordState === 'has-success' }
                        invalid={ this.state.validate.passwordState === 'has-danger' }
                        onChange={ (e) => {
                          this.validatePassword(e)
                          this.handleChange(e)
                        } }
                    />
                    <FormFeedback valid>
                      Password fullfill requirements
                    </FormFeedback>
                    <FormFeedback>
                      Password is not correct
                    </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Button>Submit</Button>
              </Form>
          </Container>
        </div>
      );
    }


}

export default Login;
