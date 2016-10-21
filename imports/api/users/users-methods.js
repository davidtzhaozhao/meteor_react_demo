// User need packages
import { Meteor } from 'meteor/meteor';

// Don't let people write arbitrary data to their 'profile' field from the client
Meteor.users.deny({
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

Meteor.methods({
  // when change avatar ,update use profile
'Users.upload'(imageUrl) {
  check(imageUrl, String);
  Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": imageUrl}});
}
});


// Get list of all method names on Lists
const USERS_METHODS = [
  'Users.upload'
];

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(USERS_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
