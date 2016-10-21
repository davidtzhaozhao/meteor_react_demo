// like Component
import React , { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

//  add 3-third package
import Errors from '../../api/tool/alert.js';

//  define Like Component
export default class Like extends Component {
  constructor() {
    super();
    this.handleLike = this.handleLike.bind(this);
  }

  //  define add like and cancle like function
  handleLike(e) {
    e.preventDefault();
    const { commentId, likeCounts, likeUser } = this.props;

    let  likeExist = !!likeUser;
    const currentUserId = Meteor.userId();

//  if no login ,error display
    if(!currentUserId){
      Errors('you should login in!', 'danger');
    };

    if(likeExist) {
      //  judge if this user has voted for this comment
      const userIndex = likeUser.indexOf(currentUserId);

    if( userIndex > -1 ) {
      Meteor.call('Comments.pullLike', commentId, currentUserId);
    } else {
         Meteor.call('Comments.updateLike', commentId, currentUserId);
     } // end of index judge
   } else {
     //  if user not exist ,add vote to likeuser
         Meteor.call('Comments.updateLike', commentId, currentUserId, (err,result) => {
           if(err)
           Errors(err.reason, 'danger');})
   } // end of likeExist
  }
  render() {
    const { likeCounts } = this.props;
    const text = `有${likeCounts}人赞此文`;
    return (
      <span title={text} className='post-like'>
        <span
          className="glyphicon glyphicon-thumbs-up"
          onClick={this.handleLike}>
        </span>
          &nbsp;&nbsp;{likeCounts}
      </span>
    )
  }
  };

Like.propTypes ={
  likeCounts: React.PropTypes.number,
  commentId: React.PropTypes.string,
  likeUser: React.PropTypes.array
};
