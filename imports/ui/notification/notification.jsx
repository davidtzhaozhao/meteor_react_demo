//  Notification package
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// get notification database
import { Notifications } from '../../api/notification/notification-database.js';
import NotificationList from './notification-list.jsx';

//  notification class
class NotificationTemplate extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
   this.clickDocument = this.clickDocument.bind(this);
   this.upDate = this.upDate.bind(this);
  }

  //  add function to check if click outside of div
  clickDocument(e) {
          const component = this.refs.component;
          if (e.target == component || $(component).has(e.target).length) {
              this.clickInside(e);
          } else {
               this.clickOutside(e);
          }
      }

      //  add function enter the component
      componentDidMount() {
          window.addEventListener('click', this.clickDocument);
      }

      //  remove funciton after leave the component
      componentWillUnmount() {
          window.removeEventListener('click', this.clickDocument);
      }
      clickInside(e) {
    this.setState({
        expanded: true
    });
}
clickOutside(e) {
    this.setState({
        expanded: false
    });
}
upDate() {
  this.setState({
      expanded: false
  });
}
  render() {
    const { expanded } = this.state;
    const style = { display: 'inline-block', position: 'relative', marginRight: 10};
    const styleEx = { position: 'absolute', top: '30px'};
    const { notifications, counts } = this.props;
    return (
      <div style={style}  ref='component'>
      <button type="button" className="btn btn-primary">
        消息<span className="badge">{counts}</span>
        </button>
      {expanded
        ? (<div style={styleEx}>
        <NotificationList onUpdate={this.upDate} notifications={notifications} counts={counts} /></div>)
      : null
      }
     </div>
)
}
};

const NotificationContainer = createContainer( () => {
  const sub = Meteor.subscribe('Notifications.list');
  const notifications = Notifications.find().fetch();
  const counts = Notifications.find().count();
  return { notifications, counts }
}, NotificationTemplate)

export default NotificationContainer;
