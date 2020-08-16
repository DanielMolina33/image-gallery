import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api';

import '../assets/styles/containers/Home.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Footer from '../components/Footer';

import Logs from '../components/Logs';

const Home = () => {
  const [state, setState] = useState({
    loading: true,
    data: undefined,
    error: null,
    i: false
  });

  const fetchData = () => {
    setState({...state, loading: true, error: null})
    fetch(`${API}/get-images`)
      .then(response => response.json())
      .then(response => {
        setState({...state, loading: false, data: response});
      })
      .catch(error => {
        setState({...state, loading: false, error: error})
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadImage = () => {
    setState({...state, i: true});
    alert('Hola');
  }

  if(state.loading === true){
    return <Loader isContainer/>
  }

  if(state.error){
    return <Error/>
  }

  return (
    <>
      <div className="upload">
        <button className="button button-primary">
          <Link to="/upload">Upload new Image</Link>
        </button>
      </div>
      <ul className="list">
        {
          state.data.result.length === 0
            ? <p className="list-nothing-yet">There's nothing here yet 😅</p>
            :  state.data.result.map((item, index) => {
              return (
                <li key={index} className="list-item">
                  <Link to={`/details/${item.public_id.split('/')[1]}`}>
                    {
                      state.i === false && <Loader isImage/>
                    }
                    <img src={item.url} onLoad={handleLoadImage} alt="Image" className="list-item__img"/>
                  </Link>
                </li>
              )
            })
        }
      </ul>
      <Logs
        loading={state.loading}
        data={state.data.message}
        error={state.error}
        imageLoaded={state.i}
        id="1"
      />
      <Footer/>
    </>
  );
}

export default Home;