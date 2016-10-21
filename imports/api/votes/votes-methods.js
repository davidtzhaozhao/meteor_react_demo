//  votes methods
// add packages
import { Meteor } from 'meteor/meteor';

import { Votes } from './votes-database.js';

Meteor.methods({
  'Votes.handle'(id,name) {
    const user = Meteor.user();

    check(id, String);
    check(name, String);
    check(user, Object);
    Votes.update({_id: id, 'vote.name': name}, { $addToSet: { 'vote.$.user': user._id } });
  }
})
