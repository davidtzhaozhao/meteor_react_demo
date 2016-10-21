// post page Component
// add package
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import TimeAgo from '../../including/timeage.jsx';
import Seo from '../../including/seo.js';

// add 3-third package
import { Posts } from '../../../api/posts/posts-database.js';

// add common package
import Loading from '../../including/loading.jsx';
import Tag from '../../including/tag.jsx';
import Like from '../../including/like.jsx';
import Save from  '../../including/save.jsx';

// add markdown and newsvoo2016 version template
import Text from './markdown-text.jsx';

// add comment, vote input and item Component
import CommentsTemplate from '../../comments/comments.jsx';
import Votes from '../../votes/votes.jsx';
import TagPosts from './tag-posts.jsx';

// main Component
export default class Page extends Component {
constructor(props) {
  super(props);
}
render() {
  const { post, comments, currentUser, loading, postExists, votes } = this.props;
  let contentA, contentB, contentC, imgA, imgB;
    if(loading){
      return (<Loading />)
    };

      const time = TimeAgo(post.submitted);

      //  get 2016version old text
      contentA = post.contentA ? post.contentA : '';
      contentB = post.contentB ? post.contentB : '';
      contentC = post.contentC ? post.contentC : '';
      imgA = post.imgA ? `<img src="${post.imgA}" alt="img"/>` : '';
      imgB = post.imgB ? `<img src="${post.imgB}" alt="img"/>` : '';
      let oldText = contentA.concat(imgA, contentB, imgB, contentC);
      return (
        <div className="post-page">
          <Seo title = {post.title.substring(0,20)}
            description = {post.title} />

          <hr />
        {/*tag and moment*/}
          <Tag tag={post.tag} subTag={post.subTag} time={time} />

       {/*title*/}
          <h1>{post.title}</h1>

       {/*description*/}
          <p className='post-page-des'>{post.description}</p>

       {/*markdown or old version*/}
          {!!post.mark
            ?  <Text text={post.mark} />
          : (<Text text={oldText} />)
          }

        {!!post.youtube
        ? (<div style={{marginTop: 30}} className='text-center'>
                <iframe width="50%" height="315" src={post.youtube} allowFullScreen></iframe>
          </div>)
        : null
        }

       {/*post like and save*/}
          <div style={{marginTop: 30}} className='text-center'>
            <Like
              likeCounts={post.likeUser ? post.likeUser.length : 0}
              postId={post._id}
              currentUser={currentUser}
              likeUser={post.likeUser}
              />&nbsp;&nbsp;&nbsp;&nbsp;
            <Save saveUser={post.saveUser} postId={post._id} />
          </div><hr/>

          {/*this is vote area*/}
          {!!votes
          ?  <Votes voteName={votes.voteName} id={votes._id} votes={votes.vote} />
          :   null
          }

          {!!post.search
            ? <TagPosts search={post.search} postId={post._id} />
          : null
          }
        {/*comment Component*/}
        <CommentsTemplate postId={post._id} comments={comments} currentUser={currentUser} />
        </div>
      )
  }
};

// define PropTypes
Page.propTypes = {
  post: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  comments: React.PropTypes.array,
  votes: React.PropTypes.object,
  loading: React.PropTypes.bool,
  postExists: React.PropTypes.bool
};
