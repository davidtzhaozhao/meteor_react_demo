//  import react package
import React, { Component,PropTypes } from 'react';

//  add others package
import { Posts } from '../../api/posts/posts-database.js';

//  define loading more class component
class LoadingMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 15
    };
    this.handleLoading = this.handleLoading.bind(this);
  }
  handleLoading(e) {
    this.setState({
    limit: this.state.limit + 15
  });
    Session.set('postLimit', this.state.limit + 15)
  }
  componentDidMount() {
    Session.set('postLimit', 15)
    }
  componentWillReceiveProps(nextProps) {
  if(nextProps.tag !== this.props.tag) {
    this.setState({
    limit: 15
  });
  Session.set('postLimit', 15);
  }
}
  render() {
    const { tag } = this.props;
    const postCount = Posts.find({tag:tag}).count();
    return postCount >= this.state.limit
    ? <button onClick={this.handleLoading} className='button block'>更多新闻...</button>
    : null
  }
};

LoadingMore.propTypes = {
  tag: React.PropTypes.string
};

export default LoadingMore;
