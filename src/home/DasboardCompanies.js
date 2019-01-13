import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';
import { getAllCompanies } from '../store/actions/homeActions'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'

class DasboardCompanies extends Component{
  componentDidMount(){
    this.props.getAllCompanies();
  }
  render(){

     const companyRows = this.props.companies.length ? (
          this.props.companies.map((company, idx) =>{
            return (
              <tr key={company.id}>
                <th scope="row">{idx +1}</th>
                <Link to={'/company/' + company.id}>
                  <td>{company.name}</td>
                </Link>
                <td>
                <StarRatings
                  rating={company.rating ? company.rating : 0 }
                  starRatedColor='rgb(255, 193, 7)'
                  numberOfStars={5}
                  starDimension= "30px"
                  isSelectable={false}
                  isAggregateRating={true}
                  name='rating'
                />
                </td>
              </tr>
            )
          })


     ) : null

    return(
      <div>
      <h2>Companies</h2>
      <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {companyRows}
      </tbody>
    </Table>

      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    companies : state.home.companies
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getAllCompanies : () => dispatch(getAllCompanies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)  (DasboardCompanies);
