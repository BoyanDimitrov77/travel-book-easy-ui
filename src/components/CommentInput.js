import React, { Component } from 'react';
import { Input, Label, Button, FormFeedback } from 'reactstrap';
import './CommentInput.css'
import { userCommentCompany } from '../store/actions/companyActions'
import { connect } from 'react-redux'


class CommentInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      comment : '',
      isValidInput : true
    }
  }

  handleChange = async (event) => {
     const { target } = event;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const { name } = target;
     await this.setState({
       [ name ]: value,
     });
  }

  submitComment = () =>{
    const { comment } = this.state;
    if(comment.localeCompare('') !=0 ){
      this.props.userCommentCompany(this.props.companyId, comment);
      this.setState({
        comment : '',
          isValidInput : true
      })
    }else{
      this.setState({
        isValidInput : false
      });
      return;
    }

  }

  render(){
    return(
      <div className="comment-input-box">
        <Label for="commentLabel">Leave comment</Label>
        <Input type="textarea" name="comment" required id="comment" value={this.state.comment}   onChange={ (e) => {
                    this.handleChange(e)
                  } }
                  valid={this.state.isValidInput}
                  invalid={!this.state.isValidInput }/>
        <FormFeedback>
          This filed is required.
        </FormFeedback>
        <Button className="button-post-comment"  color="success" onClick={this.submitComment}>Post</Button>
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    companyId : state.companies.company.id
  }
}

const mapDispactchToProps = (dispatch) =>{
  return{
    userCommentCompany : (companyId, comment) => dispatch(userCommentCompany(companyId, comment))
  }
}

export default connect(mapStateToProps, mapDispactchToProps) (CommentInput);
