//  change avatar package
import React, { Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// upload image to s3 package
// resize can change image size
import {Slingshot} from 'meteor/edgee:slingshot';
import { Resizer } from 'meteor/thinksoftware:image-resize-client';

// Errors methods and loading Component package
import Errors from '../../api/tool/alert.js';
import Loading from '../including/progress-loading.js';

//  change-avatar component
class ChangeAvatar extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }
    this.handleImage =this.handleImage.bind(this);
    this.handleHideImg =this.handleHideImg.bind(this);
  }

  // click user avatar and get image to upload to s3
  handleHideImg() {
    const img = this.refs.hideImg.files[0];

  //  set state ,let loading work
   if(img) this.setState({loading: true});

// double check img ,otherwise resize maybe get no image name wrong.
   if(img)

    // @TODO need add minify or compress tool to deal image
    Resizer.resize(img, {width: 200, height: 200, cropSquare: true}, (err, file) => {

      // use Slingshot package to upload image to s3
      let uploader = new Slingshot.Upload("myImageUploads");

      // upload image to s3
      uploader.send(file, (error, downloadUrl) => {
        if (error) {
        Errors(error.reason, 'danger');
        this.setState({loading: false});
        }
        else {
          Errors('you have succesfully upload image!', 'success')

          //  update user avatar
          Meteor.call('Users.upload', downloadUrl , (error) => {
            if(!error) {

              //  after change all comments user avatar
            Meteor.call('comment.updateImg', downloadUrl);
             this.setState({loading: false});
           }
         }); // end of Meteor call
       } // end of if else
      }); // end of uploader
    }); // end of resize
  }

  // click avater get this function
  handleImage(e) {
    e.preventDefault();
    e.stopPropagation();
    $("input[id='my_file']").click();
    this.handleHideImg()
  }
  render() {
  const { user } = this.props;
  const img = (user.profile.avatar)
  ? user.profile.avatar
  : Meteor.absoluteUrl("assets/img/avatar.png");
  return (
    <div>
      <h2 style={{marginBottom: 20}}>更改你的头像：</h2>
      <div>
        <a onClick={this.handleImage}
           href="#">
        <img src={img} width='100px' />
        </a>
        </div>

        {/*hide element input*/}
      <input
        onChange={this.handleHideImg}
        type="file"
        ref='hideImg'
        id="my_file"
        style={{display: 'none'}}
        />
        {/*loading Component*/}
        {(this.state.loading)
          ? (<Loading/>)
          : ''
        }
    </div>
  )
};
};

ChangeAvatar.propTypes = {
  user: React.PropTypes.object
};

// meteor update users data
export default createContainer( () => {
  return { user: Meteor.user()}
}, ChangeAvatar)
