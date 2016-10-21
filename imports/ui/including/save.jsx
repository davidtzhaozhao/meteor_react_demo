// save favourite Component
import React, { PropTypes } from 'react';
import Errors from '../../api/tool/alert.js';
import { _ } from 'lodash';

//  save function
const Save = (props) => {
const { saveUser, postId } = props;
const user = Meteor.user();
let userId = '';
if(user) {
   userId = user._id;
};

  //  save method
  const handleSave = (e)=> {
    e.preventDefault();

    let hasSave = !!saveUser;
    if(!user) {
      return Errors('need login in!', 'danger');
    };

    //  if there is save get methods
    if(hasSave) {
      if(saveUser.indexOf(userId) > -1){
        Meteor.call('post.removeSave', postId, userId);
        Errors('has cancel save!', 'success');
      } else {
        Meteor.call('post.save', postId, userId);
        Errors('has  save!', 'success');
      }
    } else {
      Meteor.call('post.save', postId, userId);
      Errors('has  save!', 'success');
    }
  }; // end of the function

    return (
      <span onClick={handleSave.bind(this)} className='favourite'>
        <span className={_.includes(saveUser, userId)
            ? 'glyphicon glyphicon-star'
            : 'glyphicon glyphicon-star-empty'}
            title={_.includes(saveUser, userId)
              ? 'has saved'
              : 'click to save'
            }
            >
        </span></span>
    )
//  }
};

//  proptypes about props
Save.propTypes = {
  saveUsers: React.PropTypes.array,
  postId: React.PropTypes.string
}

export default Save;
