/** Posts insert set in admin localhost
* Posts database setting
* add packages
*/
import { Meteor } from 'meteor/meteor';

// export Posts database
export const Posts = new Mongo.Collection('posts');

// set search key property
if(Meteor.isServer) {
  Posts._ensureIndex({title: 1, description: 1});
}

//deny all client insert update and remove
Posts.deny({
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

//home page posts fields
Posts.publicFields = {
  title: 1,
  tag: 1,
  subTag: 1,
  submitted: 1,
  description: 1,
  likeUser: 1,
  saveUser: 1,
  imgHome: 1,
  search: 1
};
