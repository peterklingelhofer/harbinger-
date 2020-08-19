import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { styled, Backdrop } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Rating from './Rating.jsx';

function Reviews(props) {
  const { register, handleSubmit } = useForm();
  const [reviews, setRev] = useState([]);
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
  let siteURL = window.location.href.split('site=');
  siteURL = siteURL[1];
  useEffect(() => {
    axios
      .post('/review/url', { weburl: siteURL })
      .then(() =>
        axios.get('/review/url').then(({ data }) => {
          const revArray = [];
          data[1].forEach((review, index) => {
            review.username = data[0][index];
            review.webUrl = data[2][index];
            review.image = data[3][index];
            revArray.push(review);
          });
          setRev(revArray);
        })
      )
      .catch((err) => console.error(err));
  }, []);
  const updateLike = (reviewId, type) => {
    // console.log(reviewId, type);

    axios
      .put(`/review/update/type=${type}`, {
        reviewId,
      })
      .then(() => {
        console.log('posted');
      });
  };
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post('/review/submit', {
        text: data,
        weburl: siteURL,
        title: document.getElementById('title').value,
        keyword: document.getElementById('keyword').value,
      })
      .then(() => {
        console.log('review posted!');
        window.location = '/me';
      });
  };

  const userLogout = () => {
    axios.get('/logout').then(() => {
      window.location = '/';
    });
  };

  return (
    <div>
      <Background>
        <h1 style={{ color: 'white', display: 'inline-block' }}>
          Leave a Review For {siteURL.split('//')[1].split('.com')[0]}
        </h1>
        <Link to="/">
          <h1
            style={{
              color: 'white',
              display: 'inline-block',
              marginLeft: '500px',
            }}
          >
            Back to Homepage
          </h1>
        </Link>
      </Background>
      {reviews.map((review) => {
        let count = 0;
        return (
          <div>
            <ImageBG width="200">
              <div>
                <img
                  src={review.image}
                  alt="Title Box"
                  style={{
                    position: 'absolute',
                    marginBottom: '20px',
                    boxShadow: '0 3px 10px 2px gray',
                  }}
                  width="150px"
                  height="150px"
                />
                <TitleBox>
                  <h1
                    style={{
                      marginLeft: '200px',
                      padding: '0px',
                      color: 'white',
                    }}
                  >
                    {review.title}
                  </h1>
                </TitleBox>
                <h4 style={{ marginLeft: '170px', padding: '0px' }}>
                  {' '}
                  Written By:
                  {review.username}
                </h4>
                <a
                  href={review.webUrl}
                  style={{ marginLeft: '170px', padding: '0px' }}
                >
                  {review.webUrl}
                </a>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'inline-block', marginLeft: '20px' }}>
                    <LikeBG
                      style={{
                        maxHeight: '20px',
                        maxWidth: '400px',
                        color: 'white',
                      }}
                    >
                      <h4 style={{}}>
                        Likes:
                        {review.likes}
                      </h4>
                    </LikeBG>
                    <DikeBG
                      style={{
                        maxHeight: '20px',
                        maxWidth: '400px',
                        color: 'white',
                      }}
                    >
                      <h4>
                        {' '}
                        Dislikes:
                        {review.dislike}
                      </h4>
                    </DikeBG>
                  </div>
                  <div
                    style={{
                      maxWidth: '700px',
                      marginLeft: '50px',
                      marginBottom: '30px',
                      position: 'absolute',
                      padding: '12px',
                      display: 'inline-block',
                    }}
                  >
                    {review.text}
                  </div>
                </div>
                <img
                  height="10"
                  alt="background"
                  style={{ marginTop: '20px' }}
                />
              </div>
            </ImageBG>
            <button
              type="submit"
              onClick={() => {
                if (count === 0) {
                  updateLike(review.id, 'like');
                  count = +1;
                }
              }}
            >
              <MyButton>like</MyButton>
            </button>
            <button
              type="submit"
              onClick={() => {
                if (count === 0) {
                  updateLike(review.id, 'dislike');
                  count = +1;
                }
              }}
            >
              <MyButton>dislike</MyButton>
            </button>
          </div>
        );
      })}
      <div style={{ marginLeft: '500px', backgroundColor: '#9ACD32' }}>
        <h1>Reviews Component</h1>
        <input id="title" type="text" placeholder="leave a title" />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Review:</label>
          <br />
          <textarea ref={register} name="message" />
          <br />
          <div>
            <Rating />
          </div>
          <div>
            Keywords help other users find other reviews associated with what
            they're searching!
          </div>
          <input id="keyword" type="text" placeholder="leave a keyword" />
          <br />
          <button style={{ marginBottom: '50px' }}>
            <MyButton>Submit Review</MyButton>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
