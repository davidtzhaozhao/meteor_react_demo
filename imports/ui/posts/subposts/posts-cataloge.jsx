//  get packages
import React , {PropTypes, Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Seo from '../../including/seo.js';

//  get data packages
import { Posts } from '../../../api/posts/posts-database.js';
import Task from './sub-task.jsx';
import Loading from '../../including/progress-loading';
import LoadingMore from '../loadingmore.jsx';

//  post chins news class
class PostsCataloge extends Component {
  getPosts() {
    const { posts } = this.props;
    return posts.map( (item) => {
      return <Task key={item._id} post={item} />
    })
  }
  render() {
    const { posts, loading, tag } = this.props;
    let title, description;
    switch (tag) {

      // different tag different title and description
      case '两岸':
        title = '两岸新闻 | newsvoo中文网';
        description = 'this is newsvoo chinese home';
        break;
      case '全球':
        title = '全球新闻 | newsvoo中文网';
        description = 'this is newsvoo world home';
        break;
      case '财经':
        title = '财经新闻 | newsvoo中文网';
        description = 'this is newsvoo 财经新闻 home';
        break;
      case '科技':
        title = '科技新闻 | newsvoo中文网';
        description = 'this is newsvoo 科技新闻 home';
        break;
      case '体育':
        title = '体育新闻 | newsvoo中文网';
        description = 'this is newsvoo 体育新闻 home';
        break;
      case 'Posts.editor':
        title = '推荐新闻 | newsvoo中文网';
        description = 'this is 推荐新闻 home';
        break;
      case '推荐':
        title = '推荐新闻 | newsvoo中文网';
        description = 'this is newsvoo 搜索新闻 home';
        break;
      default:
        title = "newsvoo中文网";
        description = 'this is newsvoo webpage';
    }
    return (
      <div className='posts-home'>
       <Seo title = { title }
         description = { description } />

        <h3>{tag}新闻</h3><hr/>
        {loading || posts.length === 0
          ? <Loading />
          : this.getPosts()
        }
        <LoadingMore tag={tag} />
      </div>
    )
  }
};

//  propTypes config
PostsCataloge.propTypes = {
  posts: React.PropTypes.array,
  loading: React.PropTypes.bool,
  tag: React.PropTypes.string
};

//  creat reactive data
const PostsContainer = createContainer( (prop) => {
const { tag } = prop;
let limit = Session.get('postLimit');
const sub =  Meteor.subscribe('post.cataloges', tag, limit);
const loading = !sub.ready();
const posts = Posts.find({tag: tag}, {limit: limit}).fetch();
return {
  posts, loading, tag
}

}, PostsCataloge);

export default PostsContainer;
