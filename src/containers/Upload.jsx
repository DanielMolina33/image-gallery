import React, { useState } from 'react';
import { API } from '../api';

import '../assets/styles/containers/Upload.css';

const Upload = ({history}) => {

  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
    uploading: undefined,
    uploaded: undefined,
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
    setState({loading: true, error: null, uploading: 'Uploading...'});
    if(state.data){
      fetch(`${API}/upload-image`, {method: 'POST', body: state.data})
        .then(response => response.json())
        .then(response => {
          setState({loading: false, uploaded: response.message});
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
    <div className="upload-container">
      <h2 className="upload-container__title">Upload your image</h2>
      <div className="upload-container__controls">
        <input
          onChange={handleChange}
          type="file"
          name="image"
          className="file"
        />
        <button onClick={handleClick} className="button button-primary">Upload</button>
        {
          state.loading === true
            ? <p>{state.uploading}</p>
            : <p>{state.uploaded}</p>
        }
        {
          <p>{state.error}</p>
        }
        {
          state.data &&
            <div className="upload-container__image-preview">
              <img src={state.imgUrl} alt="Image to upload"/>
            </div>
        }
      </div>
    </div>
  );
}

export default Upload;