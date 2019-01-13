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
import ImageComponent from '../components/ImageComponent'
import { connect } from 'react-redux';
import { resetApp } from '../store/actions/rootActions';

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

  let navLogInLink;
  let navLogOutLink;
  let navSignUpLink;

  if(!authUser){
      navLogInLink = <NavLink href="/login/">Login</NavLink>;
      navSignUpLink = <NavLink href="/signup">SignUp</NavLink>;
  }else{
    navLogOutLink = <NavLink onClick={this.props.signOut}>Log Out</NavLink>;
  }


  let profileLink;

  if(authUser){
     const profilePicture = this.props.profilePicture ? (
       <ImageComponent imageUrl={this.props.profilePicture} isProfile={true}/>
       ) : null;

    profileLink = <NavLink href="/userProfile/"> {profilePicture}</NavLink>;
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
    flightsLink = <NavbarBrand href="/flights/">Flights</NavbarBrand>
    busesLink = <NavbarBrand href="/buses/">Buses</NavbarBrand>
    trainsLink = <NavbarBrand href="/trains/">Trains</NavbarBrand>
  }

let flightsAdminLink;
let usersAdminLink;
  if(isAdmin && authUser){
    flightsAdminLink = <NavbarBrand href="/admin/flights/">Flights</NavbarBrand>
    usersAdminLink = <NavbarBrand href="/admin/users/">Users</NavbarBrand>
  }

  return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Travel Bool Easy </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />

                      {flightsLink}
                      {busesLink}
                      {trainsLink}

                      {usersAdminLink}
                      {flightsAdminLink}

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>

                <NavItem>
                    {navLogInLink}
                </NavItem>
                <NavItem>
                    {navSignUpLink}
                </NavItem>
                <NavItem>
                    {profileLink}
                </NavItem>
                {uncontrolledDropdown}
                {navLogOutLink}
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
    profilePicture : state.auth.user ? (state.auth.user.profilePicture ? state.auth.user.profilePicture.thumbnailPicture.value : null) : null,
    isAdmin : state.auth.isAdmin
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    signOut : () => dispatch(resetApp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AppNavBar);
