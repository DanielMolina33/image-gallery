import React, { useState } from 'react';
import { API } from '../api';

import '../assets/styles/containers/Update.css';

const Update = ({match: {params: {id}}, history}) => {

  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
    updating: undefined,
    updated: undefined,
    imgUrl: null
  });

  const handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();

    formData.append('image', file);

    reader.onload = e => {
      setState({data: formData, imgUrl: e.target.result});
    }
    reader.readAsDataURL(file);
  }

  const handleClick = () => {
    setState({loading: true, error: null, updating: 'Updating...'});
    if(state.data){
      fetch(`${API}/update-image/uploads/${id}`, {method: 'PUT', body: state.data})
        .then(response => response.json())
        .then(response => {
          setState({loading: false, updated: response.message});
          if(!response.error) setTimeout(() => history.push('/'), 750);
        })
        .catch(error => {
          setState({loading: false, error: error});
        })
    } else {
      setState({error: 'You should to upload an image'});
    }
  }

  return (
    <div className="update-container">
      <h2 className="update-container__title">Update your image</h2>
      <div className="update-container__controls">
        <input
          onChange={handleChange}
          type="file"
          name="image"
          className="file"
        />
        <button onClick={handleClick} className="button button-primary">Update</button>
        {
          state.loading === true
            ? <p>{state.updating}</p>
            : <p>{state.updated}</p>
        }
        {
          <p>{state.error}</p>
        }
        {
          state.data &&
            <div className="update-container__image-preview">
              <img src={state.imgUrl} alt="Image to update"/>
            </div>
        }
      </div>
    </div>
  );
}

export default Update;