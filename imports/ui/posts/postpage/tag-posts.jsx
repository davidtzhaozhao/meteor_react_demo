//  add package
import React, {Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// other packages
import { Posts } from '../../../api/posts/posts-database.js';

const options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
const fields = ['title', 'description'];
const PackageSearch = new SearchSource('posts', fields, options);


class Task extends Component {
  render() {
  const { _id, imgHome, title, description} = this.props.task;
  const link = FlowRouter.path('Posts.page',{_id: _id});
  return (
    <div className='postpage-tagpost'>
            <div><img src={imgHome} alt={title} /></div>
            <div>
              <a href={link}><h2>{title}</h2></a>
              <p>{description}</p>
            </div>
          </div>
  )
}
}
//  tag posts
class TagPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { search: props.search}
  }
  componentDidMount() {
      PackageSearch.search(this.state.search, {page: 8});
  }
render() {
  const { search, postId, posts } = this.props;
  return posts.length == 0
  ? null
  : (<div>
    <h3>相关主题文章：</h3>
        {posts.filter( (value) => value._id !== postId).map( (item) => {
          return <Task key={item._id} task={item} />
        })}
        <hr/>
      </div>)
    }
};

//  define search is string
TagPosts.propTypes = {
  search: React.PropTypes.string,
  postId: React.PropTypes.string
};

export default createContainer( () => {
  return {
    posts: PackageSearch.getData({
      sort: {submitted: -1}
    })
  }
}, TagPosts)
