//import packages
import React from 'react';
import { mount } from 'react-mounter';

// import home ui Layout
import Layout from '../../ui/layout/layout.jsx';

// import all component
import HomePage from '../../ui/container/posts-list-container.jsx';
import PostsCataloge from '../../ui/posts/subposts/posts-cataloge.jsx';
import PostsSearch from '../../ui/posts/subposts/posts-search';
import FavouriteList from '../../ui/favourite/favourits.jsx';
import Page from '../../ui/container/postpage-container.jsx';
import Account from '../../ui/account/account.jsx';

// import posts submenu
import SubMenu from '../../ui/posts/post-submenu.jsx';

/** trigger get current router path when leaving posts router
* Enter get all SEO title and description
* SEO is a import funciton
* exit get this router group path ,so when login we can go back
* to previous page
*/
const Triggers = {
  exit() {
    const path = FlowRouter.current().path;
    Session.set('currentPath', path);
  }
};

// Define homepage router group name
// triggerexit get router session
const postsRoutes = FlowRouter.group({
    name: "Posts",
    triggersExit: [Triggers.exit]
});

// @IMPORTANT Newsvoo root router
postsRoutes.route('/',{
  name:'Posts.list',
  action() {
    mount(Layout, {
      submenu: () => (<SubMenu />),
      content: () => (<HomePage />)
    });
  },
})

// chinese news router
postsRoutes.route('/cn', {
  name:'Posts.cn',
  action() {
  mount(Layout,{
  submenu: () => (<SubMenu />),
  content: () => (<PostsCataloge tag='两岸' />)
})
    },
});

// world news router
postsRoutes.route('/world', {
  name:'Posts.world',
    action() {
      mount(Layout,{
        submenu: () => (<SubMenu />),
        content: () => (<PostsCataloge tag='全球' />)
      })
    }
});

// financial news router
postsRoutes.route('/finance', {
  name:'Posts.finance',
    action() {
      mount(Layout,{
        submenu: () => (<SubMenu />),
        content: () => (<PostsCataloge tag='财经' />)
      })
    }
});

// Technology news router
postsRoutes.route('/technology', {
  name:'Posts.technology',
    action() {
      mount(Layout,{
        submenu: () => (<SubMenu />),
        content: () => (<PostsCataloge tag='科技' />)
      })
    }
});

// Sports news router
postsRoutes.route('/sports', {
  name:'Posts.sports',
    action() {
      mount(Layout,{
        submenu: () => (<SubMenu />),
        content: () => (<PostsCataloge tag='体育' />)
      })
    }
});

// 推荐 news router
postsRoutes.route('/editor', {
  name:'Posts.editor',
    action() {
mount(Layout,{
  submenu: () => (<SubMenu />),
  content: () => (<PostsCataloge tag='推荐' />)
});
    }
});

// search news router
postsRoutes.route('/search', {
  name:'Posts.search',
  action() {
  mount(Layout,{
  submenu: () => (<SubMenu />),
  content: () => (<PostsSearch />)
});
    },
});

const favouriteEnter = function() {
  if(!Meteor.user()) {
    FlowRouter.go('/')
  }
};
// this is favourite  router
postsRoutes.route('/favouriteList', {
  name:'Posts.favourite',
  triggersEnter: [favouriteEnter],
  action() {
  mount(Layout,{
  submenu: () => (<span />),
  content: () => (<FavouriteList />)
});
    },
});

// account router
postsRoutes.route('/account',{
  name:'User.account',
  triggersEnter: [favouriteEnter],
  action() {
    mount(Layout, {
      submenu: () => (<span />),
      content: () => (<Account />)
      })
  }
});

// post page router
postsRoutes.route('/:_id',{
  name:'Posts.page',
  action(params){
    mount(Layout,{
      submenu: () => (<span />),
      content: () => (<Page _id={params._id} />)
    })
  }
});

// All router notfound go back to foot router
FlowRouter.notFound = {
  action(){
    FlowRouter.go('Posts.list');
  }
}
