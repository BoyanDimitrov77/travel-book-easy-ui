import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col,
Button, Alert, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ImageUploadComponent from '../common/ImageUploadComponent'
import { createCompany } from '../store/actions/companyActions'
import { connect } from 'react-redux';

class CreateCompany extends Component{

  constructor(props){
    super(props);
    this.state = {
      'name':'',
      isSuccessfullOperation : false,
      showOperationStatusMessage : false
    }
    this.handleChange = this.handleChange.bind(this);
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
    const createCompanyRequest = Object.assign({}, this.state);
    console.log(createCompanyRequest);
    console.log(this.props.imageFile);

    this.props.createCompany(createCompanyRequest, this.props.imageFile);
  }

  handleInvalidSubmit(e){
    console.log("error")
  }

  render(){

      return (
        <div>
          <AppNavBar isAdmin={this.props.isAdmin} isAuthenticated={this.props.isAuthenticated}/>
          {
          this.props.isAuthenticated ? (
          <Container className= "ContainerForm">

          <h2>Create Company</h2>

            {this.props.showOperationStatusMessage ? (
              this.props.isSuccessfullOperation ?
                (<Alert className="statusMessage" color="success"> Successfull operation. </Alert>) :
              (<Alert className="statusMessage" color="danger"> Sorry! Something went wrong. Please try again! </Alert>)
            ) :
            (
              <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } onInvalidSubmit={ (e) => this.handleInvalidSubmit(e) } >

                <Col>
                   <Label for="CompanyLogo">Company logo</Label>
                    <ImageUploadComponent />
                </Col>


                <Col>

                <AvField name="name" label="Company name" type="text" errorMessage="Invalid Comapny name" validate={{
                    required: {value: true},
                    pattern: {value: '^[A-Z a-z-]+$'}
                  }}
                  onChange={ (e) => {
                              this.handleChange(e)
                            } } />
                </Col>

                <Button>Submit</Button>

            </AvForm>
              )
           }
          </Container>) : null
        }
        </div>

      );

  }
}

const mapStateToProps = (state) =>{
  return {
    imageFile : state.image.imageFile,
    showOperationStatusMessage : state.companies.showOperationStatusMessage,
    isSuccessfullOperation : state.companies.isSuccessfullOperation
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    createCompany : (company, imageFile) => dispatch(createCompany(company, imageFile))
  }
}


export default connect(mapStateToProps, mapDispactchToProps) (CreateCompany);
