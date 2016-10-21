// postpage comment input Component
// add packages
import React ,{Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Textarea from 'react-textarea-autosize';

// add 3-third packages
import Errors from '../../api/tool/alert.js';
import {$} from 'meteor/jquery';

// add Comments database
import { Comments } from '../../api/comments/comments-database.js';


//comments input Component
export default class CommentsInput extends Component {
  constructor() {
    super();
    this.handleComment = this.handleComment.bind(this);
  }
  // submit comment
  handleComment(e) {
  e.preventDefault();
  const  comment = this.commentInput.value.trim();
  const  postId = this.props.postId;

  if( comment == '') {
    return Errors('内容不能为空！', 'danger');
  }
    // call methods 'addComment',
    Meteor.call('addComment', postId, comment, (err, result) => {
      if(err) Errors(err.reason, 'danger');
    });

   this.commentInput.value = '';
  }
render() {
  return (
    <div className='comment-input'>
      <h3 style={{marginBottom: 20}}>请发表你的评论！</h3>
      <form onSubmit={this.handleComment}>
        <Textarea
          className = "form-control"
          ref = { (c) => this.commentInput = c}
          type = 'text'
          placeholder = '请发表你的评论...' />
        <button style = {{marginTop: 20}} type="submit" className="btn btn-primary">发表</button>
      </form>
    </div>
  )
}
};
