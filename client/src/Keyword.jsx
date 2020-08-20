import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Keyword ({ keyword }) {

  const handleTagClick = (keyword) => {
    console.log('e.target.id: ', keyword);
    axios({
      method: 'get',
      url: `/review/retrieve/${keyword}`,
    })
      .then(({ data }) => {
        console.log("DATABASE KEYWORD SEARCH RETURN: ", data);
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id={keyword} onClick={(e) => {handleTagClick(e.target.id)}}>
      {keyword}
    </div>
  )
};
