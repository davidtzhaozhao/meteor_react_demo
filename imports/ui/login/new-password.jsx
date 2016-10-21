// after reset password ,get set new password Component
// add pacakges
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import Seo from '../including/seo.js';

//  get dispaly error imformation
import Errors from '../../api/tool/alert.js';
import Loading from '../including/progress-loading.js';

// main Component
export default class NewPassword extends Component{
	constructor() {
		super();
		this.state = {
			loading: false
		}
	}
	componentWillUnmount() {
		this.state = { loading: false }
}
	onSubmit(e) {
		e.preventDefault();
		const newPassword = this.refs.newPassword.value.trim();
		const confirmPassword = this.refs.confirmPassword.value.trim();

		// check password if has number and letter and at least 6 number
		const valid = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,}$/;
		const validPassword = valid.test(newPassword);
		if(validPassword === false){
		return Errors('至少一个数字与字母，最少6位密码！', 'danger')
		}

		// if new and comfirm password same ,reset password via accounts
		if(newPassword === confirmPassword) {
			this.setState({
				loading: true
			});
      Accounts.resetPassword(this.props.token, newPassword, (err) => {
      if (err) {
				this.setState({
					loading: false
				});
        Errors(err.reason, 'danger')
      }else {
        Errors('密码修改成功！', 'success');
        FlowRouter.go('User.login')
      }
    });

		// excute reset account end!
		}else{
			this.setState({
				loading: false
			});
      Errors('密码不一致，请重新输入!', 'danger');
    }
	}
	render() {
		let { loading } = this.state;
		return (
			<section className='box-body'>

				<Seo title = '更新密码 | newsvoo中文网'
				description = "this is newsvoo newpassword home" />

			<div className="box">
				<form onSubmit={this.onSubmit.bind(this)}>
						<h1>Change Password</h1>
							<input className="form-control" ref="newPassword" type="password"  placeholder='New Passworld'/>
							<input className="form-control" ref="confirmPassword" type="password"  placeholder='Comfirm Password'/>
						<button className="btn btn-block btn-primary">Submit</button>
				</form>
				<a href={FlowRouter.path('/')} className='fix-postion'><span className="glyphicon glyphicon-remove-circle"></span></a>
					</div>
					{ loading && <Loading />}
				</section>
		);
	}
};
