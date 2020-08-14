import React from 'react';
import ReactDOM from 'react-dom';

import '../assets/styles/components/DeleteModal.css';
import Delete from '../components/Delete';

const DeleteModal = ({isOpen, closeModal, id, history}) => {
  if(!isOpen){
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-container__delete">
        <button onClick={closeModal} className="btn-close">X</button>
        <div className="modal-container__delete-body">
          <h1>Are you sure?</h1>
          <p>You are about to delete this image.</p>
        </div>
        <div className="modal-container-delete-options">
          <Delete id={id} history={history}/>
          <button onClick={closeModal} className="button button-primary">Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default DeleteModal;