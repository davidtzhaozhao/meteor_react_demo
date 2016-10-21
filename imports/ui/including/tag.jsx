// Tag @example 全球，两岸 etc. Component
import React, { Component, PropTypes } from 'react';

export default class Tag extends Component {
  render() {
    const { tag, subTag, time} = this.props;
    let tagName = tag || 'N';
    return (
      <div id='tag'>

        {/*display tag first letter*/}
        <div>
          <span className="badge" title={tagName}>{tagName.substr(0, 1)}</span>
        </div>

        {/*display tag and subtag and time*/}
        <div>
          <p>{tagName}-{subTag}</p>
          <p>
            <span className='glyphicon glyphicon-time'></span>&nbsp;&nbsp;{time}</p>
        </div>

        {/*end of tag*/}
      </div>
    )
  }
}

// propTypes all tag props
Tag.propTypes = {
  tag: React.PropTypes.string,
  subTag: React.PropTypes.string,
  time: React.PropTypes.string
}
