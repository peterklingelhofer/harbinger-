import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Review from './Review.jsx';
import MakeComment from './MakeComment.jsx';

/**
 * A component for holding a list of the reviews. It makes the database call and
 *  maps the indiviual review componenets to the page. These are displayed on the
 * homepage.
 */
const ReviewList = ({ userId, userId4Comments }) => {
  const [reviews, setReviews] = useState([]);
  // Calls the sorting useEffect, call setSort([]) when you want to sort
  const [sort, setSort] = useState([]);

  // Initially gets all the reviews
  useEffect(() => {
    axios({
      method: 'get',
      url: '/review/retrieve',
      params: {
        userId,
      },
    })
      .then(({ data }) => {
        setReviews(data);
        setSort([]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // When sort is changed it sorts the current reviews
  useEffect(() => {
    const sortReviews = [...reviews]
      .sort((a, b) => ((+b.likes) - (+b.dislike)) - ((+a.likes) - (+a.dislike)));
    setReviews(sortReviews.reverse());
    console.log(sortReviews.reverse());
  }, [sort]);

  // Gets the reviews by the given tag
  const searchByTag = (tag) => {
    axios({
      method: 'get',
      url: `/review/retrieve/${tag}`,
    })
      .then(({ data }) => {
        setReviews(data);
        setSort([]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Calls the search by tag
  const onTagClick = (tag) => {
    searchByTag(tag);
  };

  return (
    <div>
      {!reviews.length ? 'loading' : reviews.map((item) => (
        <div key={item.id}>
          <Review
            info={item}
            passTagClick={onTagClick}
          />
          <MakeComment userId4Comments={userId4Comments} ReviewId={item.id} />
        </div>
      ))}

    </div>
  );
};

export default ReviewList;

ReviewList.propTypes = {
  userId: PropTypes.number,
};
