//  notification methods
// add packages
import { Meteor } from 'meteor/meteor';

// add Comments and notification database
import { Comments } from '../comments/comments-database.js';
import { Notifications } from './notification-database.js';

//  notification methods
Meteor.methods({
  'notifications.creat'(text, commentId) {
    const user = Meteor.user();
    check(text, String);
    check(commentId, String);
    check(user,Object);

    const comment = Comments.findOne(commentId);
    const { post } = comment;
    const { _id } = comment.user;

    check(post, String);
    check(_id, String);

    const notifiction = {
      postId: post,
      userId: _id,
      text: text,
      user: {
        _id: user._id,
        avatar: user.profile.avatar,
        name: user.username
      },
      submitted: new Date()
    }
    if(_id !== user._id) {
      Notifications.insert(notifiction);
    }
  },
  'notification.remove'(id) {
    check(id, String);
    Notifications.remove(id);
  }
})
