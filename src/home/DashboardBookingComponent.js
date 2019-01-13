import React, { Component } from 'react';
import { ListGroupItem, Badge, Button } from 'reactstrap'
import './Home.css'

const DashboardBookingComponent = (props) =>{

    const bookings = props.flightBookings.length ? (props.flightBookings.map(flightBooking =>{

      let bookingStatus = null;
      switch(flightBooking.status){
        case 'CONFIRMED' :
          bookingStatus = <Badge color="success">{flightBooking.status} </Badge>
          break;

        case 'WAITING' :
          bookingStatus = <Badge color="warning">{flightBooking.status} </Badge>
          break;
        case 'CANCELLED' :
          bookingStatus = <Badge color="danger">{flightBooking.status} </Badge>
          break;

      }

      return(
        <ListGroupItem key={flightBooking.id}>
          <div className="book-transport-info-preview">

            <div>
              <h4><Badge color="secondary">{flightBooking.transport.name}</Badge></h4>
            </div>

            <div className="book-transport-info">
              <div>
                <h6>Company : <Badge color="secondary">{flightBooking.transport.company.name}</Badge></h6>
                <h6>From : <Badge color="secondary">{flightBooking.transport.locationFrom.name}</Badge></h6>
                <h6>To : <Badge color="secondary">{flightBooking.transport.locationTo.name}</Badge></h6>
              </div>

              <div>
                <h6>Depart : <Badge color="secondary">{flightBooking.transport.departDate}</Badge></h6>
                <h6>Arrive : <Badge color="secondary">{flightBooking.transport.arriveDate}</Badge></h6>
                <h6>Price : <Badge color="secondary">$ {flightBooking.transport.price}</Badge></h6>
                <h6>Tickets : <Badge color="secondary">{flightBooking.passengerTickets.length}</Badge></h6>
              </div>
              {bookingStatus}
            </div>
          </div>
        </ListGroupItem>
      )
    })) :(
      <ListGroupItem>
            <h4><Badge color="secondary"> No available bookings</Badge></h4>
      </ListGroupItem>
    )

    return(
      <div>
        {bookings}
      </div>
    )

}

export default DashboardBookingComponent;
