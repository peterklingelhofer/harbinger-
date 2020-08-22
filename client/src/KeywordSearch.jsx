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

function KeywordSearch({ passTagClick, userId }) {

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    passTagClick({
      keyword: data.tag,
      userId,
    });
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

export default KeywordSearch;
