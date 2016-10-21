// login Component
// add package
import React, {Component} from 'react';
import Seo from '../including/seo.js';

// add errors package
import Errors from '../../api/tool/alert.js';
import Loading from '../including/progress-loading.js';

// add svg google logo.
import iconGooglePlus from '../svg/google.js';
import iconFacebook from '../svg/facebook.js';


export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			errorMessage: '',
			loading: false
		};
		this.onFocus = this.onFocus.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleGoogle = this.handleGoogle.bind(this);
		this.handleFacebook = this.handleFacebook.bind(this);
	}
	componentWillUnmount() {
		this.state = { loading: false }
}
	onFocus() {
		this.setState({
			errorMessage: ''
		})
	}
	onSubmit(e) {
		e.preventDefault();

		// Get our input values
		const username = this.refs.username.value.trim();
		const password = this.refs.password.value.trim();
		this.setState({ loading: true});

		// Login user
		Meteor.loginWithPassword(username,password, (er)=>{
			if(er) {
				this.setState({ loading: false});
        Errors(er.reason, 'danger');
			}
		});
	}

	// login with google method
	handleGoogle(e) {
		e.preventDefault();
		this.setState({ loading: true});
		Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function (err) {
      if (err) {
      Errors(err.reason, 'danger');
		}
    });
	}

	// login with facebook@TODO facebook login no finished
	handleFacebook(e) {
		e.preventDefault();
		this.setState({ loading: false});
		Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function(err) {
            if (err) {
              Errors(err.reason, 'danger');
            }
        });
	}
	render() {
		let message, userMessage, passwordMessage;
		message = this.state.errorMessage;
		userMessage = (message === 'User not found') ? 'user not found' : '';
		passwordMessage = (message === 'Incorrect password') ? 'password is wrong' : ''
    let { loading } = this.state;
		return (
			<section className='box-body'>

				<Seo title = '用户登录 | newsvoo中文网'
				description = "this is newsvoo login home" />

			<div className="box">

				{/*form for entering login username and password*/}
				<form onSubmit={this.onSubmit} className="login">
							<h1 className="text-center">登录</h1>
							<input
								className="form-control"
								ref="username"
								type="text"
								placeholder='用户名...'
								onFocus={ this.onFocus }
								/>

							{/*display error message,onfocus disppear*/}
			        	<p>{userMessage}</p>
							<input
								className="form-control"
								ref="password"
								type="password"
								placeholder='密码...'
								onFocus={ this.onFocus }
								/>
							<p>{passwordMessage}</p>
						<button type='submit' className="button block primary">Login</button>
<hr/>
			</form>

			{/*google and facebook login
				google svg need React dangerouslySetInnerHTML
				*/}
		<div>
		<a href="#" onClick={this.handleGoogle} className="button block google left-icon">
			<span dangerouslySetInnerHTML={{ __html: iconGooglePlus}} />
			Sign in with Google</a>
  	</div>
  	<div>
		<a href="#" onClick={this.handleFacebook} className="button block facebook left-icon">
			<span dangerouslySetInnerHTML={{ __html: iconFacebook}} />
			Sign in with Facebook</a>
  	</div>

{/*login option*/}
      <div className="text-center">
        <p><a href={FlowRouter.path('User.resetPassword')}>忘记密码吗?</a></p>
        <p style={{fontSize: 16}}>非用户？<a href={FlowRouter.path('User.register')}>sigh up</a></p>
      </div>

			{/*return to main app*/}
			<a href={FlowRouter.path('/')} className='fix-postion'><span className="glyphicon glyphicon-remove-circle"></span></a>
			</div>
			{ loading && <Loading />}
			</section>
		);
	}
};
