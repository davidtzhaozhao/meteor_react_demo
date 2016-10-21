// This is comment methods files
// add packages
import { Meteor } from 'meteor/meteor';

// add Comments database
import {Comments} from './comments-database.js';

// comment methods function
Meteor.methods({
  'addComment'(postId, text) {
    const user = Meteor.user();

    check(user, Object);
    check(postId, String);
    check(text, String);

    if (!text) {
      throw new Meteor.Error(400, '评论内容不能为空！');
    }

// Strip tags
// prevent DDos attach
    text = text.replace(/(<([^>]+)>)/ig, '');

// return comment insert method
    return Comments.insert({
      post: postId,
      user: {
        _id: user._id,
        name: user.username,
        avatar: user.profile.avatar || Meteor.absoluteUrl("assets/img/avatar.png")
      },
      text: text
    });
  },
  'Comments.updateLike'(commentId, userId) {
    check(commentId, String);
    check(userId, String);

    Comments.update({ _id: commentId }, {$addToSet: { likeUser: userId}} );
  },
  'Comments.pullLike'(commentId, userId) {
    check(commentId, String);
    check(userId, String);

    Comments.update({ _id: commentId }, {$pull: { likeUser: userId}});
  },

  //  after user change avatar
  'comment.updateImg'(imgUrl) {
    const userId = Meteor.userId();
    const option = { multi: true};
    check(imgUrl, String);
    check(userId, String);
    const query = {reply: {$elemMatch: {'replyUser._id': userId}}};

    //  get all comments which have userid in reply
    const comments = Comments.find(query, {fields: {reply: 1}});

    //  each comment reply change avatar
    comments.forEach(function(doc) {

    let update = { $set: {} };
    for (let i = 0; i < doc.reply.length; ++i) {
        if(doc.reply[i].replyUser._id === userId)
        update.$set[`reply.${i}.replyUser.avatar`] = imgUrl;
     }
        Comments.update({_id:doc._id, 'reply.replyUser._id': userId}, update)

    });

//  change avatar comment
    Comments.update({ 'user._id': userId}, { $set: { 'user.avatar': imgUrl}}, option);



    //Comments.update({reply: {$elemMatch: {'replyUser._id': userId}}}, {$set: {'reply.$.replyUser.avatar': imgUrl}}, option)
  },
  'comment.updateReply'(text, commentId) {
    const user = Meteor.user();
    const replyUser = {
      _id: user._id,
      avatar: user.profile.avatar,
      name: user.username
    };
    const submitted = new Date();
    check(text, String);
    check(user, Object);
    check(commentId, String);
    const reply = { replyUser, text, submitted };
    Comments.update({_id: commentId}, { $push: { reply: reply}})
  }
});

// Get list of all method names on Comments
const COMMENTS_METHODS = [
  'addComment',
  'Comments.updateLike',
  'Comments.pullLike',
  'comment.updateImg',
  'comment.updateReply'
];

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(COMMENTS_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
};
