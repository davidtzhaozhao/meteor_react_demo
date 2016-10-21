// like Component
import React , { Component, PropTypes } from 'react';

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
    const { postId, likeCounts, likeUser } = this.props;
    const currentUser = Meteor.user();
    let  likeExist = !!likeUser;

//  if no login ,error display
    if(!currentUser){
    return  Errors('you should login in!', 'danger');
    };

    if(likeExist) {
      //  judge if this user has voted for this post
      const userIndex = likeUser.indexOf(currentUser._id);

    if( userIndex > -1 ) {
      Meteor.call('Posts.pullLike', postId, currentUser._id);
    } else {
         Meteor.call('Posts.updateLike', postId, currentUser._id);
     } // end of index judge
   } else {
     //  if user not exist ,add vote to likeuser
         Meteor.call('Posts.updateLike', postId, currentUser._id, (err,result) => {
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
  postId: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  likeUser: React.PropTypes.array
};
