/** This is posts methods files
* add packages
*/
import { Meteor } from 'meteor/meteor';

// add posts database
import { Posts } from './posts-database.js';

// define posts production methods
Meteor.methods({

  //  post like methods, use addToSet just update one time
  'Posts.updateLike'(postId, userId) {
    check(postId, String);
    check(userId, String);

    Posts.update({ _id: postId }, {$addToSet: { likeUser: userId}} );
  },

  //  post delete like methods.
  'Posts.pullLike'(postId, userId) {
    check(postId, String);
    check(userId, String);

    Posts.update({ _id: postId }, {$pull: { likeUser: userId}});
  },

  //  post save methods
  'post.save'(postId, userId) {
    check(postId, String);
    check(userId, String);

    Posts.update({ _id: postId}, {$addToSet: { saveUser: userId }});
  },

  //  delete save post methods
  'post.removeSave'(postId, userId) {
    check(postId, String);
    check(userId, String);

    Posts.update({ _id: postId}, {$pull: { saveUser: userId}});
  }
});

// Get list of all method names on posts
const POSTS_METHODS = [
  'Posts.updateLike',
  'Posts.pullLike',
  'post.save',
  'post.removeSave'
];

//  add ddp prevent hack
if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(POSTS_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
