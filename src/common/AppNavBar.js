import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';

class AppNavBar extends Component{

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
render(){
  const authUser = this.props.authUser;
  const isAdmin = this.props.isAdmin;
  console.log("isAdmin:" + isAdmin);
  console.log("authUser" + authUser);

  let navLoginLink;

  if(!authUser){
      navLoginLink = <NavLink href="/login/">Login</NavLink>;
  }

  let profileLink;

  if(authUser){
    profileLink = <NavLink href="/userProfile/">Profile</NavLink>;
  }

  let uncontrolledDropdown;
  if(isAdmin){
    uncontrolledDropdown = <UncontrolledDropdown nav inNavbar disabled>
                                <DropdownToggle nav caret>
                                  Create
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <DropdownItem>
                                    <NavLink href="/createFlight/">Flight</NavLink>
                                  </DropdownItem>
                                  <DropdownItem>
                                  <NavLink href="/createTrain/">Train</NavLink>
                                  </DropdownItem>
                                  <DropdownItem>
                                  <NavLink href="/createBus/">Bus</NavLink>
                                  </DropdownItem>
                                  <DropdownItem>
                                  <NavLink href="/createCompany/">Company</NavLink>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>;

  }

  let flightsLink;
  let busesLink;
  let trainsLink;
  if(!isAdmin && authUser){
    flightsLink = <NavLink href="/flights/">Flights</NavLink>
    busesLink = <NavLink href="/buses/">Buses</NavLink>
    trainsLink = <NavLink href="/trains/">Trains</NavLink>
  }

  return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Travel Bool Easy</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                    {flightsLink}
                </NavItem>
                <NavItem>
                    {busesLink}
                </NavItem>
                <NavItem>
                    {trainsLink}
                </NavItem>
                <NavItem>
                    {navLoginLink}
                </NavItem>
                <NavItem>
                    {profileLink}
                </NavItem>
                {uncontrolledDropdown}
              </Nav>
            </Collapse>
          </Navbar>
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

export default connect(mapStateToProps) (AppNavBar);
