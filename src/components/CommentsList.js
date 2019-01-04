import React from 'react';
import img from './user.png';
import Avatar from 'react-avatar';
import './CommentsList.css'
import { connect } from 'react-redux'

const CommentsList = (props) =>{
  return(
      <div className="wrap-box-comments">
      {
        props.companyComments && props.companyComments.map(comment=>{
          return (
                <div className="comment-box" key={comment.id}>
                    <Avatar size="50" src={img} round={true} />
                    <div className="user-comment">
                      <h5>{comment.creator.fullName}</h5>
                      {comment.comment}
                  </div>
                </div>
          )
        })
      }
      </div>
    )

}

const mapStateToProps = (state) =>{
  return {
    companyComments : state.companies.company.comments
  }
}

export default connect(mapStateToProps) (CommentsList);
