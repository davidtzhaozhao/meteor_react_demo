//  posts lists container
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts/posts-database.js';
import App from '../posts/post-lists.jsx';

export default createContainer(() => {
  const subPosts = Meteor.subscribe('Posts.lists', Session.get('postLimit'));
  const topPosts = Meteor.subscribe('Posts.tops');
  const option = { sort: { submitted: -1}}
  return {
    user: Meteor.user(),
    loading: !topPosts.ready() && !subPosts.ready(),
    posts:Posts.find({subTag:{$ne:'头条'}}, option).fetch(),
    tops: Posts.find({subTag: '头条'}, option).fetch()
  };
}, App);
