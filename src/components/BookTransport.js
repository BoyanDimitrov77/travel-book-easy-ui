import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import './BookTransport.css'
import { Alert, Container, Button } from 'reactstrap'
import { AvForm } from 'availity-reactstrap-validation';
import BookTransportComponent from './BookTransportComponent'
import BookTransportInfoComponent from './BookTransportInfoComponent'
import BookTransportPassengerComponent from './BookTransportPassengerComponent'
import { bookFlight } from '../store/actions/flightBookActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class BookTransport extends Component {

  handleValidSubmit(e) {
    e.persist();
    //console.log(this.props.bookTransport, this.props.passengers);
    this.props.bookFlight(this.props.bookTransport, this.props.passengers)

  }


  render (){
      const {flight} = this.props;
      return(
        <div>
          <AppNavBar/>
              <div className="book-transport-containers">
                <BookTransportComponent flight ={flight}/>
                <Container className="ContainerForm book-transport-passenger-box">
                  <AvForm onValidSubmit={ (e) => this.handleValidSubmit(e) }>
                    <BookTransportPassengerComponent/>
                    <div className="center-button">
                      {
                        !this.props.isSuccessfullBooking ? (
                            <Button>Next</Button>
                        ) : (
                          <Link to='/payment/summary'>
                            <Button color="success">Pay</Button>
                          </Link>
                        )
                      }
                    </div>

                  </AvForm>

                </Container>
              </div>
          </div>
      );
  }
}

const mapStateToProps = (state, ownProps) =>{

  const id = ownProps.match.params.id;
  return {
    flight : state.flight.flights.find(function(element){
      return element.id == id;
    }),
    showErroMessage : state.flightBook.showErroMessage,
    isSuccessfullBooking : state.flightBook.isSuccessfullBooking
  }
}

const mapDispactchToProps = (dispatch) =>{
  return{
    bookFlight : (booktTransport, passengers) => dispatch(bookFlight(booktTransport, passengers))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (BookTransport);
