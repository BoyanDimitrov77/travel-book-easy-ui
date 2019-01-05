import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { connect } from 'react-redux'
import { allFlights } from '../store/actions/flightActions'
import { resetAppWithoutUser } from '../store/actions/rootActions';
import FlightElement from './FlightElement'
import { Container, ListGroup } from 'reactstrap';

class FlightsAdmin extends Component{

  componentDidMount(){
    this.props.resetAppWithoutUser();
    this.props.allFlights();
  }

  render(){
    const { flights } = this.props;

    const flightElements = flights.length ? (
      flights.map(flight=>{
        return(
          <FlightElement flight={flight} key={flight.id}/>
        )
      })
    ) : null ;

    return(
      <div>
        <AppNavBar/>
        <Container className="ContainerForm">
        <ListGroup>
            {flightElements}
          </ListGroup>
        </Container>
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
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (FlightsAdmin);
