//  comment reply package
import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
 // other packages
import Errors from '../../api/tool/alert.js';
import TimeAgo from '../including/timeage.jsx';

//  comment reply class
class CommentReply extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    const { commentId } = this.props;
    const text = this.commentReply.value.trim();
    if(text == '') {
      return Errors('内容不能为空！', 'danger');
    }
    Meteor.call('comment.updateReply', text, commentId, (err, result) => {
      if(err) {
        Errors(err.reason, 'danger');
      } else {

        //  creat notifiction call methods
        Meteor.call('notifications.creat', text, commentId, (error) => {
          if(error) Errors(error.reason, 'danger');
        })
      }
    });
    this.commentReply.value = '';
  }
  getReply() {
  const { reply } = this.props;
  return  reply.map( (value,index) => {
      return <section key={index}>
        <div  className='reply-task'>
          <div>
            <img className="img-circle" src={value.replyUser.avatar || Meteor.absoluteUrl("assets/img/avatar.png")} alt="img"/>
          </div>
          <div>
            <p>{value.replyUser.name}-{TimeAgo(value.submitted)}</p>
            <p>{value.text}</p>
          </div>
        </div>
        <hr/>
      </section>
    })
  }
  render() {
  const { reply } = this.props;
  return (
    <div className='comment-reply'>
    <form onSubmit={this.handleChange}>
      <Textarea className="form-control" ref={ (ref) => this.commentReply = ref} type="text" placeholder='你的回复：' />
      <button className="btn btn-primary" type='submit'>回复</button>
      <hr/>
  </form>
    {reply
    && this.getReply()
  }
    </div>
  )
};
};

export default CommentReply;
