import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Button, Alert, Col, Label } from 'reactstrap';
import ImageUploadComponent from '../common/ImageUploadComponent'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateCompanyNameAdminWithoutLogo, updateCompanyNameAdminWithLogo } from '../store/actions/adminActions';

class EditCompany extends Component {
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

  handleValidSubmit(e){
    e.persist();
    const createCompanyRequest = Object.assign({}, this.state);
    console.log(createCompanyRequest);
    console.log(this.props.imageFile);

    let companyName = "";

    if(createCompanyRequest.name.localeCompare('') != 0){
      companyName = createCompanyRequest.name;
    }else{
      companyName = this.props.company.name;
    }
    console.log(this.props.company.id);
    console.log(companyName);

     if(this.props.imageFile.name){
       this.props.updateCompanyNameAdminWithLogo(this.props.company.id, companyName, this.props.imageFile)
     }else{
       this.props.updateCompanyNameAdminWithoutLogo(this.props.company.id,companyName)
     }
  }

  handleInvalidSubmit(e){
    console.log("error")
  }

    render(){
      if(!this.props.authUser) return <Redirect to='/login' />
      if(!this.props.isAdmin) return <Redirect to='/' />

        return (
          <div>
            <AppNavBar/>
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

                  <AvField name="name" label="Company name" value={this.props.company.name} type="text" errorMessage="Invalid Comapny name" validate={{
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
            </Container>
          </div>

        );

    }

}

  const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  return {
    company : state.companies.companies.find(function(element){
      return element.id == id;
    }),
    imageFile : state.image.imageFile,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin,
    isSuccessfullOperation : state.admin.editCompany.isSuccessfullOperation,
    showOperationStatusMessage : state.admin.editCompany.showOperationStatusMessage,
    }
  }

  const mapDispactchToProps = (dispatch) =>{
  return {
    updateCompanyNameAdminWithoutLogo : (companyId, name) => dispatch(updateCompanyNameAdminWithoutLogo(companyId, name)),
    updateCompanyNameAdminWithLogo : (companyId, name, imageFile) => dispatch(updateCompanyNameAdminWithLogo(companyId, name, imageFile))
    }
  }

export default connect(mapStateToProps, mapDispactchToProps) (EditCompany);
