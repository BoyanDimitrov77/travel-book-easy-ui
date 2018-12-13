import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col,
Button, Alert, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { createCompany, uploadCompanyLogo} from '../util/API_REST';
import ImageUploadComponent from '../common/ImageUploadComponent'

class CreateCompany extends Component{

  constructor(props){
    super(props);
    this.state = {
      file : '',
      imagePreviewUrl : '',
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


     if (["imageClass"].includes(target.className)) {

       let reader = new FileReader();
       let file = target.files[0];

       reader.onloadend = () =>{
         this.setState({
           file : file,
           imagePreviewUrl : reader.result
         });
       }

       reader.readAsDataURL(file);
     }

  }

  handleValidSubmit(e) {
    e.persist();
    const createCompanyRequest = Object.assign({}, this.state);
    console.log(createCompanyRequest);
    const formData = new FormData();
    formData.append('file',createCompanyRequest.file);
      createCompany(createCompanyRequest)
      .then(response => {
        console.log(formData);
            console.log(response);
              uploadCompanyLogo(formData,response.id )
              .then(response=>{
                this.setState({
                  isSuccessfullOperation : true,
                  showOperationStatusMessage: true,
                });

              }).catch(error=>{
                if(error.status === 500) {
                  this.setState({
                    isSuccessfullOperation : false,
                    showOperationStatusMessage :true,
                  });

                }
              });
          }).catch(error => {
              if(error.status === 500) {
                this.setState({
                  isSuccessfullOperation : false,
                  showOperationStatusMessage :true,
                });

              }
          });
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

            {this.state.showOperationStatusMessage ? (
              this.state.isSuccessfullOperation ?
                (<Alert className="statusMessage" color="success"> Successfull operation. </Alert>) :
              (<Alert className="statusMessage" color="danger"> Sorry! Something went wrong. Please try again! </Alert>)
            ) :
            (
              <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } onInvalidSubmit={ (e) => this.handleInvalidSubmit(e) } >

                <Col>
                   <Label for="CompanyLogo">Company logo</Label>
                    <ImageUploadComponent handleChange ={this.handleChange} {...this.state} />
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

export default CreateCompany;
