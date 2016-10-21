// create user roles when project build.
import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

if (Meteor.isServer) {
  if (Meteor.users.find().count() === 0 ) {

// create three users
    let users = [
      {
        email: 'davidnmelly@newsvoo.com',
        username: 'david',
        verified: true,
        password: 'password',
        firstname: 'David t',
        lastname: 'Zhao',
        role: 'Admin'
      },
      {
        email: 'melly@newsvoo.com',
        username: 'melly',
        verified: true,
        password: 'password',
        firstname: 'Melly C',
        lastname: 'Zhao',
        role: 'Manager'
      },
      {
        email: 'info@newsvoo.com',
        username: 'newsvoo',
        verified: true,
        password: 'password',
        firstname: 'Newsvoo',
        lastname: 'Zhao',
        role: 'Manager'
      },
    ];

// each user create Meteor.users
    _.each(users, (user) => {
      let userId = Accounts.createUser({
        email: user.email,
        password: user.password,
        username: user.username,
        profile: {
          firstname: user.firstname,
          lastname: user.lastname
        },
        roles: [user.role]
      });

// add user roles to Roles
      Roles.addUsersToRoles(userId, user.role);

      // user update email verified
      Meteor.users.update(userId, {$set: {'emails.0.verified': true}});
    });
  }
};
