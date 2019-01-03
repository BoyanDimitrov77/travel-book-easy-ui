import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Container, Button, Alert } from 'reactstrap';
import { clientToken } from '../store/actions/clientTokenActions'
import { payFlightBooking } from '../store/actions/paymentActions'
import DropIn from "braintree-web-drop-in-react";
import './PaymentComponent.css'


class PaymentComponent extends Component{
  instance;
   async componentDidMount(){
       this.props.clientToken();
   }

   async buy() {
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        console.log("nonce:" + nonce);
        const { flightPaymentObject } = this.props;
        if(this.props.flightPaymentObject.flightBookId){
          this.props.payFlightBooking(flightPaymentObject.amount, flightPaymentObject.flightBookId, flightPaymentObject.travelClassId,nonce);
        }
        //await fetch(`server.test/purchase/${nonce}`);
    }

  render(){

    if (!this.props.clientTokenData) {
               return (

                   <div>
                     <Container className="ContainerForm">
                       <h1>Loading...</h1>
                    </Container>
                   </div>

               );
           } else {
               return (
                   <div>
                     <Container className="ContainerForm">
                       { this.props.isSuccessfullPayment ? (
                         <Alert color="success">Successfull payment. Go to <a href="/" className="alert-link">home page</a>.</Alert>
                         ): (
                        <div>
                           <DropIn
                               options={{ authorization: this.props.clientTokenData }}
                               onInstance={instance => (this.instance = instance)}
                           />
                           <div className="center-button">
                            <Button color="success" onClick={this.buy.bind(this)}>Buy</Button>
                           </div>
                         </div>
                            )
                       }
                      </Container>
                   </div>
               );
           }
       }

}

const mapStateToProps = (state) =>{
  return {
    clientTokenData : state.clientToken.clientToken,
    flightPaymentObject : {
      flightBookId : state.flightBook.flightBookId,
      amount : state.flight.bookTransport.price,
      travelClassId : state.flight.bookTransport.travelClassId
    },
    isSuccessfullPayment : state.payment.isSuccessfullPayment
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    clientToken : () => dispatch(clientToken()),
    payFlightBooking : (amount, flightBookId, travelClassId, nonceFromTheClient ) => dispatch(payFlightBooking(amount, flightBookId, travelClassId, nonceFromTheClient))
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(PaymentComponent);
