//  add package
import { Meteor } from 'meteor/meteor';

//  add 3 third packages

// export database
export const Searchs = new Mongo.Collection('searchs');

//deny all client insert update and remove
Searchs.deny({
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

// Search schema
Searchs.schema = new SimpleSchema({
  text: {
    type: String,
    max: 100,
  },
  userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      denyUpdate: true,
    },
    submitted: {
      type: Date
    }
});

Searchs.attachSchema(Searchs.schema);
