/**
 *  THIS ISN'T USED AND DOES NOTHING
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { json } from 'body-parser';
import { styled, Backdrop } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
//import { response } from 'express';

function UserProfile() {
  const { handleSubmit } = useForm();
  let username = window.location.href.split('name=');
  username = username[1].split('%20').join(' ');
  //console.log(username);
  let usernameReverse = username.split(' ').reverse().join(' ');

  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {

    console.log(username);
    axios.post(`/user/${username}`, {
      username: username,
    })
      .then((reviews) => {
        console.log(reviews.data);
        let userArray = [];
        reviews.data[1].forEach((review, index) => {
          review.username = reviews.data[0][index];
          review.webUrl = reviews.data[2][index];
          review.image = reviews.data[3].image;
          userArray.push(review);
        });
        setUserReviews(userArray);
      });

  }, []);

  const updateLike = (reviewId, type) => {
    // console.log(reviewId, type);

    axios.put(`/review/update/type=${type}`, {
      reviewId,
    }).then(() => {
      console.log('posted');
    });
  };

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

  const userLogout = () => {
    axios.get('/logout').then(() => {
      // console.log('logged out');
      window.location = '/';
    });
  };
  // useEffect(() => {
  //   let data = JSON.stringify({
  //     name: { username },
  //   });

  //   var config = {
  //     method: 'get',
  //     url: `http://localhost:8080/user/${username}`,
  //     headers: {},
  //     data: data,
  //   };

  //   axios(config).then((response) => {
  //     console.log(JSON.stringify(response.data));
  //     setUser(response.data);
  //   });
  // }, []);

  // TRYING TO RENDER THE review.User.image to the top
  // it will render in the map function
  // but it won't render once on it's own once i set the user with
  // the response data

  return (
    <div>
      <h1> {usernameReverse}'s Profile </h1>
      <Link to="/">
        <h1
          style={{
            display: 'inline-block',
            color: 'black',
            textAlign: 'right',
          }}
        >
          Back to Homepage
        </h1>
      </Link>
      <form onSubmit={handleSubmit(userLogout)}>
        <button><MyButton>Logout</MyButton></button>

      </form>

      {/* <img src={userReviews[0].User.image} width='5%' height='5%' /> */}
      <div className='userReviewed sites'>
        {/* {userReviews.map((review) => (
          <div key={review.id}>
            <br></br>
            <h2>{review.title}</h2>
            <div>{review.text}</div>
            <div>Likes: {review.likes}</div>
            <div>Dislikes: {review.dislike}</div>
          </div>
        ))} */}
        {userReviews.map((review) => {
          let count = 0;
          return (
            <ReviewBG key={review.id}>
              <br />
              <div>
                Written By:
                {review.username}
              </div>
              <div>
                Url:
                {review.webUrl}
              </div>
              <div>
                Likes:
                {review.likes}
              </div>
              <div>
                {' '}
                Dislikes:
                {review.dislike}
              </div>
              <br />
              <div>{review.title}</div>
              <div>{review.text}</div>
              <MyButton
                type="submit"
                onClick={() => {
                  if (count === 0) {
                    updateLike(review.id, 'like');
                    count = +1;
                  }
                }}
              >
                like
              </MyButton>
              <MyButton
                type="submit"
                onClick={() => {
                  if (count === 0) {
                    updateLike(review.id, 'dislike');
                    count = +1;
                  }
                }}
              >
                dislike
              </MyButton>

            </ReviewBG>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfile;
