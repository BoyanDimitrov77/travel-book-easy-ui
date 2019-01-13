import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { connect } from 'react-redux'
import { getAllCompany } from '../store/actions/companyActions'
import { resetAppWithoutUser } from '../store/actions/rootActions';
import CompanyElement from './CompanyElement'
import { Table, Container } from 'reactstrap'
import { Redirect } from 'react-router-dom';

class CompaniesAdmin extends Component{

  componentDidMount(){
    this.props.resetAppWithoutUser();
    this.props.getAllCompany();
  }

  render(){

    const authUser = this.props.authUser;
    const isAdmin = this.props.isAdmin;
    console.log("Home authUser:" + authUser);
    if(!authUser) return <Redirect to='/login' />
    if(!isAdmin) return <Redirect to='/' />

    const { companies } = this.props;

    const companyElements = companies.length ? (
      companies.map((company, idx)=>{
        return(
          <CompanyElement company={company} idx={idx} key={company.id}/>
        )
      })
    ) : null ;

    return(
      <div>
        <AppNavBar/>
          <Container className="ContainerForm">
            <div>
              <h2>Companies</h2>
                <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyElements}
                      </tbody>
                </Table>
            </div>
          </Container>
      </div>

    )
  }
}

const mapStateToProps = (state) =>{
  return {
    companies : state.companies.companies,
    authUser : state.auth.user,
    isAdmin : state.auth.isAdmin
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    getAllCompany : () => dispatch(getAllCompany()),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (CompaniesAdmin);
