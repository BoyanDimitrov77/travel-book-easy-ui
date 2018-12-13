import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col,
Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { createBus, getAllCompany } from '../util/API_REST';

class CreateBus extends Component{

  constructor(props){
    super(props);
    this.state = {
      'name':'',
      'locationFrom':'',
      'locationTo': '',
      'departDate': '',
      'departTime': '',
      'arriveDate': '',
      'arriveTime': '',
      'price': '',
      isSuccessfullOperation : false,
      showOperationStatusMessage : false,
      companies :[],
      'selectedCompanyId':'',

    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    getAllCompany()
    .then(response =>{
      console.log(response);
      this.setState({
        companies: response,
      })
    });
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
    const createBusRequest = Object.assign({}, this.state);
    var locationFromObject = {
      'name': this.state.locationFrom
    }
    var locationToObject = {
      'name': this.state.locationTo
    }
    createBusRequest["departDate"] = createBusRequest["departDate"] + "T"+ createBusRequest["departTime"];
    createBusRequest["arriveDate"] = createBusRequest["arriveDate"] + "T"+ createBusRequest["arriveTime"];
    createBusRequest["locationFrom"] = locationFromObject;
    createBusRequest["locationTo"] = locationToObject;
    console.log(createBusRequest);
     createBus(createBusRequest)
     .then(response => {
            this.setState({
              isSuccessfullOperation : true,
              showOperationStatusMessage: true,
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

  render() {

     const {companies } = this.state;

     const companyOption = companies.map((company)=>
      <option key={company.id} id={company.id} value={company.id}>{company.name}</option>
      );

      return (
        <div>
          <AppNavBar isAdmin={this.props.isAdmin} isAuthenticated={this.props.isAuthenticated}/>
          {
          this.props.isAuthenticated ? (
          <Container className= "ContainerForm">

          <h2>Create Bus</h2>

            {this.state.showOperationStatusMessage ? (
              this.state.isSuccessfullOperation ?
                (<Alert className="statusMessage" color="success"> Successfull operation. </Alert>) :
              (<Alert className="statusMessage" color="danger"> Sorry! Something went wrong. Please try again! </Alert>)
            ) :
            (
              <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } onInvalidSubmit={ (e) => this.handleInvalidSubmit(e) } >
                <Col>
                  <AvField type="select" value={this.state.companyId} name="selectedCompanyId" label="Company"
                    onChange={ (e) => {
                              this.handleChange(e)
                            } }>
                            <option/>
                      {companyOption}
                  </AvField>

                </Col>

                <Col>

                <AvField name="name" label="Bus Name" type="text" errorMessage="Invalid Flight name" validate={{
                    required: {value: true},
                    pattern: {value: '^[A-Za-z-]+$'}
                  }}
                  onChange={ (e) => {
                              this.handleChange(e)
                            } } />
                </Col>
                <Col>
                  <AvField name="locationFrom" label="Location From" type="text" errorMessage="Invalid Location From" validate={{
                      required: {value: true},
                      pattern: {value: '^[A-Za-z]+$'}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e)
                              } }/>
                </Col>
                <Col>
                  <AvField name="locationTo" label="Location To" type="text" errorMessage="Invalid Location To" validate={{
                      required: {value: true},
                      pattern: {value: '^[A-Za-z]+$'}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e)
                              } }/>
                </Col>

                <Col >
                    <AvField label="Depart Date" name="departDate" id="departDate"  type="date" validate={{
                      dateRange: {start: {value: -5, units: 'years',}
                      ,end: {value: 5, units: 'years',}},
                      required: {value: true}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e)
                              } } />
                    <AvField label=" DepartTime" name="departTime" id="departTime" type="time" validate ={{
                      required: {value: true}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e)
                              } }/>
                </Col>

                <Col>
                  <AvField label="Arrive Date" name="arriveDate" id="arriveDate"  type="date" validate={{
                    dateRange: {start: {value: -5, units: 'years',} ,
                    end: {value: 5, units: 'years',}},
                    required: {value: true}
                  }}
                  onChange={ (e) => {
                              this.handleChange(e)
                            } }/>
                  <AvField label=" Arrive Time" name="arriveTime" id="arriveTime" type="time" validate={{
                    required: {value: true}
                  }}
                  onChange={ (e) => {
                              this.handleChange(e)
                            } }/>
                </Col>

                <Col>
                <AvField name="price" label="Price" type="text" errorMessage="Invalid Price" validate={{
                    required: {value: true},
                    pattern: {value: '^[0-9]+$'}
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

export default CreateBus;
