import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review.jsx';
import MakeComment from './MakeComment.jsx';

/**
 * A component for holding a list of the reviews. It makes the database call and
 *  maps the indiviual review componenets to the page. These are displayed on the
 * homepage.
 */
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/review/retrieve',
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
      {!reviews.length ? 'loading' : reviews.map((item) => (
        <div>
          <Review key={item.id} info={item} />
          <MakeComment />
        </div>
      ))}

    </div>
  );
};

export default ReviewList;
