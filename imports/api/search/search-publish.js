// add meteor package
import { Meteor } from 'meteor/meteor';

// get database
import { Searchs } from './search-database.js';

//  define search publish
Meteor.publish('searchs', function() {
  if (!this.userId) {
    return this.stop();
  }

  check(this.userId, String);
  const option = {limit: 10, sort:{submitted: -1}}
  return Searchs.find({userId: this.userId}, option);
})
