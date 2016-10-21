//  notification database
import {
  Meteor
} from 'meteor/meteor';

// create comments mongodb and export
export const Notifications = new Mongo.Collection('notifications');

//deny all client insert update and remove
Notifications.deny({
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

// notifications schema
Notifications.schema = new SimpleSchema({
  // post is postId
  postId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  text: {
    type: String,
    max: 100,
  },
  userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      denyUpdate: true,
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
  submitted: {
    type: Date
  }
  // checked: {
  //   type: Boolean,
  //   defaultValue: false,
  // },
});
Notifications.attachSchema(Notifications.schema);
