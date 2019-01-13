import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { Container, Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { allUsers, enableUserAccount } from '../store/actions/adminActions';
import { resetAppWithoutUser } from '../store/actions/rootActions'
import "./UsersAdmin.css"
import { Redirect } from 'react-router-dom';

class UsersAdmin extends Component{

  componentDidMount(){
  this.props.resetAppWithoutUser();
    this.props.allUsers();
  }

  enableUser = (user,idx) => () =>{
    this.props.enableUserAccount(true,user.id);
    this.setState({
      [idx+ "-userEnable"] : true
    })
  }

  disableUser = (user, idx) => () =>{
    this.props.enableUserAccount(false,user.id);
    this.setState({
      [idx+"-userEnable"] : false
    })
  }

  render(){
    const authUser = this.props.authUser;
    const isAdmin = this.props.isAdmin;
    console.log("Home authUser:" + authUser);
    if(!authUser) return <Redirect to='/login' />
    if(!isAdmin) return <Redirect to='/' />

        const{ users } = this.props;
        console.log(users);
        let userRows = users ? (
           users.map((user, idx) =>{
            return(
            <tr key={user.id}>
              <th scope="row">{idx +1}</th>
              <td>{user.name}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.userRole.join(",")}</td>
              <td>
                <div className="button-enable-user-wrapper">
                <Button id={'enableButton' + idx} name={"btne-" + idx} color="success" disabled={this.state ? ( this.state[idx +"-userEnable"] != null ? this.state[idx +"-userEnable"] : user.enabled ): user.enabled} onClick={this.enableUser(user,idx)}>Enable</Button>
                <Button id={'disableButton' + idx} name={"btnd-" + idx} color="danger" disabled={this.state ? ( this.state[idx +"-userEnable"] != null ? !this.state[idx +"-userEnable"] : !user.enabled ) : !user.enabled} onClick={this.disableUser(user,idx)} >Disable</Button>
                </div>
              </td>
            </tr>
            )
          })
        ) : null;

    return(
      <div>
        <AppNavBar/>
        <Container className="ContainerForm">
        <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userRows}
        </tbody>
      </Table>

        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    users : state.admin.users,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin
  }
}

const mapDispactchToProps = (dispatch) =>{
  return{
    allUsers : () => dispatch(allUsers()),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser()),
    enableUserAccount : (enabled, userId) => dispatch(enableUserAccount(enabled, userId))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (UsersAdmin);
