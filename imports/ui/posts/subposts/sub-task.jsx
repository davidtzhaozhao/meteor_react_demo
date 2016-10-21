//  add packages
import React, { PropTypes } from 'react';
import timeAgo from '../../including/timeage.jsx';

const Task = function(props) {
  const { post } = props;
  const { imgHome, title, subTag, description, submitted } = post;
  const link = FlowRouter.path('Posts.page',{_id:post._id});
  return (
<div className='posts-submenu'>
    <p>{subTag}-{timeAgo(submitted)}</p>
    <img src={imgHome} alt={title}/>
    <h3><a href={link}>{title}</a></h3>
    <p>{description}</p>
    <hr/>
</div>
  )
};

Task.propTypes = {
  post: React.PropTypes.object
};

export default Task;
