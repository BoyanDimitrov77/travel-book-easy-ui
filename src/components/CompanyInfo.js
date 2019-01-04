import React from 'react';
import { Badge } from 'reactstrap';
import img from './512.png';
import Avatar from 'react-avatar';
import StarRatings from 'react-star-ratings';
import './CompanyInfo.css'

const CompanyInfo = (props) =>{

  return (
    <div className="company-info">
      <h1><Badge color="secondary"> {props.company.name} </Badge></h1>
      <Avatar size="150" src={img} round={true} />
      <Badge color="warning">Rating {props.company.rating ? props.company.rating : 0} </Badge>
      <StarRatings
        rating={props.company.rating ? props.company.rating : 0 }
        starRatedColor='rgb(255, 193, 7)'
        changeRating={!props.company.isCurrentUserVoted ? props.changeRating : null}
        numberOfStars={5}
        starDimension= "30px"
        isSelectable={!props.company.isCurrentUserVoted}
        isAggregateRating={true}
        name='rating'
      />
    </div>
  )
}

export default CompanyInfo
