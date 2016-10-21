// Random number function
// homepage image size is random.
import React from 'react';

// @params min is minimus number,max is maxium number.
export default function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};
