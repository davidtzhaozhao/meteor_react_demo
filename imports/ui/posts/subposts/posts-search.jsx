// search post Component
// add package
import React , { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Seo from '../../including/seo.js';
import { _ }  from 'lodash';

// add more package
import { Posts } from '../../../api/posts/posts-database.js';
import { Searchs } from '../../../api/search/search-database.js';
import Task from './search-task.jsx';
import SearchHistory from '../../searchhistory/serach-history.jsx';
import Errors from '../../../api/tool/alert.js';
import Loading from '../../including/progress-loading.js';

const options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
const fields = ['title', 'description'];

const PackageSearch = new SearchSource('posts', fields, options);
// main Component
class PostsSearch extends Component {
constructor(props) {
  super(props);
  this.handleHistory = this.handleHistory.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

// auto focus input when render this page
componentDidMount() {
  Session.set('title', null);
  Meteor.subscribe('searchs');
  this.search.focus();
}
  getLists() {
    return this.props.posts.map( (task) => {
      return (<Task key={task._id} task={task}/>)
    })
  }

  //  props function get search histroy as search input value
  handleHistory(value) {
    this.search.value = value;
    this.search.focus();
  }
  // click submit and search
    handleSubmit(e) {
      e.preventDefault();

      // if title to long,just get 20 length
      const title = this.search.value.trim();
      if(title.length > 20) {
        this.search.value = '';
        return Errors('搜索主题不能超过20个字！', 'danger')
      }
      const userId = Meteor.userId();
      let searchs, searchTexts;
      if(userId) {
         searchs = Searchs.find({userId: userId}, {limit: 10, fields: {text: 1}}).fetch();
         searchTexts = searchs.map( (value) => {return value.text})
      };

      if(title === '') {
        return Errors('搜索主题不能为空！', 'danger');
      }

  //  if there is a user ,create search history.
      if(userId && !searchTexts.includes(title)) {
          Meteor.call('search.create', title, userId);
      };
      // search function
        PackageSearch.search(title, {page: 15});
  // input area clean
  this.search.value= '';
    }
  render() {
    const { posts, loading } = this.props;
    const userId = Meteor.userId();
    const hasUser = !!userId;
    return (
      <div className='search'>

        <Seo title="新闻搜索 | newsvoo中文网"
            description='This is newsvoo search page' />
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={ (c) => this.search = c } placeholder="搜索主题..." />
        </form>
        {hasUser && <SearchHistory handleHistory={this.handleHistory}/>}
        <hr/>
        {loading ? <Loading /> : this.getLists()}
        {posts.length == 0 && '没有搜索结果！'}
      </div>
    )
  }
};

export default createContainer( () => {
  return {
    posts: PackageSearch.getData({
      sort: {submitted: -1}
    }),
    loading: PackageSearch.getStatus().loading
  }
}, PostsSearch)
