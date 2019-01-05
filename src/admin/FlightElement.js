import React from 'react';
import { Badge, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const FlightElement = (props) =>{

    return(
        <ListGroupItem>
          <div className="transport-box" >
             <div>

             <h3><Badge color="secondary"> {props.flight.company.name} </Badge></h3>
             </div>

             <div>
                 <h3><Badge color="secondary"> {props.flight.name}</Badge></h3>
                 <h5>From : <Badge color="secondary">{props.flight.locationFrom.name}</Badge></h5>
                 <h5>To : <Badge color="secondary">{props.flight.locationTo.name}</Badge></h5>
             </div>
             <div>
               <h5>Depart : <Badge color="secondary">{props.flight.departDate}</Badge></h5>
               <h5>Arrive : <Badge color="secondary">{props.flight.arriveDate}</Badge></h5>
             </div>

             <div>
               <h5>From price : <Badge color="secondary">$ {props.flight.price}</Badge></h5>
               <Link to={'/admin/edit/flight/' + props.flight.id} >
                   <Button  className="book-button" color="success" >Edit</Button>
               </Link>
             </div>

         </div>
      </ListGroupItem>
    )

}
export default FlightElement;
