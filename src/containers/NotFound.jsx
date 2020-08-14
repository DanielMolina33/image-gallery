import React from 'react';

import '../assets/styles/containers/NotFound.css';
import image from '../assets/images/not-found.svg';

const NotFound = () => {
  return (
    <div className="container-notFound">
      <img src={image} alt="not found image"/>
      <p>Error 404 page not found</p>
    </div>
  )
}

export default NotFound;