import React, { Component } from 'react';
import {Container, Alert } from 'reactstrap';
import AppNavBar from '../common/AppNavBar';
import './CompanyComponent.css'
import CommentInput from './CommentInput'
import CommentsList from './CommentsList'
import CompanyInfo from './CompanyInfo'
import { connect } from 'react-redux'

class CompanyComponent extends Component{
  render(){
    return(
          <div>
            <AppNavBar/>
              {
                this.props.company.showErrorMessage ? (
                  <Container className="ContainerForm">
                    <Alert color="danger">{this.props.company.errorMessage}</Alert>
                  </Container>
                ):(
                  <Container className= "ContainerForm container-form-width">
                    <CompanyInfo companyId={this.props.companyId} />
                    <CommentInput/>
                    <CommentsList/>
                  </Container>
                )

              }
          </div>

    )
  }

}

const mapStateToProps = (state, ownProps) =>{

  const id = ownProps.match.params.id;
  return {
    companyId : id,
    company : state.companies.company
  }
}

export default connect(mapStateToProps) (CompanyComponent);
