/* @IMPORTANT this is main project Component
*
*/

//  add packages
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Seo from '../including/seo.js';

// add 3-third package
import { Posts } from '../../api/posts/posts-database';
import Task from './task.jsx';
import Errors from '../../api/tool/alert.js';
import Loading from '../including/loading.jsx';

//main home page lists
class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    limit: 10,
  };
  this.handleLoading = this.handleLoading.bind(this)
}

//  before component ,set posts limit is 10
componentDidMount() {
  Session.set('postLimit', 10)
  }
// posts list and top lists use same task template
//  but they can dispaly different
  getList() {
    return this.props.posts.map(task => {
      return (<Task
         key={task._id}
         task={task}
         />)
    })
  }

  //  top posts lists
  getTop() {
    return this.props.tops.map(task => {
      return (<Task
         key={task._id}
         task={task}
         />)
    })
  }
  //  add 10 limit per click
  handleLoading() {
    this.setState({
    limit: this.state.limit + 10
  });
    Session.set('postLimit', this.state.limit + 10)
  }

  //  loading more component
  handleLoad() {
    const postCount = Posts.find({subTag:{$ne:'头条'}}).count();
      if(postCount >= this.state.limit) {
        return (
        <a onClick={this.handleLoading} className='button block'>Loading More</a>
        )
      }
  }
  render() {
    const { posts, tops, loading } = this.props;
    const { limit } = this.state;

    return (<div className="posts-home">
    
    <Seo title='新闻主页 ｜ newsvoo中文网'
      description="this is newsvoo main home" />

    {loading
      ?  <Loading />
      :  (<div>{this.getTop()}{this.getList()}{this.handleLoad()}</div>)
    }
          </div>
        )
  }
};

//  app proptypes
App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  posts: React.PropTypes.array,      // all posts array
  tops: React.PropTypes.array,       // all tops array
  loading: React.PropTypes.bool,     // subscription status is boolean
};

//  export app
export default App;
