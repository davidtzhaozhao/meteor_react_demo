//  account packages
import React from 'react';
import { Meteor } from 'meteor/meteor';
import Seo from '../including/seo.js';

//  get 3-third package
import ChangePassWord from './change-password.jsx';
import ChangeAvatar from './change-avatar.jsx';

//  account funciton not component
const Account = () => {
  const user = Meteor.user();
  if(!user) {
    return FlowRouter.go('/');
  };
  return (
    <div id='account'>
      <h3>你好：{user.username}</h3>

        <Seo title = '你的账号 ｜newsvoo中文网'
        description = "this is newsvoo accounts home" />

      <hr/>
      { !user.profile.facebook &&  (<div><h3>你的邮箱:</h3><h4>{user.emails[0].address}</h4><hr/></div>) }



    {/*change password component*/}
      {!user.profile.google && !user.profile.facebook
        && <ChangePassWord user={user} />
      }

      {/*change avatar component*/}
      <ChangeAvatar />
    </div>
  )
};

export default Account;
