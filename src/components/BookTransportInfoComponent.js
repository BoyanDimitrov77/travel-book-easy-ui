import React from 'react';
import { Container, Badge, Input } from 'reactstrap';
import Avatar from 'react-avatar';
import img from './512.png';

const BookTransportInfoComponent = ({flight}) =>{

  const flightElement = flight ?  (
      <div className="book-transport">

        <div>
          <h3><Badge color="secondary">{flight.name}</Badge></h3>
          <Avatar src={img} round={true} />

        </div>

        <div className="book-transport-info">
          <div>
            <h5>Company : <Badge color="secondary">{flight.company.name}</Badge></h5>
            <h5>From : <Badge color="secondary">{flight.locationFrom.name}</Badge></h5>
            <h5>To : <Badge color="secondary">{flight.locationTo.name}</Badge></h5>

            <h5>Travel class :
              <Input type="select" name="select" id="exampleSelect">
               <option>1</option>
               <option>2</option>
               <option>3</option>
               <option>4</option>
               <option>5</option>
             </Input>

            </h5>

          </div>

          <div>
            <h5>Depart : <Badge color="secondary">{flight.departDate}</Badge></h5>
            <h5>Arrive : <Badge color="secondary">{flight.arriveDate}</Badge></h5>
            <h5>Price : <Badge color="secondary">$ {flight.price}</Badge></h5>
              <h5>Passenger :
                <Input type="select" name="select" id="exampleSelect">
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
                 <option>5</option>
               </Input>
              </h5>
          </div>
        </div>

      </div>
  ) : null;


  return (
    <Container className= "ContainerForm book-transport-info-box">
      {flightElement}
    </Container>
  )


}

export default BookTransportInfoComponent;
