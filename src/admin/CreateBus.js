import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import {Container, Col,
Button, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { createBus } from '../store/actions/busActions'
import { getAllCompany } from '../store/actions/companyActions'
import { Redirect } from 'react-router-dom';

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

    this.props.createBus(createBusRequest);

  }

  handleInvalidSubmit(e){
    console.log("error")
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

          <h2>Create Bus</h2>

            {this.props.bus.showOperationStatusMessage ? (
              this.props.bus.isSuccessfullOperation ?
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
          </Container>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    bus : state.bus,
    companies : state.companies.companies,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    createBus : (bus) => dispatch(createBus(bus)),
    companyList : (companies) => dispatch(getAllCompany(companies))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (CreateBus);
