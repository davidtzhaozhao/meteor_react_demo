// add packages
import { Meteor } from 'meteor/meteor';
import { Posts } from './posts-database.js';

// add Comments and Votes database
import { Comments } from '../comments/comments-database.js';
import { Votes } from '../votes/votes-database.js';

// meteor publish function,homepage posts publish
Meteor.publish('Posts.lists', (limit) => {
  let postLimit = limit || 15;
  const option = {
    limit: postLimit,
    fields: Posts.publicFields,
    sort: { submitted:-1 }
  };
  return Posts.find({ subTag: { $ne: '头条' }}, option)
});

// meteor publish function,homepage posts all cataloges publish
Meteor.publish('post.cataloges', (tag, limit) => {
  let postLimit = limit || 15;
  const option = {
    limit: postLimit,
    sort: { submitted:-1 },
    fields: Posts.publicFields
  };
  return Posts.find({ tag: tag }, option)
});

// home page top posts publish
Meteor.publish('Posts.tops', () => {
  const option = {
    limit: 2,
    fields: Posts.publicFields,
    sort: { submitted:-1 }
  };
  return Posts.find({subTag: '头条'}, option)
});

/* meteor publish function,favourite posts publish
*  arrow funciton is no use, because use this is windows object
*/
Meteor.publish('Posts.favourite', function(limit) {
  if (!this.userId) {
    return this.stop();
  }
  let postLimit = limit || 15;
  const option = {
    limit: postLimit,
    sort: { submitted:-1 },
    fields: Posts.publicFields
  };
  check(this.userId, String);
  Counts.publish(this, 'saveCounts', Posts.find({saveUser: {$in: [this.userId]}}),{ noReady: true });
  return Posts.find({saveUser: {$in: [this.userId]}}, option)
});

// post page publish
Meteor.publish('Posts.page',(postId) => {
  check(postId, String);
  const option = { sort: { submitted: -1 }};
  return [
    Posts.find({  _id: postId}),
    Comments.find({ post: postId }, option),
    Votes.find({ post: postId}, option)
    ];
});

// SEO page publish, just get title
Meteor.publish('Seo.page',(postId) => {
  check(postId, String);
  let option = { fields: { title: 1 }};
  return Posts.find({ _id: postId }, option);
});

// search new methods
SearchSource.defineSource('posts', function(searchText, options) {
  const option = { sort: { submitted: -1}, limit: options.page || 7}
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {title: regExp},
      {description: regExp}
    ]};

    return Posts.find(selector, option).fetch();
  } else {
    return Posts.find({}, option).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
