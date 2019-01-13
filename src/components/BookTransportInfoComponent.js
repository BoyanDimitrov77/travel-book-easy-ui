import React from 'react';
import { connect } from 'react-redux'
import { Container, Badge, Button } from 'reactstrap';
import ImageComponent from './ImageComponent'
import { Link } from 'react-router-dom'

const BookTransportInfoComponent = (props) =>{

  return(
    <Container className= "ContainerForm">
      <div className="book-transport-info-preview">

        <div>
          <h3><Badge color="secondary">{props.flightName}</Badge></h3>
          <ImageComponent imageUrl={props.companyLogo}/>
        </div>

        <div className="book-transport-info">
          <div>
            <h5>Company : <Badge color="secondary">{props.companyName}</Badge></h5>
            <h5>From : <Badge color="secondary">{props.locationFrom}</Badge></h5>
            <h5>To : <Badge color="secondary">{props.locationTo}</Badge></h5>
            <h5>TravelClass : <Badge color="secondary">{props.travelClassName}</Badge></h5>
          </div>

          <div>
            <h5>Depart : <Badge color="secondary">{props.departDate}</Badge></h5>
            <h5>Arrive : <Badge color="secondary">{props.arriveDate}</Badge></h5>
            <h5>Price : <Badge color="secondary">$ {props.price}</Badge></h5>
            <h5>Tickets : <Badge color="secondary">{props.tickets}</Badge></h5>
          </div>
        </div>

      </div>
      <div className="center-button">
        <Link to='/payment'>
          <Button color="success">Pay</Button>
        </Link>

      </div>
    </Container>
  )

}

const mapStateToProps = (state)=>{
  let flight = state.flight.flights.find(function(element){
    return element.id == state.flight.bookTransport.flightId;
  });

  let travelClass = flight.travelClasses.find(function(element){
    return element.id == state.flight.bookTransport.travelClassId;
  });
  return {
    flightName  : flight.name,
    companyName : flight.company.name,
    companyLogo : flight.company.companyLogo ? flight.company.companyLogo.thumbnailPicture.value : null,
    locationFrom : flight.locationFrom.name,
    locationTo : flight.locationTo.name,
    travelClassName : travelClass.travelClass,
    departDate : flight.departDate,
    arriveDate : flight.departDate,
    price : state.flight.bookTransport.price,
    tickets : state.flight.passengers.length
  }
}

export default connect(mapStateToProps) (BookTransportInfoComponent);
