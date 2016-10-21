//  change password packages
//  account packages
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

//  get 3third package
import Errors from '../../api/tool/alert.js';

//  ChangePassWord Component
class ChangePassWord extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.restoreButton = this.restoreButton.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //  click button and show change button
  changeButton() {
    this.setState({
      show: true
    })
  }

  //  clock restore button to show originanl button
  restoreButton(e) {
    e.preventDefault();
    this.setState({
      show: false
    })
  }

  //  submit password and change
  onSubmit(e) {
		e.preventDefault();
		const oldPassword = this.refs.oldPassword.value.trim();
		const newPassword = this.refs.newPassword.value.trim();
		const confirmPassword = this.refs.confirmPassword.value.trim();

// need new password at least number and letter and 6.
		const valid = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,}$/;
		const validPassword = valid.test(newPassword);
    if(!oldPassword || !newPassword) {
      return Errors('请正确的输入信息！', 'danger');
    }
		if(!validPassword){
				return Errors('最少六位数字与字母组合！', 'danger');
			};

		// if new is same with comfirm password
		if(newPassword === confirmPassword) {
			Accounts.changePassword(oldPassword, newPassword, (er) => {
				if(er) {
					Errors(er.reason, 'danger');
				} else {
					Errors('修改成功！', 'success');
					FlowRouter.go('/');
				}
			});
		}else {
			Errors('密码不匹配，重新输入！', 'danger');
		}
	}
  render() {
  let { show } = this.state;
  const { user } = this.props;

  const styleH = { display: 'none' };
  const styleV = { display: 'block' };
  return (
    <div>
      <h3 style={{marginBottom: 20}}>更改你的密码：</h3>
      <form style={show ? styleV : styleH}>
        <input ref="oldPassword" type="password" placeholder='Old Password' />
        <input ref="newPassword" type="password" placeholder='New Password'/>
        <input ref="confirmPassword" type="password" placeholder='New Password(again)'/>
        <button type='submit'  className='button danger' onClick={ this.onSubmit}>change</button>
        <button  className='button' onClick={this.restoreButton}>cancel</button>
      </form>
      <button style={ show ? styleH : styleV} className='button' onClick={this.changeButton}>change password</button>
<hr/>
  </div>
  )
};
};

export default ChangePassWord;
