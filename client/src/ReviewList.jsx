import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review.jsx';

/**
 * A component for holding a list of the reviews. It makes the database call and
 *  maps the indiviual review componenets to the page
 */
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/review/retrieve/null',
    })
      .then(({ data }) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {!reviews.length ? 'loading' : reviews.map((item) => <Review key={item.id} info={item} />)}
    </div>
  );
};

export default ReviewList;
