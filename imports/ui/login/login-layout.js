// login layout
// add package
import React from 'react';

// add other package
import Errors from '../layout/error.jsx';

//this is login layoaut
export default function Layout({content}) {
  return (
    <div className='container-fluid'>
      <Errors/>
      {content()}
    </div>
  )
};
