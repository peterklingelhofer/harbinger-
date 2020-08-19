import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

/**
 * A functional component to allow users to make comments on other users website reviews
 * The component will display a form with submit button, once the user has completed
 * writing their comments and hits submit button, it will make a PUT request to database
 * to save user review comments in the Comments table of the db.
 * Review comments are displayed inside of the user website review they are linked with
 */
const MakeComment = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios({
      method: 'post',
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
      <h3>Comment On Review</h3>
      <form className="review-comments" onSubmit={useEffect}>
        <textarea className="user-review-comments" rows="10" placeholder="Your Thoughts Here!" />
        <br />
        <button className="comments-button" type="submit">Make Comment</button>
      </form>
    </div>
  );
};

export default MakeComment;
