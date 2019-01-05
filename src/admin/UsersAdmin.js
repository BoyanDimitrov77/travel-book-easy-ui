import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { Container, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { allUsers } from '../store/actions/adminActions';
import { resetAppWithoutUser } from '../store/actions/rootActions'

class UsersAdmin extends Component{

  componentDidMount(){
  this.props.resetAppWithoutUser();
    this.props.allUsers();
  }

  render(){

        const{ users } = this.props;
        console.log(users);
        const userRows = users ? (
           users.map((user, idx) =>{
            return(
            <tr key={user.id}>
              <th scope="row">{idx +1}</th>
              <td>{user.name}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.userRole.join(",")}</td>
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
    users : state.admin.users
  }
}

const mapDispactchToProps = (dispatch) =>{
  return{
    allUsers : () => dispatch(allUsers()),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (UsersAdmin);
