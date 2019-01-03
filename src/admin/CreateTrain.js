import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col,
Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux'
import CreateTravelClass from './CreateTravelClass';
import { createTrain } from '../store/actions/trainActions';
import { getAllCompany } from '../store/actions/companyActions';
import { addTravelClass } from '../store/actions/traveClassActions'
import { Redirect } from 'react-router-dom';

class CreateTrain extends Component{

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
    const createTrainRequest = Object.assign({}, this.state);
    var locationFromObject = {
      'name': this.state.locationFrom
    }
    var locationToObject = {
      'name': this.state.locationTo
    }
    createTrainRequest["departDate"] = createTrainRequest["departDate"] + "T"+ createTrainRequest["departTime"];
    createTrainRequest["arriveDate"] = createTrainRequest["arriveDate"] + "T"+ createTrainRequest["arriveTime"];
    createTrainRequest["locationFrom"] = locationFromObject;
    createTrainRequest["locationTo"] = locationToObject;
    createTrainRequest["travelClasses"] = this.props.travelClasses;

    this.props.createTrain(createTrainRequest);
    console.log(createTrainRequest);
  }

  handleInvalidSubmit(e){
    console.log("error")
  }

  addTravelClass = (e)=>{
    this.props.addTravelClass({'travelClass':'', 'maxSeats': '', 'price': ''});
  }

  render() {
    if(!this.props.authUser) return <Redirect to='/login' />
    if(!this.props.isAdmin) return <Redirect to='/' />

     const companies = this.props.companies;
     const companyOption = companies.map((company)=>
      <option key={company.id} id={company.id} value={company.id}>{company.name}</option>
      );

      return (
        <div>
          <AppNavBar/>

          <Container className= "ContainerForm">

          <h2>Create Train</h2>

            {this.props.train.showOperationStatusMessage ? (
              this.props.train.isSuccessfullOperation ?
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

                <AvField name="name" label="Train Name" type="text" errorMessage="Invalid Flight name" validate={{
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
          </Container>) : null
        </div>
      );
    }


}

const mapStateToProps = (state) => {
  return {
    train : state.train,
    companies : state.companies.companies,
    travelClasses : state.travelClasses.travelClasses,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    createTrain : (train) => dispatch(createTrain(train)),
    companyList : (companies) => dispatch(getAllCompany(companies)),
    addTravelClass : (travelClass) => dispatch(addTravelClass(travelClass))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (CreateTrain);
