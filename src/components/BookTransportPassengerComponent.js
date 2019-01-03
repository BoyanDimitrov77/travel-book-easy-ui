import React, { Component } from 'react';
import {Container, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { bookFlight } from '../store/actions/flightBookActions'
import { updatePassengerField } from '../store/actions/flightActions'

class BookTransportPassengerComponent extends Component{

  handleChange = async (event, idx) => {
     const { target } = event;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     this.props.updatePassengerField(target.classList[0], value, idx);
  }

  handleValidSubmit(e) {
    e.persist();
    console.log(this.props.bookTransport, this.props.passengers);
    this.props.bookFlight(this.props.bookTransport, this.props.passengers)

  }
  render(){
    const passengerComponent = this.props.passengers.map((val, idx)=>{
      let passengerId = `passenger-${idx}`, emailId = `email-${idx}`, phoneNumberId = `phoneNumber-${idx}`;
      return (
        <div key={idx} className="passenger-container">
          <AvField className="passengerName" name={passengerId} id={passengerId} data-id={idx} value ={this.props.passengers[idx].name} label={`Passenger #${idx + 1}`} type="text" errorMessage="Invalid Passenger Name" validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z]+$'}
            }}
            onChange={ (e) => {
                        this.handleChange(e, idx )
                      } }/>

                    <AvField  className= "email" name={emailId} id={emailId} data-id={idx} value={this.props.passengers[idx].email} label= "Email" type="email" errorMessage="Invalid email" required
               onChange={ (e) => {
                            this.handleChange(e, idx)
                          } }/>

                        <AvField  className="phoneNumber" name={phoneNumberId} id={phoneNumberId} data-id={idx} value={this.props.passengers[idx].phoneNumber} label="Phonen number" type="text" errorMessage="Invalid phone number" validate={{
                  required: {value: true},
                  pattern: {value: '^[0-9]+$'}
                }}
                 onChange={ (e) => {
                              this.handleChange(e, idx)
                            } }/>
        </div>
      )

    })

    return (
      <Container className="ContainerForm book-transport-passenger-box">

        <div>
          <AvForm onValidSubmit={ (e) => this.handleValidSubmit(e) }>
              {passengerComponent}

              <Button>Submit</Button>
        </AvForm>

        </div>
      </Container>

    )

  }

}

const mapStateToProps = (state) =>{
  return{
    passengers : state.flight.passengers,
    bookTransport : state.flight.bookTransport
  }
}

const mapDispactchToProps = (dispatch) =>{
  return{
    updatePassengerField : (fieldName, fieldValue, passengerId) => dispatch(updatePassengerField(fieldName, fieldValue, passengerId)),
    bookFlight : (booktTransport, passengers) => dispatch(bookFlight(booktTransport, passengers))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (BookTransportPassengerComponent);
