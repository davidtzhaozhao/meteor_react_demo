// layout Component
// add package
import React from 'react';

// add other Component
import Header from './header.jsx';
import Footer from './footer.jsx';
import Errors from './error.jsx';

//this is main layoaut
export default function Layout({submenu,content}) {
  return (
    <div id='newsvoo'>
      <Header/>
      <Errors/>
      {submenu()}
      {content()}
      <br/>
      <Footer/>
    </div>
  )
};
