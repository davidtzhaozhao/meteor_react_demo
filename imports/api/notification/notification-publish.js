//  notification publish

// add packages
import { Meteor } from 'meteor/meteor';

// add notification database
import { Notifications } from './notification-database.js';

Meteor.publish('Notifications.list', function(limit) {
  if (!this.userId) {
    return this.stop();
  }

  check(this.userId, String);
  const option = {
    limit: limit || 20,
    sort: { submitted: -1 }
  };
  return Notifications.find({userId: this.userId}, option)
});
