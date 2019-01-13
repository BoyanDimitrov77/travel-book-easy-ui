import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { connect } from 'react-redux'
import { allFlights } from '../store/actions/flightActions'
import { resetAppWithoutUser } from '../store/actions/rootActions';
import FlightElement from './FlightElement'
import { Container, ListGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class FlightsAdmin extends Component{

  componentDidMount(){
    this.props.resetAppWithoutUser();
    this.props.allFlights();
  }

  render(){

    const authUser = this.props.authUser;
    const isAdmin = this.props.isAdmin;
    console.log("Home authUser:" + authUser);
    if(!authUser) return <Redirect to='/login' />
    if(!isAdmin) return <Redirect to='/' />

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
    flights : state.flight.flights,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    allFlights : () => dispatch(allFlights()),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (FlightsAdmin);
