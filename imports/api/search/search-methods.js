//  add packages
import { Meteor } from 'meteor/meteor';

//  get database
import { Searchs } from './search-database.js';

// definde search methods
Meteor.methods({

  //  create search
  'search.create'(text, userId) {

    check(text, String);
    check(userId, String);
    const searchLength = Searchs.find({userId : userId}).count();

//  if search is bigger than 10, and remove last one
    if(searchLength > 10) {
      const item = Searchs.findOne({userId : userId},{sort: {submitted: 1}});
      Searchs.remove({item});
    }
    const submitted = new Date();
    const search = { text, userId, submitted };

    Searchs.insert(search);
  }
});

// Get list of all method names on Searchs
const SEARCHS_METHODS = [
  'search.create',
];

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(SEARCHS_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
};
