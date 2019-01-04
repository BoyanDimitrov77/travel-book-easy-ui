import React from 'react';
import {Container, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import img from './512.png';
import './ListTransportComponent.css'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom'

const ListTransportComponent = ({flights}) =>{

    const flightList = flights.length ? (
      flights.map(flight =>{
        // console.log(this.props.getImage( 'https://' + flight.company.companyLogo.thumbnailPicture.value));
        return (
        <ListGroupItem key={flight.id}>
            <div className="transport-box" >
               <div>

               <h3><Badge color="secondary"> {flight.company.name} </Badge></h3>
               <Link to={'/company/' + flight.company.id}>
                 <Avatar src={img} round={true} />
               </Link>
               </div>

               <div>
                   <h3><Badge color="secondary"> {flight.name}</Badge></h3>
                   <h5>From : <Badge color="secondary">{flight.locationFrom.name}</Badge></h5>
                   <h5>To : <Badge color="secondary">{flight.locationTo.name}</Badge></h5>
               </div>
               <div>
                 <h5>Depart : <Badge color="secondary">{flight.departDate}</Badge></h5>
                 <h5>Arrive : <Badge color="secondary">{flight.arriveDate}</Badge></h5>
               </div>

               <div>
                 <h5>From price : <Badge color="secondary">$ {flight.price}</Badge></h5>
                <Link to={'/bookTransport/' + flight.id} >
                    <Button  className="book-button" color="success" >Book</Button>
                </Link>

               </div>
           </div>
        </ListGroupItem>
        )
      })

    ): (
      <ListGroupItem>
            <h3><Badge color="secondary"> No available flights</Badge></h3>
      </ListGroupItem>
    )

    return(
    <Container className= "ContainerForm">
      <ListGroup>
        {flightList}
      </ListGroup>

    </Container>
    )

}
export default ListTransportComponent;
