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
  const [updateHelpfulness, setUpdateHelpfulness] = useState(0);
  // Calls the sorting useEffect, call setSort([]) when you want to sort
  const [sort, setSort] = useState([]);

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

  useEffect(() => {
    const sortReviews = [...reviews]
      .sort((a, b) => ((+b.likes) - (+b.dislike)) - ((+a.likes) - (+a.dislike)));
    setReviews(sortReviews.reverse());
    console.log(sortReviews.reverse());
  }, [sort]);

  const searchByTag = (tag) => {
    console.log('e.target.id: ', tag);
    axios({
      method: 'get',
      url: `/review/retrieve/${tag}`,
    })
      .then(({ data }) => {
        console.log("DATABASE KEYWORD SEARCH RETURN: ", data);
        setReviews(data);
        setSort([]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onTagClick = (tag) => {
    searchByTag(tag);
  };

  return (
    <div>
      {!reviews.length ? 'loading' : reviews.map((item) => (
        <div>
          <Review key={item.id} info={item} setUpdateHelpfulness={setUpdateHelpfulness} passTagClick={onTagClick}/>
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
