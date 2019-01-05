import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col,
Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import CreateTravelClass from './CreateTravelClass';
import { connect } from 'react-redux';
import { updateFlightInfo } from '../store/actions/adminActions';
import { getAllCompany } from '../store/actions/companyActions';
import { addTravelClass } from '../store/actions/traveClassActions'
import { Redirect } from 'react-router-dom';

class EditFlight extends Component {
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

      console.log(this.state);

        const flightObject = Object.assign({}, this.state);

        let flightObjectUpdateRequest = {}
        flightObjectUpdateRequest["id"] = this.props.flight.id;

        if(flightObject.name.localeCompare("")!==0){
          flightObjectUpdateRequest["name"] = flightObject.name;
        }

        if(flightObject.selectedCompanyId.localeCompare("") !==0){
          flightObjectUpdateRequest["company"] = {
            "id" : flightObject.selectedCompanyId
          }
        }

        if(flightObject.locationFrom.localeCompare("")!==0){
          flightObjectUpdateRequest["locationFrom"] = {
            "name" : flightObject.locationFrom
          }
        }

        if(flightObject.locationTo.localeCompare("")!==0){
          flightObjectUpdateRequest["locationTo"] = {
            "name" : flightObject.locationTo
          }
        }

        if(flightObject.departDate.localeCompare("")!==0){
          var departDate = flightObject["departDate"] + "T";
          if(flightObject.departTime.localeCompare("")!==0){
            departDate = departDate + flightObject["departTime"];
          }else{
            departDate = departDate + this.props.flight.departDate.split("T")[1];
          }
          flightObjectUpdateRequest["departDate"] = departDate
        }

        if(flightObject.arriveDate.localeCompare("")!==0){
          var arriveDate = flightObject["arriveDate"] + "T";
          if(flightObject.arriveTime.localeCompare("")!==0){
            arriveDate = arriveDate + flightObject["arriveTime"];
          }else{
            arriveDate = arriveDate + this.props.flight.arriveDate.split("T")[1];
          }
          flightObjectUpdateRequest["arriveDate"] = arriveDate;
        }

        if(flightObject.price.localeCompare("")!==0){
          flightObjectUpdateRequest["price"] = flightObject.price;
        }

        console.log(flightObjectUpdateRequest);
        this.props.updateFlightInfo(flightObjectUpdateRequest);

    }

    handleInvalidSubmit(e){
      console.log("error")
    }

    // addTravelClass = (e)=>{
    //   this.props.addTravelClass({'travelClass':'', 'maxSeats': '', 'price': ''});
    // }


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

            <h2>Edit Flight</h2>

              {this.props.showOperationStatusMessage ? (
                this.props.isSuccessfullOperation ?
                  (<Alert className="statusMessage" color="success"> Successfull operation. </Alert>) :
                (<Alert className="statusMessage" color="danger"> Sorry! Something went wrong. Please try again! </Alert>)
              ) :
              (
                <AvForm className="form"  onValidSubmit={ (e) => this.handleValidSubmit(e) } onInvalidSubmit={ (e) => this.handleInvalidSubmit(e) } >
                  <Col>
                    <AvField type="select" value={this.props.flight.company.id} name="selectedCompanyId" label="Company"
                      onChange={ (e) => {
                                this.handleChange(e)
                              } }>
                              <option/>
                            {companyOption}
                    </AvField>

                  </Col>

                  <Col>

                  <AvField name="name" label="Flight Name" value={this.props.flight.name} type="text" errorMessage="Invalid Flight name" validate={{
                      required: {value: true},
                      pattern: {value: '^[A-Za-z-]+$'}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e)
                              } } />
                  </Col>
                  <Col>
                    <AvField name="locationFrom" label="Location From"  value={this.props.flight.locationFrom.name} type="text" errorMessage="Invalid Location From" validate={{
                        required: {value: true},
                        pattern: {value: '^[A-Za-z]+$'}
                      }}
                      onChange={ (e) => {
                                  this.handleChange(e)
                                } }/>
                  </Col>
                  <Col>
                    <AvField name="locationTo" label="Location To"  value={this.props.flight.locationTo.name} type="text" errorMessage="Invalid Location To" validate={{
                        required: {value: true},
                        pattern: {value: '^[A-Za-z]+$'}
                      }}
                      onChange={ (e) => {
                                  this.handleChange(e)
                                } }/>
                  </Col>

                  <Col >
                      <AvField label="Depart Date" value={this.props.flight.departDate.split("T")[0]} name="departDate" id="departDate"  type="date" validate={{
                        dateRange: {start: {value: -5, units: 'years',}
                        ,end: {value: 5, units: 'years',}},
                        required: {value: true}
                      }}
                      onChange={ (e) => {
                                  this.handleChange(e)
                                } } />
                      <AvField label=" DepartTime" value={this.props.flight.departDate.split("T")[1]} name="departTime" id="departTime" type="time" validate ={{
                        required: {value: true}
                      }}
                      onChange={ (e) => {
                                  this.handleChange(e)
                                } }/>
                  </Col>

                  <Col>
                    <AvField label="Arrive Date"  value={this.props.flight.arriveDate.split("T")[0]} name="arriveDate" id="arriveDate"  type="date" validate={{
                      dateRange: {start: {value: -5, units: 'years',} ,
                      end: {value: 5, units: 'years',}},
                      required: {value: true}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e)
                              } }/>
                    <AvField label=" Arrive Time" value={this.props.flight.arriveDate.split("T")[1]} name="arriveTime" id="arriveTime" type="time" validate={{
                      required: {value: true}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e)
                              } }/>
                  </Col>

                  <Col>
                  <AvField name="price" label="Price" value={this.props.flight.price} type="text" errorMessage="Invalid Price" validate={{
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
            </Container>
          </div>
        );
      }

  }

  const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  return {
    flight : state.flight.flights.find(function(element){
      return element.id == id;
    }),
    companies : state.companies.companies,
    travelClasses : state.travelClasses.travelClasses,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin,
    isSuccessfullOperation : state.admin.editFlight.isSuccessfullOperation,
    showOperationStatusMessage : state.admin.editFlight.showOperationStatusMessage,
    }
  }

  const mapDispactchToProps = (dispatch) =>{
  return {
    companyList : (companies) => dispatch(getAllCompany(companies)),
    addTravelClass : (travelClass) => dispatch(addTravelClass(travelClass)),
    updateFlightInfo : (requestObject) => dispatch(updateFlightInfo(requestObject))
    }
  }

export default connect(mapStateToProps, mapDispactchToProps) (EditFlight);
