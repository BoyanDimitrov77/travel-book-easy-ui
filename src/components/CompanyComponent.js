import React, { Component } from 'react';
import {Container, Alert } from 'reactstrap';
import AppNavBar from '../common/AppNavBar';
import './CompanyComponent.css'
import { getCompany, userRatingCompany } from '../store/actions/companyActions';
import CommentInput from './CommentInput'
import CommentsList from './CommentsList'
import CompanyInfo from './CompanyInfo'
import { connect } from 'react-redux'

class CompanyComponent extends Component{

  componentDidMount(){
    this.props.getCompany(this.props.companyId);
  }

  changeRating = ( newRating, name ) => {

    console.log(newRating);
    this.props.userRatingCompany(this.props.company.id,newRating)
      }


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
                    <CompanyInfo company={this.props.company} changeRating={this.changeRating}/>
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

const mapDispactchToProps = (dispatch) =>{
  return {
      getCompany : (companyId) => dispatch(getCompany(companyId)),
      userRatingCompany : (companyId, rating) => dispatch(userRatingCompany(companyId, rating))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (CompanyComponent);
