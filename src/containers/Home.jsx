import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api';

import '../assets/styles/containers/Home.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Footer from '../components/Footer';

const Home = () => {
  const [state, setState] = useState({
    loading: true,
    data: undefined,
    error: null
  });

  const fetchData = () => {
    setState({loading: true, error: null})
    fetch(`${API}/get-images`)
      .then(response => response.json())
      .then(response => {
        setState({loading: false, data: response});
      })
      .catch(error => {
        setState({loading: false, error: error})
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadImage = e => {
    setState({...state, imageLoaded: true});
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
                      !state.imageLoaded && <Loader isImage/>
                    }
                    <img src={item.url} onLoad={handleLoadImage} alt="Image" className="list-item__img"/>
                  </Link>
                </li>
              )
            })
        }
      </ul>
      <Footer/>
    </>
  );
}

export default Home;