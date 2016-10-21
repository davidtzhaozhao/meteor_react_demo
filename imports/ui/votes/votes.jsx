//  get react package
// add package
// vote use traditional javascript to realise not react
import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

// get votechart and errors function
import VoteChart from './vote-chart.jsx';
import Errors from '../../api/tool/alert.js';

//  click button get vote
const handleVote = function(id, name, votes) {
  if(!Meteor.user()) {
    return Errors('请登录后投票！', 'danger');
  }
  Meteor.call('Votes.handle', id, name);
}

//  has vote function
const userHasVote = function(votes) {
  const userId = Meteor.userId();
  let has = votes.filter((item) => {
    return item.user.indexOf(userId) > -1
  });
  if (has.length > 0) {
    return true;
  } else {
    return false;
  }
}

//  get all user numbers
const sumUsers = function(votes) {
  return votes.reduce((sum, item) => {
    return sum + item.user.length
  }, 0)
};

//  get votelist
const voteList = function(votes, id) {
  const userId = Meteor.userId();
  let hasVote = userHasVote(votes);
  const sum = sumUsers(votes);
  const colors = ['#df5826', '#d7ee1b', '#6fcade','red', 'green', 'blue', 'orange', 'yellow' ,'#b85581', '#84b9a3'];

  return votes.map((item, key) => {
    return <li className="list-group-item" key={key}>{item.name}{item.user.indexOf(userId) > -1
        && '(你已经投票给此项!)'}

      <div style={{
        width: (item.user.length * 100 / sum).toFixed(0) + "%",
        background: colors[key]
      }}>
        {(item.user.length * 100 / sum).toFixed(0) + "%"}
      </div>

      <strong>{item.user
          ? item.user.length
          : 0}</strong>
        {hasVote
        ? ''
        : <button onClick={handleVote.bind(this, id, item.name, votes)}>投票</button>
}
    </li>
  });
};

// export vote to post page
export default function Votes(props) {
  const {voteName, id, votes} = props;
  let hasVote = userHasVote(votes);
  return (
    <ul className="list-group votes">
      <h3>民意调查：{voteName}</h3>
      {hasVote
      ?  <VoteChart votes={votes} head={voteName}/>
      : ''
      }
      {voteList(votes, id)}
      <hr/>
    </ul>
  )
}
