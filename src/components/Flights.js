import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import SearchComponent from './SearchComponent';
import ListTransportComponent from './ListTransportComponent';
import { allFlights } from '../store/actions/flightActions'
import { resetAppWithoutUser } from '../store/actions/rootActions'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class Flights extends Component{

  componentDidMount(){
    this.props.resetAppWithoutUser();
    this.props.allFlights();
    }

  render(){
    if(!this.props.authUser) return <Redirect to='/login' />

    const {flights} = this.props;
    return (
      <div>
        <AppNavBar/>
        <SearchComponent/>
        <ListTransportComponent flights={flights}/>
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    flights : state.flight.flights,
    authUser : state.auth.user,
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    allFlights : () => dispatch(allFlights()),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (Flights);
