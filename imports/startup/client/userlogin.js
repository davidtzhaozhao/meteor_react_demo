//import packages
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import ui login
import Layout from '../../ui/login/login-layout.js';
import Register from '../../ui/login/register.jsx';
import Login from '../../ui/login/login.jsx';
import ResetPassWord from '../../ui/login/resetpassword.jsx';
import NewPassWord from '../../ui/login/new-password.jsx';

// import 3-third packages
import Errors from '../../api/tool/alert.js';

Accounts.onLogin(function () {
  let path;
  // logout other clients
    Meteor.logoutOtherClients()
    if( !Meteor.userId()) {
      FlowRouter.go('/login')
    }
    path = Session.get('currentPath');
    path ? FlowRouter.go(path) : FlowRouter.go('/')

})

// define trackRouteExit funciton
function trackRouteExit() {
    let path;
  if(Meteor.user()){
    path = Session.get('currentPath');
    path ? FlowRouter.go(path) : FlowRouter.go('/')
  }
};

// user login group router
// @prfix is user
const LoginRoutes = FlowRouter.group({
    prefix: "/user",
    name: "Login",
});

// register router
// layout is different with homepage
LoginRoutes.route('/register',{
  name:'User.register',
  triggersEnter: [trackRouteExit],
  action() {
    mount(Layout, {
      content: () => (<Register />)
    })
  }
});

// login router
LoginRoutes.route('/login',{
  name:'User.login',
  triggersEnter: [trackRouteExit],
  action() {
    mount(Layout, {
      content: () => (<Login />)
      })
  }
});

// reset password router
LoginRoutes.route('/resetPassword',{
  name:'User.resetPassword',
  triggersEnter: [trackRouteExit],
  action() {
    mount(Layout, {
      content: () => (<ResetPassWord />)
        })
  }
});

// news user signup successfully,and get verified email back token url
FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Errors(error.reason, 'danger');
      } else {
        Errors('Email verified! Thanks!', 'success' )
        FlowRouter.go( '/' );
      }
    });
  }
});

// after reset password ,and get email to verifyEmail.
// if token is right ,transfer to new password page.
FlowRouter.route( '/reset-password/:token', {
  name: 'reset-password',
  action( params ) {
    mount(Layout, {
      content: () => (<NewPassWord token={params.token} />)
      })
  }
});
