import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './home/Home';
import Login from './login/Login';
import CreateFlight from './admin/CreateFlight';
import CreateTrain from './admin/CreateTrain';
import CreateBus from './admin/CreateBus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
      }
      //this.handleLogout = this.handleLogout.bind(this);
      this.loadCurrentUser = this.loadCurrentUser.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }

    loadCurrentUser(response) {
    this.setState({
      isLoading: true,
      isAuthenticated: true,
      currentUser: response
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogin(response) {
    console.log("You're successfully logged in.");
     this.loadCurrentUser(response);
   }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path="/login"
                   render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>

           <Route path="/admin"
              render={(props) => <Home isAdmin={true} isAuthenticated={this.state.isAuthenticated} {...props} />}></Route>

            <Route path="/CreateFlight"
               render={(props) => <CreateFlight isAdmin={true} isAuthenticated={this.state.isAuthenticated} {...props} />}></Route>

             <Route path="/createTrain"
                  render={(props) => <CreateTrain isAdmin={true} isAuthenticated={this.state.isAuthenticated} {...props} />}></Route>

                <Route path="/createBus"
                  render={(props) => <CreateBus isAdmin={true} isAuthenticated={this.state.isAuthenticated} {...props} />}></Route>


        </Switch>
      </Router>
    )
  }
}

export default App;
