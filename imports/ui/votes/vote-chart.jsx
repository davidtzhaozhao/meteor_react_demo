//  get react package
// add package
// vote use traditional javascript to realise not react
import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

//  get google chart package
import {Chart} from 'react-google-charts';

export default function VoteChart(props) {
  const options = {"title": '', "pieHole": 0.4, "is3D":true};
  const arr = props.votes.map( (value) => {
    return [value.name, value.user.length]
  });
  let data = [["Task","Hours per Day"]];
  data.push(...arr);
  return (
    <div>
          <a href='#voteChart'>链接查看图表</a>
            <div id='voteChart'>
              <ul>
                <a href="#">
                  <span className="glyphicon glyphicon-remove-circle"></span>
                </a>
                <a href="#"></a>
                <a href="#"></a>
                <h3>{props.head}</h3>
                <div className={"my-pretty-chart-container"}>
                  <Chart chartTitle="DonutChart" chartType = "PieChart" data = {data} options = {options} graph_id = "ScatterChart"  width={"500px"} height={"450px"}  legend_toggle={true} />
                 </div>
              </ul>
            </div>
    </div>
  )
}
