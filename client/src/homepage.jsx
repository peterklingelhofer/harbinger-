import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Search from './search.jsx';

function HomePage() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('/good').then(({ data }) => {
      setUser(data);
    });
  }, []);

  const [topReviews, setTop] = useState([]);

  useEffect(() => {
    axios.get('/review/retrieve/id=top').then((reviews) => {
      console.log(reviews.data, 'Top');
      const topArray = []
      reviews.data[1].forEach((review, index) => {
        review.username = reviews.data[0][index]
        topArray.push(review)
      })
      setTop(topArray);
    })

  }, []);

  const [bottomReviews, setBottom] = useState([]);

  useEffect(() => {
    axios.get('/review/retrieve/id=bottom').then((data) => {
      console.log(data);
      setBottom(data);
    })

  }, [])

  //wanted to use this inside of useEffect

  return (
    <div>
      <div style={{ backgroundColor: '#800000' }}>
        <h2
          style={{
            display: 'inline-block',
            color: 'white',
            marginRight: '800px',
          }}
        >
          HomePage Component
        </h2>
        <img
          src={user.image}
          width="4%"
          height="4%"
          style={{
            display: 'inline-block', marginRight: '2px', borderRadius: '50%', verticalAlign: 'middle',
          }}
        />
        <Link to='/profile2'>
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
      </div>
      <Search />
      <h3 style={{ display: 'inline-block', marginRight: '800px' }}>
        Top Best Reviews
      </h3>
      {topReviews.map((review) => (
              <div>
                <div>
                  <h4>Username</h4>
                  <div>{review.username}</div>
                </div>
                <div>
                  <h4>Review</h4>
                <div>{review.text}</div>
                </div>
                <br></br>
              </div>
            ))}
      <h3 style={{ display: 'inline-block', textAlign: 'right' }}>
        Top Worst Reviews
      </h3>
    </div>
  );
}

export default HomePage;
