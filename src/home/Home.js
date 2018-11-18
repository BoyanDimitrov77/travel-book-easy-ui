import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component{
  render() {
      return (
        <div>
              <AppNavBar isAdmin={this.props.isAdmin} isAuthenticated={this.props.isAuthenticated}/>
              <Container fluid>
                  <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
              </Container>
        </div>
      );
    }

}
export default Home;
