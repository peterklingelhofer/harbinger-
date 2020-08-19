import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import { styled, Backdrop } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import ReviewList from './ReviewList.jsx';
import Review from './Review.jsx';

function Profile() {
  let username;
  const [user, setUser] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const { register, handleSubmit } = useForm();

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
    height: '10px',
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

  const onSubmit = (userBio) => {
    axios.post('/profile/bio', { bio: userBio }).then(({ data }) => {
      setUser(data);
    });
  };
  const imageSubmit = (imageUrl) => {
    axios.post('/profile/image', { image: imageUrl }).then(({ data }) => {
      // console.log(data);
      setUser(data);
    });
  };
  const usernameSubmit = (username) => {
    axios.post('/profile/username', { username }).then(({ data }) => {
      console.log(data);
      setUser(data);
    });
  };

  useEffect(() => {
    axios.get('/good').then(({ data }) => {
      // console.log(data, 'user');
      setUser(data);
      username = data.username;
    });
  }, []);

  // useEffect(() => {
  //   axios.get('/good').then(({ data }) => {
  //     // console.log(data.username, data, 'user');
  //     const { image } = data;
  //     axios.post(`/user/${username}`, {
  //       username,
  //     })
  //       .then((reviews) => {
  //         const userArray = [];
  //         reviews.data[1].forEach((review, index) => {
  //           review.username = reviews.data[0][index];
  //           review.webUrl = reviews.data[2][index];
  //           review.image = image;
  //           userArray.push(review);
  //           console.log(userArray, 'userArray');
  //         });
  //         setUserReviews(userArray);
  //       });
  //   });
  // }, []);

  const userLogout = () => {
    axios.get('/logout').then(() => {
      // console.log('logged out');
      window.location = '/';
    });
  };

  const updateLike = (reviewId, type) => {
    // console.log(reviewId, type);

    axios.put(`/review/update/type=${type}`, {
      reviewId,
    }).then(() => {
      console.log('posted');
    });
  };

  return (
    <div>
      <div>
        <Background>
          <h1
            style={{
              display: 'inline-block',
              color: 'white',
              marginRight: '400px',
            }}
          >
            {user.username}
          : Profile
        </h1>
          <Link to="/">
            <h1
              style={{
                display: 'inline-block',
                color: 'white',
                textAlign: 'right',
              }}
            >
              Back to Homepage
            </h1>
          </Link>
          <form onSubmit={handleSubmit(userLogout)}>
            <button><MyButton>Logout</MyButton></button>

          </form>
        </Background>

      </div>
      <ImageBG width="200">
        <div>
          <img
            src={user.image}
            style={{ position: 'absolute', marginBottom: '20px' }}
            width="150px"
            height="150px"
          />
          <h2 style={{ marginLeft: '300px', padding: '0px' }}>
            {user.username}'s Bio:
          </h2>
          <div style={{
            maxWidth: '700px', marginLeft: '300px', marginBottom: '10px', positon: 'absolute', padding: '20px',
          }}
          >
            {user.bio}
          </div>
          <img height="10" style={{ marginTop: '20px' }} />
        </div>
      </ImageBG>
      <ReviewBG style={{ marginTop: '20px' }}>
        <div style={{ display: 'inline-block' }}>
          <h3>Edit Image</h3>
          <form onSubmit={handleSubmit(imageSubmit)}>
            <textarea ref={register} name="imageUrl" />
            <button><MyButton>Submit Image</MyButton></button>
          </form>
        </div>
        <div style={{ display: 'inline-block', marginLeft: '100px' }}>
          <h3>Edit Bio</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea ref={register} name="message" />
            <button><MyButton>Submit Bio</MyButton></button>
          </form>
        </div>
        <div style={{ display: 'inline-block', marginLeft: '100px' }}>
          <h3>Edit Username</h3>
          <form onSubmit={handleSubmit(usernameSubmit)}>
            <textarea ref={register} name="username" />
            <button><MyButton>Submit Username</MyButton></button>
          </form>
        </div>
      </ReviewBG>
      <div>
        <div />
      </div>
      <Background><h1 style={{ marginLeft: "500px", color: "white" }}>My Reviews</h1></Background>
      <div>
        {!user.id ? null : <ReviewList userId={user.id} />}
      </div>
    </div>
  );
}

export default Profile;
