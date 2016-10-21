// sub menu component
// add package
import React, { Component } from 'react';

// use function react to define,not component
export default function Submenu() {
  const route = FlowRouter.getRouteName();
   const activeCn = (route === 'Posts.cn') ? 'active' : '';
   const activeWorld = (route === 'Posts.world') ? 'active' : '';
   const activeFi = (route === 'Posts.finance') ? 'active' : '';
   const activeTe = (route === 'Posts.technology') ? 'active' : '';
   const activeSp = (route === 'Posts.sports') ? 'active' : '';
   const activeEd = (route === 'Posts.editor') ? 'active' : '';
   const activeSe = (route === 'Posts.search') ? 'active' : '';
  return (
        <div className="submenu">
                <ul className="nav navbar-nav navbar-center">
                    <li><a href={FlowRouter.path('Posts.cn')} className={activeCn}>两岸</a></li>
                    <li><a href={FlowRouter.path('Posts.world')} className={activeWorld}>全球</a></li>
                    <li><a href={FlowRouter.path('Posts.finance')} className={activeFi}>财经</a></li>
                    <li><a href={FlowRouter.path('Posts.technology')} className={activeTe}>科技</a></li>
                    <li><a href={FlowRouter.path('Posts.sports')} className={activeSp}>体育</a></li>
                    <li><a href={FlowRouter.path('Posts.editor')} className={activeEd}>推荐</a></li>
                    <li><a href={FlowRouter.path('Posts.search')} className={activeSe}><span className='glyphicon glyphicon-search'></span></a></li>
                </ul>
       </div>
  )
};
