import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

class Home extends Component{
  render() {
      const authUser = this.props.authUser;
      console.log("Home authUser:" + authUser);
      if(!authUser) return <Redirect to='/login' />
      return (
        <div>
              <AppNavBar/>
              <Container fluid>
                  <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
              </Container>
        </div>
      );
    }

}
const mapStateToProps = (state) =>{
  return {
      authUser : state.auth.user
  }
}
export default connect(mapStateToProps) (Home);
