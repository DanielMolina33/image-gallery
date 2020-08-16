import React from 'react';
import ReactDOM from 'react-dom';

const Logs = ({loading, data, error, imageLoaded, id}) => {
  const template = `
    state {
      loading: ${loading}
      data: ${data}
      error: ${error}
      imageLoaded: ${imageLoaded}
    }
  `

  return ReactDOM.createPortal(
    <>
      <h2>logs {id}</h2>
      <code>
        <pre>
          {template}
        </pre>
      </code>
    </>,
    document.querySelector('#logs')
  );
}

export default Logs;