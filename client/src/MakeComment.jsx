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
const MakeComment = ({ userId4Comments, ReviewId, ReviewIndex, appendComment }) => {
  const [value, setValue] = useState('');
  
  const saveComment = (event) => {
    // console.log(userId4Comments);
    // console.log('************saveComment***************');
    event.preventDefault();
    // { message: value, UserId: , ReviewId: }
    axios.post('/review/comments', { message: value, UserId: userId4Comments, ReviewId })
      .then(({ data }) => {
        const { savedComment, user } = data;
          savedComment.User = user;
        appendComment(savedComment, ReviewIndex);
        setValue('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  return (
    <div>
      <h3>Comment On Review</h3>
      <form className="review-comments" onSubmit={saveComment}>
        <textarea
          id="user-comment"
          className="user-review-comments"
          rows="10"
          placeholder="Your Thoughts Here!"
          value={value}
          onChange={handleChange}
        />
        <br />
        <button className="comments-button" type="submit">Make Comment</button>
      </form>
    </div>
  );
};

export default MakeComment;
