import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Container, Button } from 'reactstrap';
import Toggle from "react-toggle-component";
import "react-toggle-component/styles.css";
import './SearchComponent.css'


class SearchComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      checkedPrice: false,
      checkedRating : false

    }
    //this.handleChange = this.handleChange.bind(this);
  }

  render(){

    return (
      <Container className= "ContainerForm">
          <AvForm>
          <div className="search-box">
            <AvField className="location-field" name="locationFrom" label="From" type="text" errorMessage="Invalid Location from" validate={{
                required: {value: true},
                pattern: {value: '^[A-Za-z-]+$'}
              }}
              onChange={ (e) => {
                          //this.handleChange(e)
                        } } />

            <AvField className="location-field" inline="true" name="locationTo" label="To" type="text" errorMessage="Invalid Location to" validate={{
                required: {value: true},
                pattern: {value: '^[A-Za-z-]+$'}
              }}
              onChange={ (e) => {
                          //this.handleChange(e)
                        } } />

              <AvField label="Date" name="date" id="date"  type="date" validate={{
                dateRange: {start: {value: -5, units: 'years',}
                ,end: {value: 5, units: 'years',}},
                required: {value: true}
              }}
              onChange={ (e) => {
                          //this.handleChange(e)
                        } } />

              <Button color="secondary">Search</Button>
            </div>

            <div className="sort-box">
              <Toggle id="priceToggle" label="Price" checked={this.state.checkedPrice} onToggle={value => this.setState({checkedPrice:value})} />
              <Toggle id="ratingToggle" label="Rating" checked={this.state.checkedRating} onToggle={value => this.setState({checkedRating:value})}/>
            </div>
          </AvForm>
        </Container>
    )
  }

}

export default SearchComponent;
