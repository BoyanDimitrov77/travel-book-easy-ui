import React, { Component } from 'react';
import AppNavBar from '../common/AppNavBar';
import { connect } from 'react-redux'
import { getAllCompany } from '../store/actions/companyActions'
import { resetAppWithoutUser } from '../store/actions/rootActions';
import CompanyElement from './CompanyElement'
import { Table, Container } from 'reactstrap'

class CompaniesAdmin extends Component{

  componentDidMount(){
    this.props.resetAppWithoutUser();
    this.props.getAllCompany();
  }

  render(){

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
    companies : state.companies.companies
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
    getAllCompany : () => dispatch(getAllCompany()),
    resetAppWithoutUser : () => dispatch(resetAppWithoutUser())
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (CompaniesAdmin);
