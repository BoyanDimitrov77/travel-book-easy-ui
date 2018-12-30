import React from 'react';
import AppNavBar from '../common/AppNavBar';
import './BookTransport.css'
import BookTransportInfoComponent from './BookTransportInfoComponent'
import BookTransportPassengerComponent from './BookTransportPassengerComponent'
import { connect } from 'react-redux'

const BookTransport = (props) => {
    const {flight} = props;
    return(
      <div>
        <AppNavBar/>

        <div className="book-transport-containers">
          <BookTransportInfoComponent flight ={flight}/>
          <BookTransportPassengerComponent/>
        </div>
      </div>
    )

}

const mapStateToProps = (state, ownProps) =>{

  const id = ownProps.match.params.id;
  console.log(id);
  return {
    flight : state.flight.flights.find(function(element){
      return element.id == id;
    })
  }
}

export default connect(mapStateToProps) (BookTransport);
