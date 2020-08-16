import React from 'react';
import ReactDOM from 'react-dom';

const Logs = ({logs, id}) => {
  // const values = Object.entries(logs);

  return ReactDOM.createPortal(
    <>
      <h2>logs {id}</h2>
      <p>{JSON.stringify(logs)}</p>
    </>,
    document.querySelector('#logs')
  );
}

export default Logs;