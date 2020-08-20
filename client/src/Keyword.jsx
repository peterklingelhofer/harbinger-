import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Keyword ({ keyword }) {

  // const [reviews, setReviews] = useState(reviews);
  // useEffect((e) => {
  //   console.log('e: ', e);
  //   axios({
  //     method: 'get',
  //     url: `/review/retrieve/${e.target.id}`,
  //   })
  //     .then(({ data }) => {
  //       setReviews(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  const handleClick = (e) => {
    console.log('e: ', e.target.id);
    const input = e.target.id;
    axios({
      method: 'get',
      url: `/review/retrieve/${input}`,
    })
      .then(({ data }) => {
        console.log("DATABASE KEYWORD SEARCH RETURN: ", data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    // <div id={keyword} onClick={(e) => {useEffect(e)}}>
    <div id={keyword} onClick={(e) => {handleClick(e)}}>
      {keyword}
    </div>
  )
};
