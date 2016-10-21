// email setting when startup.
// add packages
import { Meteor } from 'meteor/meteor';

// starup email settings
Meteor.startup(function() {
  // Email SMTP setup @Mailgun
  if (Meteor.settings.private.emailSmtpUrl) {
    process.env.MAIL_URL = Meteor.settings.private.emailSmtpUrl;
  }

  // Default login verification user settings for the accounts
  Accounts.config({
    sendVerificationEmail: true
  });

//  verify user email
  Accounts.emailTemplates.siteName = "Newsvoo";
  Accounts.emailTemplates.from = "Newsvoo Admin <support@newsvoo.com>";
  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return "[Newsvoo] Verify Your Email Address";
    },
    text( user, url ) {
      let emailAddress   = user.emails[0].address,
          urlWithoutHash = url.replace( '#/', '' ),
          supportEmail   = "support@newsvoo.com",
          emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
      return emailBody;
    }
  };

//  reset user email get url
Accounts.urls.resetPassword = function(token) {
      return Meteor.absoluteUrl('reset-password/' + token);
    };

// reset password email subject
Accounts.emailTemplates.resetPassword.subject = function (user) {
        return 'Reset your Password';
      };

// reset password email html.
Accounts.emailTemplates.resetPassword.html = function (user, url) {
        let emailAddress   = user.emails[0].address,
            urlWithoutHash = url.replace( '#/', '' ),
            supportEmail   = "support@newsvoo.com",
            emailBody      = `To Reset your password address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
        return emailBody;
        }
});
