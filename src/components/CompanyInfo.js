import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import './CompanyInfo.css'
import ImageComponent from './ImageComponent'
import { getCompany, userRatingCompany } from '../store/actions/companyActions';
import { connect } from 'react-redux'

class CompanyInfo extends Component {

  componentDidMount(){
    this.props.getCompany(this.props.companyId);
  }

  changeRating = ( newRating, name ) => {

    console.log(newRating);
    this.props.userRatingCompany(this.props.company.id,newRating)
      }

render(){
  const companyLogo = this.props.company.companyLogo ? (
    <ImageComponent imageUrl={this.props.company.companyLogo.thumbnailPicture.value}/>
  ) : null;

  return (
    <div className="company-info">
      <h1><Badge color="secondary"> {this.props.company.name} </Badge></h1>
      {companyLogo}
      <Badge color="warning">Rating {this.props.company.rating ? this.props.company.rating : 0} </Badge>
      <StarRatings
        rating={this.props.company.rating ? this.props.company.rating : 0 }
        starRatedColor='rgb(255, 193, 7)'
        changeRating={!this.props.company.isCurrentUserVoted ? this.changeRating : null}
        numberOfStars={5}
        starDimension= "30px"
        isSelectable={!this.props.company.isCurrentUserVoted}
        isAggregateRating={true}
        name='rating'
      />
    </div>
  )
  }
}

const mapStateToProps = (state) =>{
  return {
    company : state.companies.company,
  }
}

const mapDispactchToProps = (dispatch) =>{
  return {
      getCompany : (companyId) => dispatch(getCompany(companyId)),
      userRatingCompany : (companyId, rating) => dispatch(userRatingCompany(companyId, rating))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (CompanyInfo);
