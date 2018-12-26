import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './home/Home';
import Login from './login/Login';
import CreateFlight from './admin/CreateFlight';
import CreateTrain from './admin/CreateTrain';
import CreateBus from './admin/CreateBus';
import CreateCompany from './admin/CreateCompany';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path="/login"
                   render={(props) => <Login/>}></Route>

           <Route path="/admin"
              render={(props) => <Home isAdmin={true} isAuthenticated={this.state.isAuthenticated} {...props} />}></Route>

            <Route path="/CreateFlight"
               render={(props) => <CreateFlight/>}></Route>

             <Route path="/createTrain"
                  render={(props) => <CreateTrain />}></Route>

                <Route path="/createBus"
                  render={(props) => <CreateBus />}></Route>

                  <Route path="/createCompany"
                    render={(props) => <CreateCompany />}></Route>


        </Switch>
      </Router>
    )
  }
}

export default App;
