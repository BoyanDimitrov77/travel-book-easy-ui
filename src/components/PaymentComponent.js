import React, { Component } from 'react';
import { connect } from 'react-redux'
import { clientToken } from '../store/actions/clientTokenActions'


class PaymentComponent extends Component{

   componentDidMount(){
       this.props.clientToken();
   }

  render(){

      console.log(this.props.clientTokenData);
    return(
      <div></div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    clientTokenData : state.clientToken.clientToken
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    clientToken : () => dispatch(clientToken())
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(PaymentComponent);
