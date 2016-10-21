// reset password Component
// add package
import React, {Component} from 'react';
import Seo from '../including/seo.js';

// add 3-third package
import Errors  from '../../api/tool/alert.js';
import Loading from '../including/progress-loading.js';

// main Component
export default class ResetPassword extends Component{
  constructor() {
    super();
    this.state = {
      emailHasBeenSent: false,
      loading: false
    }
  }
	handleReset(e) {
		e.preventDefault();
    this.setState({ loading: true});
		const email = this.refs.forgotPassword.value.trim();

    //  err muse use => {} funciton otherwise this.setstate no work
		Accounts.forgotPassword({email: email}, (err) => {
			if(err) {
			Errors(err.reason, 'danger');
        this.setState({ loading: false});
		}else {
      this.setState({
      emailHasBeenSent: true,
      loading: false
      })
    }
		})
	}
	resetDiv() {
		return (
      <section className='box-body'>
			<div className='box'>
				<form onSubmit={this.handleReset.bind(this)}  style={{fontSize: 16}}>
					<h1>忘记密码</h1>
          		<p>忘记密码吗？请输入你注册的邮箱，我们将发送邮件到你邮箱，按照连接你可以修改密码！</p>
							<input className="form-control validate" ref="forgotPassword" type="email" placeholder='Email'/>
 						<button className="btn btn-block btn-primary">重置</button>
				</form>
				<a href={FlowRouter.path('/')} className='fix-postion'><span className="glyphicon glyphicon-remove-circle"></span></a>
				<p>已经有账号?<a href={FlowRouter.path('User.login')}>登录</a></p>
			</div>
      </section>
		)
	}
	render() {
    let { loading } = this.state;
		return (
			<div className='box-body'>

        <Seo title = '密码重置 | newsvoo中文网'
        description = "this is newsvoo user resetpassword home" />

        {this.state.emailHasBeenSent ? (<div>email has send. <a href={FlowRouter.path('/')}>回到主页！</a></div>)
          : this.resetDiv()
        }
        { loading && <Loading />}
			</div>
		);
	}
};
