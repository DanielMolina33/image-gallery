import React from 'react';
import classNames from 'classnames';

import '../assets/styles/components/Loader.css';

const Loader = ({isContainer, isImage}) => {
  const loaderClass = classNames('container-loader', {
    isContainer,
    isImage
  });

  return (
    <div className={loaderClass}>
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;