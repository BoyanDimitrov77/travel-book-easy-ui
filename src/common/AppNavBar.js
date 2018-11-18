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
  const isAdmin = this.props.isAdmin;
  const isAuthenticated = this.props.isAuthenticated;
  let navLoginLink;

  if(!isAdmin && !isAuthenticated){
      navLoginLink = <NavLink href="/login/">Login</NavLink>;
  }

  let profileLink;

  if(isAuthenticated){
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

  return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Travel Bool Easy</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
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

export default AppNavBar;
