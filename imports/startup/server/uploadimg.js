// upload image to S3
// add packages
import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import {Slingshot} from 'meteor/edgee:slingshot';

//  set upload image types and max size
Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 2 * 1024 * 1024,
});

if (Meteor.isServer) {
Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
  //  get settings amozon s3
  bucket: Meteor.settings.private.s3.bucket,
  AWSAccessKeyId: Meteor.settings.private.s3.AWSAccessKeyId,
  AWSSecretAccessKey: Meteor.settings.private.s3.AWSSecretAccessKey,
  acl: "public-read",

// just login in user can upload image to s3
  authorize: function () {
    if (!this.userId) {
      var message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },

// set image url,ex: "https://***.s3.amazonaws.com/$$@^^.com/image.jpg"
  key: function (file) {
    var currentUserId = Meteor.user().emails[0].address;
    return currentUserId + "/" + file.name;
  }
});
}
