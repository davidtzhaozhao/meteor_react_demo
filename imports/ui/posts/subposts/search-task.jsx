// search post task Component
// add package
import React, {Component, PropTypes} from 'react';
import {  Meteor } from 'meteor/meteor';
import TimeAgo from '../../including/timeage.jsx';

// main component
export default class Task extends Component {
  render() {
    const style = {
      p1: {
        color: '#195526',
        fontSize: 0.8 + 'rem'
      },
      p2: {
        fontSize: 0.8 + 'rem'
      },
      p3: {
        fontSize: 1.2 + 'rem'
      },
      p4: {
        fontSize: 0.8 + 'rem'
      }
    }
    const { _id,imgHome, title, tag, subTag, description, submitted } = this.props.task;
    const link = FlowRouter.path('Posts.page',{_id: _id});
    return (
      <div className='search-task'>
        <p style={style.p1}>{tag}-{subTag}</p>
        <p style={style.p2}>{TimeAgo(submitted)}</p>
        <a href={link}><p style={style.p3}>{title}</p>
        <p style={style.p4}>{description}</p></a>
        <hr/>
      </div>
    )
  }
}

Task.propTypes = {
  task: React.PropTypes.object,
};
