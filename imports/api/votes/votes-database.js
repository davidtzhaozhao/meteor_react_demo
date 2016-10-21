/** votes insert set in admin localhost
* votes database setting
* add packages
*/
import {
  Meteor
} from 'meteor/meteor';

// export votes database
export const Votes = new Mongo.Collection('votes');

//deny all client insert update and remove
Votes.deny({
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
