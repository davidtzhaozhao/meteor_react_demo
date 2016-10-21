//  notifications list
import React from 'react';
import { Meteor } from 'meteor/meteor';

//  get others packages
import { FlowRouter } from 'meteor/kadira:flow-router';
import TimeAgo from '../including/timeage';


//  lists Component
const NotificationsList = function(props) {
  const { notifications, onUpdate, counts } = props;
  const style = { width: 25};
  const handleLink = function(postId, _id) {
    FlowRouter.go('Posts.page',{ _id: postId });
    Meteor.call('notification.remove', _id);
    onUpdate();
  };
  const handleDelete = function(_id) {
    Meteor.call('notification.remove', _id);
  }
  // const link = FlowRouter.path('Posts.page',{ _id: 'notifications.postId' });
  return (
    <div className='notification'>
      <h3>你的消息:{counts === 0 && '0'}</h3>
      <hr/>
      {notifications.map( (item) => {
        return <div className='notification-row' key={item._id}>
        <img className="img-circle" style={style} src={item.user.avatar} alt="img" />
        <span>{TimeAgo(item.submitted)}</span>
        <span style={{fontSize: 20}} onClick={handleDelete.bind(this, item._id)} className="glyphicon glyphicon-remove-sign"></span>
        <p onClick={handleLink.bind(this, item.postId, item._id)}>{item.text.substring(0,30)}</p>
        <hr/>
      </div>
      })}
    </div>
  )
};

export default NotificationsList;
