import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../api';

import '../assets/styles/containers/Details.css';
import DeleteModal from '../components/DeleteModal';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Details = ({ match: { params: { id }}, history }) => {
  const [state, setState] = useState({
    loading: true,
    data: undefined,
    error: null,
    modalIsOpen: false,
  });

  const fetchData = () => {
    setState({loading: true, error: null});
    fetch(`${API}/get-image/uploads/${id}`)
      .then(response => response.json())
      .then(response => {
        setState({loading: false, data: response});
      })
      .catch(error => {
        setState({loading: false, error: error});
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setState({...state, modalIsOpen: true});
  }

  const handleCloseModal = () => {
    setState({...state, modalIsOpen: false});
  }

  if(state.loading === true){
    return <Loader isContainer/>
  }

  if(state.error){
    return <Error/>
  }

  return state.data.result ?
  (
    <div className="details">
      <div className="details-item">
        <img src={state.data.result.url} alt="Image" className="details-item__image"/>
      </div>
      <div className="details-options">
        <div className="details-options__update">
          <button className="button button-primary">
            <Link to={`/update/${id}`}>Update</Link>
          </button>
        </div>
        <div className="details-options__delete">
          <button className="button button-danger" onClick={handleOpenModal}>Delete</button>
          <DeleteModal
            isOpen={state.modalIsOpen}
            closeModal={handleCloseModal}
            id={id}
            history={history}
          />
        </div>
      </div>
    </div>
  ) : <Redirect to="/404"/>;
}

export default Details;