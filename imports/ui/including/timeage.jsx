//  timeago funciton
import React from 'react';

// we use moment js before but change to timeago
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import timeago from 'timeago.js';

const TimeAgo = function(time) {
 const Time = new timeago();
  return Time.format(time, 'zh_CN');
//return  moment(time).locale('zh-cn').fromNow();
};

export default TimeAgo;
