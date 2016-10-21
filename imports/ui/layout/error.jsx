// Errors Ui Component
// add packages
import React ,{Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// add Errors database from client startup
import { Errors} from '../../startup/client/errors.js';

//Error page lists
class App extends Component {

// iterate Errors array
  getList() {
    return this.props.errors.map( task => {
      return (<button
        key={task._id}
          className='alert'
           title={task.color}
         >{task.title}</button>)
    })
  }
  render() {
    return (
      <div className='errors'>

        {/*react animation*/}
        <ReactCSSTransitionGroup
           transitionName="animation"
           transitionAppear={true}
           transitionAppearTimeout={2000}
            transitionEnterTimeout={500}
             transitionLeaveTimeout={500}>
  {this.getList()}
  </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default createContainer( () => {
  return {
errors: Errors.find().fetch()
  }
},App)
