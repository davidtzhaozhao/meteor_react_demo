// this is file is for Mailgun API
// add packages
import { Meteor } from 'meteor/meteor';

// mailgun setting
// api data is from settings.json
let settings     = Meteor.settings.private.mailgun,
    mg           = new Mailgun( { apiKey: settings.apiKey, domain: settings.domain } ),
    listAddress  = `group@${ settings.domain }`,
    list         = mg.api.lists( listAddress );

// Email methods
Meteor.methods({

// send email method
'sendEmail'(data) {
  check([data.text, data.emailTo, data.emailName],[String]);
  this.unblock();
  try{
    const emailSent = sendEmailNow(data);
    return data;
  }catch(err){
    throw new Meteor.Error(400, 'Your sending email wrong！');
  }
},

// send verification email link
'sendVerificationLink'() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  },

// add user email to Mailgun group lists
  'addToMailingList'(emailAddress) {
    check( emailAddress, String );
    if ( Meteor.users.findOne( { 'emails.address': emailAddress } ) ) {
      list.members().create({
        subscribed: true,
        address: emailAddress
      }, ( error, response ) => {
        if ( error ) {
          throw new Meteor.Error( 'mailgun-error', error );
        } else {
          console.log( response );
        }
      });
    } else {
      throw new Meteor.Error( 'bad-email', 'Sorry, you\'re not a registered user.' );
    }
  },

// send email to whole Mailgun group lists
  'sendToMailingList'() {
    mg.send({
      from: listAddress,
      to: listAddress,
      subject: "Testing out our mailing list!",
      text: "This is where we pass our message to users. If we want to send HTML, we rename this field HTML, or, add it as a separate property (to send text as a backup)."
    }, function( error, body ) {
    });
  }
});

// send email function for @sendEmail above
sendEmailNow = (data) => {
  Email.send({

    // @TODO change to data.emailTO
    to: 'etao.au@gmail.com',

    // from you can add anyone email ,mailgun will auto set it in email
    from: 'davidnmelly@gmail.com',
    subject: 'Message from' + data.emailName,
    text: data.text,

    // set html
    html: `<h1><strong>${data.text}</strong>, but this will not.</h1><img src='https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg' width='200px'/>`

  })
}


// Get list of all method names on Lists
const EMAILS_METHODS = [
  'sendEmail',
  'sendVerificationLink',
  'addToMailingList',
  'sendToMailingList'
];

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(EMAILS_METHODS, name);
    },
    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
