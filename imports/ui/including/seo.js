//  this is react helmet seo
import React from 'react';
import Helmet from 'react-helmet';

function Seo({ title, description } ) {
  return (
    <Helmet
    title = {title}
    meta={[
        { "name": "description", "content": description },
    ]} />
  )
};

Seo.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string
};

export default Seo;
