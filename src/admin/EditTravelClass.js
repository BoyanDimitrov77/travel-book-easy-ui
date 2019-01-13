import React, { Component } from 'react';
import {AvField } from 'availity-reactstrap-validation';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import { removeTraveClass, updateTravelClassField } from '../store/actions/traveClassActions'
import './TravelClass.css';

class EditTravelClass extends Component{

  handleChange = async (event, idx) => {
     const { target } = event;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     this.props.updateTravelClassField(target.classList[0], value, idx);
  }

  removeTravelClass = (idx) => () => {
    this.props.removeTravelClass(idx);
}

      render(){
        console.log(this.props)
            return (
            this.props.travelClasses.map((val, idx)=> {
              let travelClassId = `travelClass-${idx}`, maxSeatsId = `maxSeats-${idx}`, priceId = `price-${idx}`
              return (
                <div key={idx} className="travelClassContainer">
                  <AvField className="travelClass" name={travelClassId} id={travelClassId} data-id={idx} value ={this.props.travelClasses[idx].travelClass} label={`Travel Class #${idx + 1}`} type="text" errorMessage="Invalid Travel Class Name" validate={{
                      required: {value: true},
                      pattern: {value: '^[A-Za-z]+$'}
                    }}
                    onChange={ (e) => {
                                this.handleChange(e, idx )
                              } }/>

                    <AvField  className= "maxSeats" name={maxSeatsId} id={maxSeatsId} data-id={idx} value={this.props.travelClasses[idx].maxSeats} label= "Max seats" type="text" errorMessage="Invalid maxseats" validate={{
                        required: {value: true},
                        pattern: {value: '^[0-9]+$'}
                      }}
                       onChange={ (e) => {
                                    this.handleChange(e, idx)
                                  } }/>

                      <AvField  className="price" name={priceId} id={priceId} data-id={idx} value={this.props.travelClasses[idx].price} label="Price" type="text" errorMessage="Invalid price" validate={{
                          required: {value: true},
                          pattern: {value: '^[0-9]+$'}
                        }}
                         onChange={ (e) => {
                                      this.handleChange(e, idx)
                                    } }/>

                        {
                          idx !== 0 ?(
                              <Button className="removeButton" color="danger" onClick={this.removeTravelClass(idx)}>Delete</Button>
                          ): null
                        }

                </div>
              )
            })
          )
      }
}

const mapStateToProps = (state) =>{
  console.log(state);
  return{
      travelClasses : state.travelClasses.travelClasses
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    removeTravelClass : (travelClassId) =>dispatch(removeTraveClass(travelClassId)),
    updateTravelClassField : (fieldName, fieldValue, travelClassId) => dispatch(updateTravelClassField(fieldName, fieldValue, travelClassId))
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(EditTravelClass);
