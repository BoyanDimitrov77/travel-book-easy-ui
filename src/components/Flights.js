import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import SearchComponent from './SearchComponent';
import ListTransportComponent from './ListTransportComponent';
import { allFlights, getImage } from '../store/actions/flightActions'
import { resetAppWithoutUser } from '../store/actions/rootActions'
import { connect } from 'react-redux'

class Flights extends Component{


  componentDidMount(){
    this.props.resetAppWithoutUser();
    this.props.allFlights();
  }

  render(){

    const {flights} = this.props;
    return (
      <div>
        <AppNavBar/>
        <SearchComponent/>
        <ListTransportComponent flights={flights} />
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    flights : state.flight.flights
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    allFlights : () => dispatch(allFlights()),
    getImage : (imageUrl) => dispatch(getImage(imageUrl)),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (Flights);
