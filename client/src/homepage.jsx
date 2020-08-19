import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { styled } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { useForm } from 'react-hook-form';
import Search from './search.jsx';
import ReviewList from './ReviewList.jsx';

function HomePage() {
  const [user, setUser] = useState([]);
  const { handleSubmit } = useForm();
  // | Material UI style methods go here:
  //  \ be welcome to expand on the palethra of styles and add them to methods.
  //    \ use method as a tag to render the custom style.
  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 20,
    padding: '0 20px',
  });

  const Background = styled(Toolbar)({
    background: 'linear-gradient(45deg, #FE6242 30%, #FF2445 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'red',
  });

  useEffect(() => {
    axios.get('/good').then(({ data }) => {
      setUser(data);
    });
  }, []);

  const updateLike = (reviewId, type) => {
    //console.log(reviewId, type);

    axios.put(`/review/update/type=${type}`, {
      reviewId,
    }).then(() => {
      console.log('posted');
    });
  };

  const userLogout = () => {
    axios.get('/logout').then(() => {
      // console.log('logged out');
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
      <ReviewList />
    </div>
  );
}

export default HomePage;
