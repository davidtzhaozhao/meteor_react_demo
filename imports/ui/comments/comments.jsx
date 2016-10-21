// comments list in postpage
// add package
import React ,{Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

//  get comments other package
import { Comments } from '../../api/comments/comments-database.js';
import CommentsInput from './comment-input.jsx';
import CommentTask from './comments-lists';

//  get error package
import Errors from '../../api/tool/alert.js';

//main comments lists
export default class Comment extends Component {
  getComments() {
    const option = {
      limit: 5,
      sort: { submitted: -1 }
    };
  const comments = Comments.find({}, option);
  return comments.map( (comment) => {
      return <CommentTask key={comment._id} comment={comment} />
    })
  }
  getCommentsAll() {
  return this.props.comments.map( (comment) => {
      return <CommentTask key={comment._id} comment={comment} />
    })
  }
render() {
  const { postId, comments, commentExists, currentUser } = this.props;
  const link = FlowRouter.path('User.login');
  let commentsExist = !comments || !comments.length;
  return (
    <div style={{marginTop: 30}}>
      <h2 style={{marginBottom: 20}} >热门评论：</h2>
      {commentsExist
        ? (<span>尚无评论！</span>)
        : this.getComments()
      }
      { currentUser ? (<a href='#comment'>链接到评论页面！</a>)
        : (<a href={link}>请登录发表评论!</a>)
      }
      <div id='comment'>
        <ul>
          <a href="#">
            <span className="glyphicon glyphicon-remove-circle"></span>
          </a>
          <a href="#"></a>
          <a href="#"></a>
            <CommentsInput postId={postId} />
              { this.getCommentsAll() }
        </ul>
      </div>
    </div>
  )
}
}
