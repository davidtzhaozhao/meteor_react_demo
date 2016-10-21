// @file for all project Errors
// build a insert function for Errors database
import React ,{PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';

// get client Errors database
import { Errors } from '../../startup/client/errors.js';


//Error insert
// @params text is alert message,pattern is 'danger' or 'success'
export default function Alert(text, pattern) {
  let textError, errorId;
  textError = text || 'you get wrong!';

  // @default params is gray color background
  errorId = Errors.insert({title:textError,color: pattern});

  // remove error message after display 3 second.
    Meteor.setTimeout(function(){
       Errors.remove({_id: errorId})
    }, 3000);
};
