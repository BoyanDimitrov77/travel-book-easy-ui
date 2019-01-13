import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap'
import { resetAppWithoutUser } from '../store/actions/rootActions';
import './Home.css'
import DashboardBookings from './DashboardBookings'
import DasboardCompanies from './DasboardCompanies'

class Home extends Component{

  componentDidMount(){
    if(this.props.authUser){
      this.props.resetAppWithoutUser();
    }
  }

  render() {
      const authUser = this.props.authUser;
      const isAdmin = this.props.isAdmin;
      console.log("Home authUser:" + authUser);
      if(!authUser) return <Redirect to='/login' />
      if(isAdmin) return <Redirect to='/admin/users' />
      return (
        <div>
              <AppNavBar/>
              <div className="home-container">
                <Container className="ContainerForm wrapper-container">
                  <DashboardBookings/>
                </Container>

                <Container className="ContainerForm wrapper-container">
                  <DasboardCompanies/>
                </Container>

              </div>
        </div>
      );
    }

}
const mapStateToProps = (state) =>{
  return {
      authUser : state.auth.user,
      isAdmin : state.auth.isAdmin
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Home);
