import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllUsersFlightBooking } from '../store/actions/homeActions'
import DashboardBookingComponent from './DashboardBookingComponent'

class DashboardBookings extends Component{

  componentDidMount(){
    this.props.getAllUsersFlightBooking();
  }

  render(){
    return(
      <div>
      <h2>Your bookings</h2>
        <DashboardBookingComponent flightBookings={this.props.userFlightBookings}/>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    userFlightBookings : state.home.userFlightBookings
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getAllUsersFlightBooking : () => dispatch(getAllUsersFlightBooking())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DashboardBookings);
