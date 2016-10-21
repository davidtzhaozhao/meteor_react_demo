// add packages
import { Meteor } from 'meteor/meteor';

// add Comments database
import { Comments } from './comments-database.js';

Meteor.publish('Comments.list', (limit) => {
  const option = {
    limit: limit,
    sort: { submitted: -1 }
  };
  return Comments.find({}, option)
});
