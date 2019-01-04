import React, { Component } from 'react';
import { AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { updatePassengerField } from '../store/actions/flightActions'

class BookTransportPassengerComponent extends Component{
  
  handleChange = async (event, idx) => {
     const { target } = event;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     this.props.updatePassengerField(target.classList[0], value, idx);
  }


  render(){
      return (
        this.props.passengers && this.props.passengers.map((val, idx)=>{
          let passengerId = `passenger-${idx}`, emailId = `email-${idx}`, phoneNumberId = `phoneNumber-${idx}`;
          return(
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
      )
  }
}

const mapStateToProps = (state) =>{
  return{
    passengers : state.flight.passengers,
    bookTransport : state.flight.bookTransport,
    isSuccessfullBooking : state.flightBook.isSuccessfullBooking
  }
}

const mapDispactchToProps = (dispatch) =>{
  return{
    updatePassengerField : (fieldName, fieldValue, passengerId) => dispatch(updatePassengerField(fieldName, fieldValue, passengerId)),
    //showErroMessage : () => dispatch(showErroMessage())
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(BookTransportPassengerComponent);
