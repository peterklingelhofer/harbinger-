import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
  MyButton,
  WebBG,
  LikeBG,
  DisLikeBG,
  TitleBox,
} from "../styles";

function KeywordSearch() {
  const searchByKeyword = (query) => {
    const data = JSON.stringify(query);

    const config = {
      method: 'get',
      url: '/api/websites/search',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    return axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response));
        // console.log(JSON.stringify(response.data[1]), 'THIS IS DATA');
        // console.log(JSON.stringify(response.data));
        // console.log(JSON.stringifyresponse.data.webPages.value));
        console.log(response.data);
        webSitesUpdate(response.data[0].webPages.value);
        if (response.data[1] !== null) {
          let fullReviews = [];
          response.data[1].forEach((review, index) => {
            review.webUrl = response.data[2][index];
            fullReviews.push(review);
          })
          reviewedSitesUpdate(fullReviews);
        } else {
          reviewedSitesUpdate([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [webSites, webSitesUpdate] = useState([]);
  const [reviewedSites, reviewedSitesUpdate] = useState([]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    searchBing(data);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', verticalAlign: '-20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Search Reviews by Tag:</label>
          <input ref={register} name="clientSearch" />
          <button><MyButton>Search Reviews</MyButton></button>
        </form>
      </div>
    </div>
  );
}

export default KeywordSearch;
