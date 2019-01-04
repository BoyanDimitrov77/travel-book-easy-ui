import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Container, Col, Button, Alert } from 'reactstrap';
import { resetPassword } from '../store/actions/authActions';
import { connect } from 'react-redux';

class ForgotPassword extends Component {

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
    this.props.resetPassword(requestObject)
  }

  render(){
      return(
        <div>
          <AppNavBar/>

          <Container className= "ContainerForm">

            <h2> Forgot Password </h2>

            <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } >
              <Col>
                {
                  this.props.isSuccessfullResetPassowordOperation ? (
                      this.props.showErroMessage ? null : ( <Alert className="statusMessage" color="success"> Please check your email for account password reset!</Alert> )
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
                <Button>Reset Password</Button>
              </Col>

            </AvForm>
          </Container>

        </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    isSuccessfullResetPassowordOperation: state.auth.isSuccessfullResetPassowordOperation,
    showErroMessage: state.auth.showErroMessage
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    resetPassword : (requestObject) => dispatch(resetPassword(requestObject))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ForgotPassword);
