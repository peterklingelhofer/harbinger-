import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
  MyButton,
} from "../styles";
import Review from './Review';

function KeywordSearch() {
  // const searchByKeyword = (query) => {
  //   const data = JSON.stringify(query);

  //   const config = {
  //     method: 'get',
  //     url: '/api/websites/search',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data,
  //   };
  //   return axios(config)
  //     .then((response) => {
  //       console.log('RESPONSE IN KEYWORD SEARCH: ', response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const [reviews, setReviews] = useState([]);

  const handleSubmit = (data) => {
    console.log('KEYWORD SEARCH VALUE: ', data);

  };

  return (
    <div>
      <div style={{
        textAlign: 'center', verticalAlign: '-20px', marginLeft: '15.5px', marginBottom: '8px', marginTop: '5px',
      }}
      >
        <form onSubmit={(e) => { handleSubmit(e); }}>
          <label>Search Reviews by Tag: </label>
          <input name="tagSearch" />
          <button><MyButton>Search Reviews</MyButton></button>
        </form>
      </div>
    </div>
  );
}
// ref={Review} ...from <input
export default KeywordSearch;
