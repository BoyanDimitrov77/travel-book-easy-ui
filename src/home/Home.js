import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { resetAppWithoutUser } from '../store/actions/rootActions';
import { Container } from 'reactstrap'

class Home extends Component{

  componentDidMount(){
    if(this.props.authUser){
      this.props.resetAppWithoutUser();
    }
  }

  render() {
      const authUser = this.props.authUser;
      console.log("Home authUser:" + authUser);
      if(!authUser) return <Redirect to='/login' />
      return (
        <div>
              <AppNavBar/>
        </div>
      );
    }

}
const mapStateToProps = (state) =>{
  return {
      authUser : state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Home);
