// layout footer Component
// add packages
import React, { Component } from 'react';

export default function Footer() {
    const date = new Date();

    // year can get different year number
    const year = date.getFullYear();
    return (
      <div>
        <p className='text-center'>Copyright ©2016- {year} 版权属于NewsVoo中文网.</p>
      </div>
    )
};
