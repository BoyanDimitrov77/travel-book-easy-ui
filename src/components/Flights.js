import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import SearchComponent from './SearchComponent'
import {Container, Button } from 'reactstrap';

class Flights extends Component{

  render(){

    return (
      <div>
        <AppNavBar/>
        <SearchComponent/>
        <Container className= "ContainerForm">
        </Container>
      </div>
    )
  }

}
export default Flights;
