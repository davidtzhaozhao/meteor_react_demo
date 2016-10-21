//  post page container
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//  3-third pacakge
import { Posts } from '../../api/posts/posts-database.js';
import { Comments } from '../../api/comments/comments-database.js';
import { Votes } from '../../api/votes/votes-database.js';
import PostPage from '../posts/postpage/post-page.jsx';

//  define page container
export default createContainer( (props) => {
  const { _id } = props;
  const postHandle = Meteor.subscribe('Posts.page', _id);
  const loading = !postHandle.ready();
  const post = Posts.findOne(_id);
  const postExists = !loading && !!post;
  const option = { sort: { submitted: -1 } };
  return {
    loading,
    post,
    postExists,
    currentUser: Meteor.user(),
    comments: postExists ? Comments.find({post: _id}, option).fetch() : [],
    votes: postExists ? Votes.findOne({post: _id}) : {}
  };
}, PostPage);
