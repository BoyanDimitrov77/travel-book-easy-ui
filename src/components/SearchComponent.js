import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Container, Button } from 'reactstrap';
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css";
import './SearchComponent.css'
import { connect } from 'react-redux'
import { findFlights } from '../store/actions/flightActions'

class SearchComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      sortByPrice: false,
      sortByRating : false
    }
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
    const searchRequest = Object.assign({}, this.state);
    this.props.findFlights(searchRequest)
  }

  render(){

    return (
      <Container className= "ContainerForm">
          <AvForm onValidSubmit={ (e) => this.handleValidSubmit(e) }>
          <div className="search-box">
            <AvField className="location-field" name="locationFrom" label="From" type="text" errorMessage="Invalid Location from" validate={{
                required: {value: true},
                pattern: {value: '^[A-Za-z-]+$'}
              }}
              onChange={ (e) => {
                          this.handleChange(e)
                        } } />

            <AvField className="location-field" inline="true" name="locationTo" label="To" type="text" errorMessage="Invalid Location to" validate={{
                required: {value: true},
                pattern: {value: '^[A-Za-z-]+$'}
              }}
              onChange={ (e) => {
                          this.handleChange(e)
                        } } />

              <AvField label="Date" name="date" id="date"  type="date" validate={{
                dateRange: {start: {value: -5, units: 'years',}
                ,end: {value: 5, units: 'years',}},
                required: {value: true}
              }}
              onChange={ (e) => {
                          this.handleChange(e)
                        } } />

              <Button color="secondary">Search</Button>
            </div>

            <div className="sort-box">
              <Toggle id="priceToggle" label="Price" checked={this.state.sortByPrice} onToggle={value => this.setState({sortByPrice:value})} />
              <Toggle id="ratingToggle" label="Rating" checked={this.state.sortByRating} onToggle={value => this.setState({sortByRating:value})}/>
            </div>
          </AvForm>
        </Container>
    )
  }

}

const mapDispactchToProps = (dispatch) =>{
  return {
    findFlights : (searchRequest) => dispatch(findFlights(searchRequest))
  }
}

export default connect(null, mapDispactchToProps) (SearchComponent);
