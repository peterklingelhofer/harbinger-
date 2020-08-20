import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ReviewList from './ReviewList.jsx';
import {
  MyButton,
  Background,
  ImageBG,
  profileImageStyle,
  profileBioStyle,
  ReviewBG,
} from '../styles';

function Profile() {
  let username;
  const [user, setUser] = useState({});
  // const [userReviews, setUserReviews] = useState([]);
  const { register, handleSubmit } = useForm();

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

  const userLogout = () => {
    axios.get('/logout').then(() => {
      // console.log('logged out');
      window.location = '/';
    });
  };

  return (
    <div>
      <div>
        <Background style={{ height: '10px' }}>
          <h1 style={{ display: 'inline-block', marginRight: '400px' }}>
            {`${user.username} : Profile`}
          </h1>
          <Link to="/">
            <h1 style={{ display: 'inline-block', textAlign: 'right' }}>
              Back to Homepage
            </h1>
          </Link>
          <MyButton onClick={userLogout}>Logout</MyButton>
        </Background>
      </div>
      <ImageBG width="200">
        <div>
          <img src={user.image} style={profileImageStyle} alt="profile" />
          <h2 style={{ marginLeft: '300px', padding: '0px' }}>
            {`${user.username}'s Bio:`}
          </h2>
          <div style={profileBioStyle}>
            {user.bio}
          </div>
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
      <Background><h1 style={{ marginLeft: '500px' }}>My Reviews</h1></Background>
      <div>
        {!user.id ? null : <ReviewList userId={user.id} />}
      </div>
    </div>
  );
}

export default Profile;
