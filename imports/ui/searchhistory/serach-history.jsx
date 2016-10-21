// add package
import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Loading from '../including/progress-loading.js';
import TimeAgo from '../including/timeage.jsx';

//  get database
import { Searchs } from '../../api/search/search-database.js';

//  define search history class
class SearchHistory extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
  }
  handleShow(e) {
    e.preventDefault();
    this.setState({
      show: !this.state.show
    });
  }
  getHistory(value) {
    this.props.handleHistory(value);
    this.setState({show: false})
  }
  render() {
  let { show } = this.state;
  const sub = Meteor.subscribe('searchs');
  const searchs = Searchs.find({},{sort:{submitted: -1}}).fetch();
  return (
    <div className="text-center">
      <a style={{marginBottom: 30, fontSize: 16}} onClick={this.handleShow}>
        {show
        ? '收回历史查询'
        : '显示历史查询'
        }
      </a>
      <div className="table-responsive">
      <table className="table table-hover">
        <tbody >
          {show && searchs.map( (value) => {
            return <tr key={value._id}  onClick={this.getHistory.bind(this, value.text)}>
              <td>{value.text}</td>
              <td>{TimeAgo(value.submitted)}</td>
            </tr>
          })}
        </tbody>
      </table>
      </div>
      {show && <p style={{float: 'right', fontSize: 15}}>仅显示最近十个历史查询：</p>}
    </div>
  )
}
};

SearchHistory.propTypes = {

};

export default SearchHistory;
