import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { styled } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import Toolbar from '@material-ui/core/Toolbar';
import { useForm } from 'react-hook-form';
import Search from './search.jsx';
import ReviewList from './ReviewList.jsx';
import { MyButton, Background } from '../styles';

function HomePage() {
  const [user, setUser] = useState([]);
  const { handleSubmit } = useForm();

  useEffect(() => {
    axios.get('/good').then(({ data }) => {
      setUser(data);
    });
  }, []);

  const userLogout = () => {
    axios.get('/logout').then(() => {
      window.location = '/';
    });
  };

  return (
    <div>
      <div>
        <Background>
          <img src="https://i.redd.it/t2a08le9jzd11.png" width="10%" height="10%" style={{ filter: 'hue-rotate(300deg)', opacity: '50%' }}></img>
          <h2
            style={{
              display: 'inline-block',
              color: 'white',
              position: 'absolute',
              marginLeft: '60px'
            }}
          >
            Harbinger
        </h2>
          <img
            src={user.image}
            width='50px'
            height='50px'
            style={{
              display: 'inline-block',
              marginLeft: '800px',
              borderRadius: '50%',
              verticalAlign: 'middle',
            }}
          />
          <Link to='/me'>
            <h2
              style={{
                display: 'inline-block',
                color: 'white',
                textAlign: 'right',
              }}
            >
              {user.username}
            </h2>
          </Link>
          <form onSubmit={handleSubmit(userLogout)}>
            <button><MyButton>Logout</MyButton></button>

          </form>
        </Background>
      </div>
      <Search />
      <Background style={{ color: "white", marginLeft: "600px" }}>
        <h2>Top Best Reviews</h2>
      </Background>
      <ReviewList userId4Comments={user.id} />
    </div>
  );
}

export default HomePage;
