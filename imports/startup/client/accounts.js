// client accounts package
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

// Login in just need username,not email
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
