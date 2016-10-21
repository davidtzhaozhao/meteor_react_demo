// import meteor/mongo/check/schema packages
import {
  Meteor
} from 'meteor/meteor';

// import Posts database
import {Posts} from '../posts/posts-database.js';

// create comments mongodb and export
export const Comments = new Mongo.Collection('comments');

//deny all client insert update and remove
Comments.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

// Hooks to be triggered before insert comment
// automatically add submitted property
Comments.before.insert(function (userId, comment) {
  comment.submitted = Date.now();
  comment.reply = [];
});

// after comment insert ,auto add Posts commentscount property.
// @params is post: postId
Comments.after.insert(function (userId, comment) {
  Posts.update(comment.post, {
    $inc: {
      commentsCount: 1
    }
  });
});

// comments schema
// submitted not work because of Hork package
Comments.schema = new SimpleSchema({
  // post is postId
  post: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  text: {
    type: String,
    max: 100,
  },
  "user._id": {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      denyUpdate: true,
    },
  "user.name": {
      type: String
    },
  "user.avatar": {
    type: String
  },
  likeUser: {
    type: [String],
    defaultValue: []
  },
  reply: {
    type: [Object],
    optional: true
  },
  'reply.$.text': {
    type: String
  },
  'reply.$.replyUser': {
    type: Object,
    optional: true,
    blackbox: true,
  },
  // 'reply.$.replyUser.avatar': {
  //   type: String
  // },
  // 'reply.$.replyUser.name': {
  //   type: String
  // },
  'reply.$.submitted': {
    type: Date
  }
  // checked: {
  //   type: Boolean,
  //   defaultValue: false,
  // },
});
Comments.attachSchema(Comments.schema);
