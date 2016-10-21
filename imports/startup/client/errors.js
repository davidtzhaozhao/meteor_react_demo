// import package for Errors
import {
  Mongo
} from 'meteor/mongo';

// Local (client-only) collection,no need server
export const Errors = new Mongo.Collection(null);
