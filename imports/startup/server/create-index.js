import {Posts} from '../../api/posts/posts-database.js';
import { Meteor } from 'meteor/meteor';
// DB Indexes
Meteor.startup(function () {
  Posts._ensureIndex({ submitted: 1 });
  Posts._ensureIndex({ title: 1 });
  Posts._ensureIndex({ description: 1 });
  // Fragments.createIndex({
  //   title: 'text',
  //   description: 'text',
  //   url: 'text',
  //   tags: 'text'
  // }, {
  //   name: 'text_index'
  // });


  // SearchHistory.createIndex({ user: 1 });
  // SearchHistory.createIndex({ query: 1 });

  // Notifications.createIndex({ user: 1 });
  // Notifications.createIndex({ read_at: 1 });
  // Notifications.createIndex({ resource: 1 });
});
