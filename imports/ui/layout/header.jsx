// layout header Component
// add packages
import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

// Errors methods and loading Component package
import Errors from '../../api/tool/alert.js';
import Loading from '../including/progress-loading.js';
import Notification from '../notification/notification.jsx';

// header Component
class Header extends Component{
  // logou function
  handleLogout(e) {
    e.preventDefault();
    Meteor.logout();
    FlowRouter.go('/');
  }

  // login menu after login succesfully
  loginMenu() {
  const { currentUser, counts } = this.props;
  return (
  <span className='dropdown'>
  <a style={{marginRight: 30}} className="dropdown-toggle" data-toggle="dropdown" href="#">
    <img style={{width: 25}} className="img-circle" src={currentUser.profile.avatar || Meteor.absoluteUrl("assets/img/avatar.png")} alt="img"/>
  <span className="caret"></span></a>

  {/*dropdown menu*/}
  <ul style={{marginTop: 30, padding: 20}} className="dropdown-menu dropdown-menu-right">
    <li>你好:{currentUser.username}</li>
    <li className="divider"></li>
{counts > 0
  ? (<li>
      <a href={FlowRouter.path('Posts.favourite')}>收藏
        <span className="badge">{counts}</span>
      </a>
    </li>)
  : null
}
    <li><a href={FlowRouter.path('User.account')}>账号</a></li>
    <li onClick={this.handleLogout.bind(this)}><a href="#">登出</a></li>
  </ul>

</span>
    )
  }
  render(){
  const { currentUser } = this.props;
  return (
    <header id='website-header'>
      <div className="row">
          <div className="brand">
            <a href={FlowRouter.path('/')}>
              <img className='svg-logo' src="/logo.svg" alt="svg" />
              </a>
          </div>
          <ul className="action">
            {currentUser
              ? (<div><Notification />{this.loginMenu()}</div>)
              : (<li>
                <a href={FlowRouter.path('User.login')}>
                <span className='glyphicon glyphicon-user'></span>
                </a>
              </li>)
            }
          </ul>
      </div>
    </header>
  )
}
};

// meteor update users data
export default createContainer( () => {
  Meteor.subscribe('Posts.favourite');
  const counts = Counts.get('saveCounts');
  return {
     currentUser: Meteor.user(),
     counts
   }
}, Header)
