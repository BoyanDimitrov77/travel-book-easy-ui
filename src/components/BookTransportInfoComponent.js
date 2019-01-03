import React, { Component } from 'react';
import { Container, Badge, Input } from 'reactstrap';
import Avatar from 'react-avatar';
import img from './512.png';
import { resetPassengers, addNewPassenger, setBookTrasnportParameter } from '../store/actions/flightActions'
import { connect } from 'react-redux'

class BookTransportInfoComponent extends Component{

  componentDidMount(){
    this.props.setBookTrasnportParameter(this.props.flight.id, this.props.flight.price, this.props.flight.travelClasses[0].id);
  }

  handleChange = async (event) => {
     const { target } = event;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const { name } = target;

     if(name.localeCompare("selectTravelClassId") ==0){
       const travelClassId = value;
       this.onChangePrice(travelClassId)
     }

    if(name.localeCompare("numberOfTicket") == 0){
        const numberOfTicket  = value;
        this.onChangePassenger(numberOfTicket);
        this.onChangePrice(this.props.bookTransport.travelClassId);
     }
  }

  onChangePassenger = (numberOfTicket) =>{
    this.props.resetPassengers();
    for(var i=0; i<numberOfTicket; i++){
      this.props.addNewPassenger({'passengerName':'', 'email': '', 'phoneNumber': ''});
    }
  }

  onChangePrice = (travelClassId)=>{
    this.props.setBookTrasnportParameter(this.props.flight.id, null, travelClassId);
  }

render(){
      const { flight } = this.props;
        const travelClasses = this.props.flight.travelClasses ? (
          flight.travelClasses.map(travelClass =>{
            return (
              <option key={travelClass.id} id={travelClass.id} value={travelClass.id}>{travelClass.travelClass}</option>
            )
          })

        ) : null;

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
                      <Input type="select" name="selectTravelClassId" value={this.props.bookTransport.travelClassId}
                        onChange={ (e) => {
                                this.handleChange(e);
                              } }>
                       {travelClasses}
                     </Input>

                    </h5>

                  </div>

                  <div>
                    <h5>Depart : <Badge color="secondary">{flight.departDate}</Badge></h5>
                    <h5>Arrive : <Badge color="secondary">{flight.arriveDate}</Badge></h5>
                    <h5>Price : <Badge color="secondary">$ {this.props.bookTransport.price}</Badge></h5>
                      <h5>Passenger :
                        <Input type="select" name="numberOfTicket" id="exampleSelect" onChange={ (e) => {
                                  this.handleChange(e);
                                } }>
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
}

const mapStateToProps = (state) =>{
  return {
    bookTransport : state.flight.bookTransport
  }
}

const mapDispactchToProps = (dispatch) =>{
  return{
    resetPassengers : () => dispatch(resetPassengers()),
    addNewPassenger : (passenger) => dispatch(addNewPassenger(passenger)),
    setBookTrasnportParameter : (flightId, price, travelClassId) => dispatch(setBookTrasnportParameter(flightId, price, travelClassId))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (BookTransportInfoComponent);
