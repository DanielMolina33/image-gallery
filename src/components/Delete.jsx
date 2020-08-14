import React, { useState } from 'react';

import { API } from '../api';

const Delete = props => {
  const [state, setState] = useState({
    error: null,
    message: null
  });

  const fetchData = (callback) => {
    setState({error: null, message: 'Deleting...'});
    fetch(`${API}/delete-image/uploads/${props.id}`, {method: 'DELETE'})
      .then(response => response.json())
      .then(response => {
        setState({message: 'Success'});
        setTimeout(callback, 750);
      })
      .catch(error => {
        setState({loading: false, error: error});
      })
  }

  const handleClick = () => {
    fetchData(() => props.history.push('/'));
  }

  return (
    <>
      <button onClick={handleClick} className="button button-danger">
        {
          state.message
          ? state.message
          : 'Delete'
        }
      </button>
      {
        state.error &&
        <p>state.error</p>
      }
    </>
  );
}

export default Delete;