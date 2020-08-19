import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A functional component to display users comments on other users website reviews.
 * The component will make a GET request to database to retrieve the saved user review comments
 * in the Comments table of the db.
 * Review comments are displayed inside of the user website review they are linked with.
 */
const DisplayComment = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/review/comments',
    })
      .then(({ data }) => {
        console.log(data);
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

export default DisplayComment;
