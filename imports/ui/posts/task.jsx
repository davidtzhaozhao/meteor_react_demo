// post task component
// add package
import React, {  Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import TimeAgo from '../including/timeage.jsx';

// add 3-third package
import Tag from '../including/tag.jsx';
import Like from '../including/like.jsx';
import Save from '../including/save.jsx';

// main component
class Task extends Component {
  render() {
    const post = this.props.task;
    const time = TimeAgo(post.submitted);
    const link = FlowRouter.path('Posts.page',{_id:post._id});
    const hasSubtag = post.subTag === '头条';
    const img = post.imgHome;

    // top style , title has shadow
    const style = {
    div: {
     position: 'relative',
     width: '100%',
     height: 450,
     backgroundImage: `url(${img})`,
     backgroundSize: 'cover',
     backgroundPosition: 'center center'
   }
};
    return (
      <div className='post-task'>

        {/*tag part*/}
          <Tag tag={ post.tag } subTag={ post.subTag || '' } time={ time }/>
        <br/>

<div style={ hasSubtag ? style.div  : null }>
  { !hasSubtag && <a href={ link }><img className="img-responsive" src={ post.imgHome } alt={ post.title } style={{maxHeight: 250}}/></a>}
  <a href={ link }><h1 className={ hasSubtag && 'task-toptitle'}>{ post.title }</h1></a>
</div>

          {/*description*/}
          { !hasSubtag && <p>{post.description}...</p> }

        {/*if subtag is 'top' ,no like and save */}
          {!hasSubtag && (<div>
                  { post.likeUser
                    && <Like
                          likeCounts={post.likeUser ? post.likeUser.length : 0}
                          postId={post._id}
                          likeUser={post.likeUser} /> }
                  <span className='pull-right'><Save saveUser={ post.saveUser} postId={ post._id } /></span>
              </div>)
          }
          <hr/>
        </div>
    )
  }
};

//  define proptypes, just task
Task.propTypes = {
  task: React.PropTypes.object
};

export default Task;
