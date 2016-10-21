// comments list in postpage
// add package
import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import timeAgo from '../including/timeage.jsx';

// add 3-third packages
import Errors from '../../api/tool/alert.js';

// add Comments database
import { Comments } from '../../api/comments/comments-database.js';
import Like from './comment-like.jsx';
import CommentReply from './comment-reply.jsx';

//main comments lists
export default class CommentTask extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.setState({
      show: !this.state.show
    })
  }
  render() {

    // define all elements from comment object
    const {text, submitted, likeUser, _id, reply} = this.props.comment;
    const {avatar, name} = this.props.comment.user;
    const time = timeAgo(submitted);
    const { show } = this.state;
    const styleN = { display: 'none'};
    const styleS = { display: 'block', width: '90%',background: '#efeaf2'};

    return (
      <li className='comment-item'>
        {/*this is avatar and username part*/}
        <div className='citem-div1'>
          <img src={avatar || Meteor.absoluteUrl("assets/img/avatar.png")}/>
        </div>

        {/*this is comment text and time and button*/}
        <div className='citem-div2'>
          <span>{name}</span>
          <span className='pull-right'>
            <span onClick={this.handleChange}
              className={show
                ? "glyphicon glyphicon-chevron-up"
                : "glyphicon glyphicon-chevron-down"
              }>
              {reply
                ? reply.length
                : 0
              }
            </span>
          </span>
          <p>{time}</p>
          <br/>
          <p>{text}</p>
          <div style={show ? styleS : styleN}>
            <CommentReply commentId={_id} reply={reply} />
          </div>
          <span>
            <Like
              likeCounts={likeUser ? likeUser.length : 0}
              commentId={_id}
              likeUser={likeUser}
              />
          </span>
        </div><hr/>
      </li>
    )
  }
}
