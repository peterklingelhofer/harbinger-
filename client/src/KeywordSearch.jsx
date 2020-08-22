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

function KeywordSearch({ passTagClick }) {
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

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    passTagClick(data.tag);
    reset();
  };

  return (
    <div>
      <div style={{
        textAlign: 'center', verticalAlign: '-20px', marginLeft: '15.5px', marginBottom: '8px', marginTop: '5px',
      }}
      >
        <form onSubmit={handleSubmit((d) => onSubmit(d))}>
          <label>Search Reviews by Tag: </label>
          <input name="tag" ref={register} />
          <button><MyButton>Search Reviews</MyButton></button>
        </form>
      </div>
    </div>
  );
}
// ref={Review} ...from <input
export default KeywordSearch;
