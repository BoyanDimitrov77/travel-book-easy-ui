import React from 'react';
import './CommentsList.css'
import { connect } from 'react-redux'
import ImageComponent from './ImageComponent'

const CommentsList = (props) =>{

  return(
      <div className="wrap-box-comments">
      {
        props.companyComments && props.companyComments.map(comment=>{
            console.log(comment.creator.profilePicture);
          return (
                <div className="comment-box" key={comment.id}>
                  <ImageComponent imageUrl={comment.creator.profilePicture ? comment.creator.profilePicture.thumbnailPicture.value : null}/>
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
