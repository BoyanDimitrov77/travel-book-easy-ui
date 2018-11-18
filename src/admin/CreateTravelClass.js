import React, { Component } from 'react';
import {AvField } from 'availity-reactstrap-validation';
import {Button} from 'reactstrap';
import './TravelClass.css';

class CreateTravelClass extends Component{

      render(){
            return (
            this.props.travelClasses.map((val, idx)=> {
              let travelClassId = `travelClass-${idx}`, maxSeatsId = `maxSeats-${idx}`, priceId = `price-${idx}`
              return (
                <div key={idx} className="travelClassContainer">
                  <AvField className="travelClass" name={travelClassId} id={travelClassId} data-id={idx} value ={this.props.travelClasses[idx].name} label={`Travel Class #${idx + 1}`} type="text" errorMessage="Invalid Travel Class Name" validate={{
                      required: {value: true},
                      pattern: {value: '^[A-Za-z]+$'}
                    }}
                    onChange={ (e) => {
                                this.props.handleChange(e)
                              } }/>

                    <AvField  className= "maxSeats" name={maxSeatsId} id={maxSeatsId} data-id={idx} value={this.props.travelClasses[idx].maxSeats} label= "Max seats" type="text" errorMessage="Invalid maxseats" validate={{
                        required: {value: true},
                        pattern: {value: '^[0-9]+$'}
                      }}
                       onChange={ (e) => {
                                    this.props.handleChange(e)
                                  } }/>

                      <AvField  className="price" name={priceId} id={priceId} data-id={idx} value={this.props.travelClasses[idx].price} label="Price" type="text" errorMessage="Invalid price" validate={{
                          required: {value: true},
                          pattern: {value: '^[0-9]+$'}
                        }}
                         onChange={ (e) => {
                                      this.props.handleChange(e)
                                    } }/>

                        {
                          idx !== 0 ?(
                              <Button className="removeButton" color="danger" onClick={this.props.removeTravelClass(idx)}>Delete</Button>
                          ): null
                        }

                </div>
              )
            })
          )
      }
}


export default CreateTravelClass;
