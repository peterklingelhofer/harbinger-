import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A functional component to display users comments on other users website reviews.
 * The component will make a GET request to database to retrieve the saved user review comments
 * in the Comments table of the db.
 * Review comments are displayed inside of the user website review they are linked with.
 */
const DisplayComment = ({ comments }) => (
  <div>
    <h3>User Review Comments</h3>
    {!comments.length ? 'no review comments yet' : comments.map((comment) => (
      <div
        style={{
          borderStyle: 'ridge',
          borderColor: 'grey',
          maxWidth: '1000px',
          paddingLeft: '10px',
        }}
        key={comment.id}
      >
        <img src={comment.User.image} alt="Can't load file" width="100" height="100" />
        <figcaption style={{ fontWeight: 'bold' }}>{comment.User.username}</figcaption>
        <p style={{ fontFamily: 'Arial' }}>{comment.message}</p>
      </div>
    ))}
  </div>
);
export default DisplayComment;
