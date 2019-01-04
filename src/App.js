import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './home/Home';
import SignIn from './login/SignIn';
import CreateFlight from './admin/CreateFlight';
import CreateTrain from './admin/CreateTrain';
import CreateBus from './admin/CreateBus';
import CreateCompany from './admin/CreateCompany';
import Flights from './components/Flights'
import BookTransport from './components/BookTransport'
import PaymentComponent from './components/PaymentComponent'
import BookTransportInfoComponent from './components/BookTransportInfoComponent'
import CompanyComponent from './components/CompanyComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path="/login"
                   render={(props) => <SignIn/>}></Route>

            <Route path="/CreateFlight"
               render={(props) => <CreateFlight/>}></Route>

             <Route path="/createTrain"
                  render={(props) => <CreateTrain />}></Route>

                <Route path="/createBus"
                  render={(props) => <CreateBus />}></Route>

                  <Route path="/createCompany"
                    render={(props) => <CreateCompany />}></Route>

                  <Route path="/flights"
                      render={(props) => <Flights />}></Route>

                    <Route path="/bookTransport/:id" component={BookTransport} />

                    <Route path="/payment/summary" component={BookTransportInfoComponent} />

                    <Route path="/payment" component={PaymentComponent} />

                    <Route path="/company/:id" component={CompanyComponent} />


        </Switch>
      </Router>
    )
  }
}

export default App;
