//  favourite component packages
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Seo from '../including/seo.js';

//  get 3-third package
import Loading from '../including/loading.jsx';
import { Posts } from '../../api/posts/posts-database.js';
import TimeAgo from '../including/timeage.jsx';

//  favourite Component
const Favourite = (props) => {
  //
  const { loading, posts, userId } = props;

  const postLists = posts.map( (item) => {
    return (
      <li key={item._id}>
        <div>{item.tag}-{item.subTag}</div>
        <a href={FlowRouter.path('Posts.page',{ _id: item._id })}>
          <div>
            <img src={item.imgHome} alt={item.title} />
            <h4>{ item.title }</h4>
            <span className='pull-right'>{TimeAgo(item.submitted)}</span>
          </div>
        </a>
        <hr/>
      </li>
    )
  });

  return (
    <div id='save-folder'>
      <h2>你的收藏：</h2>

        <Seo title = '你的收藏 | newsvoo中文网'
        description = "this is newsvoo favourite home" />

      {posts || posts.length > 0
        ? (<ul>
          {postLists}
        </ul>)
        : <p>there is no favourite</p>
      }

    </div>
  )
};

//  favourite meteor container
const FavouriteContainer = createContainer( () => {
  const sub = Meteor.subscribe("Posts.favourite");
  const userId = Meteor.userId();
  const posts = Posts.find({saveUser: {$in: [userId]}}, {limit: 15}).fetch();
  const loading = !sub;
  return {
    userId,
    posts,
    loading
  }
}, Favourite);

export default FavouriteContainer;
