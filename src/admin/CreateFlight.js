import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col,
Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CreateTravelClass from './CreateTravelClass';
import { connect } from 'react-redux';
import { createFlight } from '../store/actions/flightActions';
import { getAllCompany } from '../store/actions/companyActions';
import { addTravelClass } from '../store/actions/traveClassActions';
import { Redirect } from 'react-router-dom';

class CreateFlight extends Component{

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
      'selectedCompanyId':'',

    }
    this.handleChange = this.handleChange.bind(this);
  }

   componentDidMount(){
     this.props.companyList(this.state);
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
      const createFlightRequest = Object.assign({}, this.state);
      var locationFromObject = {
         'name': this.state.locationFrom
       }
       var locationToObject = {
         'name': this.state.locationTo
       }
       createFlightRequest["departDate"] = createFlightRequest["departDate"] + "T"+ createFlightRequest["departTime"];
       createFlightRequest["arriveDate"] = createFlightRequest["arriveDate"] + "T"+ createFlightRequest["arriveTime"];
       createFlightRequest["locationFrom"] = locationFromObject;
       createFlightRequest["locationTo"] = locationToObject;
       createFlightRequest["travelClasses"] = this.props.travelClasses;

       console.log(createFlightRequest);
       this.props.createFlight(createFlightRequest);

    }

    handleInvalidSubmit(e){
      console.log("error")
    }

    addTravelClass = (e)=>{
      this.props.addTravelClass({'travelClass':'', 'maxSeats': '', 'price': ''});
    }


    render() {
       const companies = this.props.companies;
       const companyOption = companies.map((company)=>
        <option key={company.id} id={company.id} value={company.id}>{company.name}</option>
        );

        if(!this.props.authUser) return <Redirect to='/login' />
        if(!this.props.isAdmin) return <Redirect to='/' />

        return (
          <div>
            <AppNavBar/>
            <Container className= "ContainerForm">

            <h2>Create Flight</h2>

              {this.props.flight.showOperationStatusMessage ? (
                this.props.flight.isSuccessfullOperation ?
                  (<Alert className="statusMessage" color="success"> Successfull operation. </Alert>) :
                (<Alert className="statusMessage" color="danger"> Sorry! Something went wrong. Please try again! </Alert>)
              ) :
              (
                <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } onInvalidSubmit={ (e) => this.handleInvalidSubmit(e) } >
                  <Col>
                    <AvField type="select" value="{this.state.companyId}" name="selectedCompanyId" label="Company"
                      onChange={ (e) => {
                                this.handleChange(e)
                              } }>
                              <option/>
                            {companyOption}
                    </AvField>

                  </Col>

                  <Col>

                  <AvField name="name" label="Flight Name" type="text" errorMessage="Invalid Flight name" validate={{
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
                  <Col>
                    <Button onClick={this.addTravelClass}>Add new travel class</Button>
                    <CreateTravelClass />
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

const mapStateToProps = (state) => {
  return {
    flight : state.flight,
    companies : state.companies.companies,
    travelClasses : state.travelClasses.travelClasses,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    createFlight : (flight) => dispatch(createFlight(flight)),
    companyList : (companies) => dispatch(getAllCompany(companies)),
    addTravelClass : (travelClass) => dispatch(addTravelClass(travelClass))
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(CreateFlight);
