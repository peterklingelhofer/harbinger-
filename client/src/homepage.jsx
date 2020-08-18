import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import { styled, Backdrop } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
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

  const ReviewBG = styled(Box)({
    borderRadius: 3,
    height: 200,
    boxShadow: '0 3px 5px 2px #b81a06',
    backgroundColor: '#FAEBD7',
    color: 'black',
  });


  const LikeBG = styled(Box)({
    borderRadius: 3,
    height: 200,
    boxShadow: '0 3px 4px 2px gray',
    backgroundColor: '#9ACD32',
    color: 'black',
  });

  const DikeBG = styled(Box)({
    borderRadius: 3,
    height: 200,
    boxShadow: '0 3px 4px 2px gray',
    backgroundColor: '#F08080',
  });

  const ImageBG = styled(Box)({
    borderRadius: 7,
    boxShadow: '0 1px 30px 0px gray',
    color: 'black',
  });

  const TitleBox = styled(Box)({
    background: 'linear-gradient(45deg, #FE6534 30%, #FCD98D 90%)',
    borderRadius: 7,
    color: 'black',
  });

  useEffect(() => {
    axios.get('/good').then(({ data }) => {
      setUser(data);
    });
  }, []);

  const [topReviews, setTop] = useState([]);

  useEffect(() => {
    axios.get('/review/retrieve').then((reviews) => {
      console.log(reviews.data, 'Top');
      const topArray = [];
      reviews.data[1].forEach((review, index) => {
        review.username = reviews.data[0][index];
        review.webUrl = reviews.data[2][index];
        review.image = reviews.data[3][index];
        topArray.push(review);
      });
      setTop(topArray);
    });
  }, []);

  const [bottomReviews, setBottom] = useState([]);

  // useEffect(() => {
  //   axios.get('/review/retrieve/id=bottom').then((data) => {
  //     //console.log(data);
  //     setBottom(data);
  //   });
  // }, []);

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
