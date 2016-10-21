// register user Component
// add package
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import Seo from '../including/seo.js';

// get 3-third package
import Errors from '../../api/tool/alert.js';
import Loading from '../including/progress-loading';

// main comp\
export default class Register extends Component {
	constructor() {
		super();
		this.state = { loading: false }
	}
	componentWillUnmount() {
    this.state = { loading: false }
}
	onSubmit(e) {
		e.preventDefault();
		const ele = this.refs;

// get all input values and trim them
		const username = ele.username.value.trim();
		const email = ele.email.value.trim();
		const password = ele.password.value.trim();
		const confirmPassword = ele.confirmPassword.value.trim();

		// check has 6 number and letter
		const valid = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,}$/;
		const validPassword = valid.test(password);
if(validPassword === false){
	return Errors('最少六位数字与字母到组合！', 'danger');
};

// password same and not empty ,do this function
		if(password === confirmPassword && password !== "" && confirmPassword !== "") {

			// varible user information
			let accountInfo = {
				username: username,
				email: email,
				password: password
			};
		  this.setState({ loading: true});
			// meteor methods create user
			Accounts.createUser(accountInfo, ( er ) => {
				if(er) {
					this.setState({ loading: false});
					Errors('用户已经存在!','danger');
				} else {
							Errors( '邮件已发送，请在邮箱核实!', 'success' );
							// add new user email to Mailgun group lists
							Meteor.call( 'addToMailingList', email, ( error ) => {
        				if ( error )
          						Errors( error.reason );
      		});
				}
			});
		} else {
			Errors('密码不匹配！', 'danger');
		}
	}
	render() {
		let { loading } = this.state;
		return (
			<section className='box-body'>

				<Seo title = '用户注册 | newsvoo中文网'
				description = "this is newsvoo user sighup home" />

				<div className="box">
				<form onSubmit={this.onSubmit.bind(this)}>
					<h1>账号注册</h1>
							<input className="form-control" ref="username" type="text" placeholder='用户名'/>
							<input className="form-control" ref="email" type="email" placeholder='邮箱'/>
							<input className="form-control" ref="password" type="password" placeholder='密码'/><br/>
							<input className="form-control" ref="confirmPassword" type="password" placeholder='确认密码'/>
					<div>
						<button className="btn btn-block btn-primary">Submit</button>
					</div>
				</form>
				<a href={FlowRouter.path('/')} className='fix-postion'><span className="glyphicon glyphicon-remove-circle"></span></a>
				<p className='text-center'>已经有账号?<a href={FlowRouter.path('User.login')}>登录</a></p>
				</div>
        { loading && <Loading />}
				</section>
		);
	}
};
