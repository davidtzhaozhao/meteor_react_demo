// when create user with google or facebook
// add packages
import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// config google and facebook when startup
Meteor.startup(function() {

  // deleter old google and facebook if exist and create
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.remove({
  service: "facebook"
});

// config google account key
ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: Meteor.settings.private.google.clientId,
      loginStyle: "popup",
      secret: Meteor.settings.private.google.secret
    }
  }
);

// config facebook account key
ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: Meteor.settings.private.facebook.appId,
      loginStyle: "popup",
      secret: Meteor.settings.private.facebook.secret
    }
  }
);

  // Hooks and checks when creating a user
  Accounts.onCreateUser(function (options, user) {

    // Check whether the email address has already been used
    let email, emailExists;
    email = options.email || user.services[_.keys(user.services)[0]].email;

// get google or facebook email and get hasemail varible
    if (email) {
      emailExists = Meteor.users.findOne({ 'emails.address': email })
      || Meteor.users.findOne({ 'services.google.email': email });
    };

// if has email ,get wrong messages.
    if (emailExists) {
      throw new Meteor.Error(409, 'The email address ' + email + ' has already being used.');
    };

// if no user profile ,create user profile property
    if (!user.profile) {
      user.profile = options.profile || {};
    }

    // Grab name and thumbnail from Google Account and add them to new property.
    if (user.services.google !== undefined) {
      user.profile.avatar = user.services.google.picture;

      // this is a array in user database
      user.emails =[{address: user.services.google.email, verified: true}];
      user.username = user.services.google.name;
      user.profile.google = true;
    }

    // Grab name and thumbnail from facebook Account
    // @TODO need add facebook ,here just use twitter to test
    else if (user.services.facebook !== undefined) {
      user.emails =[{address: user.services.facebook.email, verified: true}];
      user.profile.avatar = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large';
      user.username = user.services.facebook.name;
      user.profile.facebook = true;

    }

    // Set up default avatar
    if (!user.profile.avatar) {
      user.profile.avatar = Meteor.absoluteUrl('assets/img/avatar.png');
    }

    // Set up default name
    if (!user.username) {
      user.username = user.emails[0].address;
    }

    // Creates some basic stuff for the user, like sample collections and cards
    // Meteor.call('createTutorial', user);

    return user;
  });
});
