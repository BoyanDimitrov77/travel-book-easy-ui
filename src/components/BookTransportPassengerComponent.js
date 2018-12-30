import React from 'react';
import {Container } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

const BookTransportPassengerComponent = () =>{

  return (
    <Container className="ContainerForm book-transport-passenger-box">

      <div>
        <AvForm>
          <div className="passenger-container">
            <AvField className="travelClass" name="{travelClassId}" id="{travelClassId}" data-id="{idx}" value ="" label="Name passenger" type="text" errorMessage="Invalid Passenger Name" validate={{
                required: {value: true},
                pattern: {value: '^[A-Za-z]+$'}
              }}
              onChange={ (e) => {
                  //        this.handleChange(e, idx )
                        } }/>


          <AvField className="travelClass" name="{travelClassId}" id="{travelClassId}" data-id="{idx}" value ="" label="Email" type="text" errorMessage="Invalid Email" validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z]+$'}
            }}
            onChange={ (e) => {
                //        this.handleChange(e, idx )
                      } }/>

                    <AvField className="travelClass" name="{travelClassId}" id="{travelClassId}" data-id="{idx}" value ="" label="Phone number" type="text" errorMessage="Invalid Phone number" validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z]+$'}
            }}
            onChange={ (e) => {
                //        this.handleChange(e, idx )
                      } }/>

          </div>
      </AvForm>

      </div>
    </Container>

  )


}

export default BookTransportPassengerComponent;
