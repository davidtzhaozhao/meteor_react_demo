// display markdown text funciton
// add package
import React from 'react';

//  we use javascript function no Component;
export default function Text(props) {
    const text = props.text;
    const Remarkable = require('remarkable');
    const md = new Remarkable();
    md.set({
    html: true,
    breaks: true
  });
  const rawMarkup = { __html: md.render(text) };

     return (
      <div>
{/*<div dangerouslySetInnerHTML={ __html: md.render('# Remarkable rulezz!') } />*/}
        {/*react must use dangerouslySetInnerHTML to display html*/}
        <div dangerouslySetInnerHTML={ rawMarkup } />
      </div>
    )
};
