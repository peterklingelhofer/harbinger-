import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function Search() {
  const searchBing = (query) => {
    const data = JSON.stringify(query);

    const config = {
      method: 'post',
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

  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 20,
    padding: '0 20px',
  });

  const WebBG = styled(Box)({
    borderRadius: 3,
    height: 100,
    boxShadow: '0 3px 5px 2px #b81a06',
    backgroundColor: '#FAEBD7',
    color: 'black',
  });

  const LikeBG = styled(Box)({
    borderRadius: 3,
    height: 200,
    boxShadow: '0 3px 4px 2px gray',
    backgroundColor: '#9ACD32',
    color: 'black',
  });

  const DikeBG = styled(Box)({
    borderRadius: 3,
    height: 200,
    boxShadow: '0 3px 4px 2px gray',
    backgroundColor: '#F08080',
  });

  const ImageBG = styled(Box)({
    borderRadius: 7,
    boxShadow: '0 1px 30px 0px gray',
    backgroundColor: '#FAEBD7',
    color: 'black',
  });

  const TitleBox = styled(Box)({
    background: 'linear-gradient(45deg, #FE6534 30%, #FCD98D 90%)',
    borderRadius: 7,
    color: 'black',
  });
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
          <label>Search:</label>
          <input ref={register} name="clientSearch" />
          <button><MyButton>Search websites</MyButton></button>
        </form>
      </div>
      <div className="reviewedSites list">
        {reviewedSites.map((review) => (
          <div>
            <ImageBG width="200" style={{ maxWidth: "500px" }}>
              <div>
                <img src={review.User.image} style={{ position: 'absolute', marginBottom: "20px", boxShadow: '0 3px 10px 2px gray', }} width='150px' height='150px' />
                <TitleBox>
                  <h1 style={{ marginLeft: "200px", padding: "0px", color: "white" }}>{review.title}</h1>
                </TitleBox>
                <Link to={{ pathname: `/userProfile/name=${review.User.username}` }}>
                  <h3 style={{ marginLeft: "170px", padding: "0px", color: 'black', }}>
                    {review.User.username || 'Jim'}
                  </h3>
                </Link>
                <a href={review.webUrl} style={{ marginLeft: "170px", padding: "0px" }}>{review.webUrl}</a>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: 'inline-block', marginLeft: "20px" }}>
                    <LikeBG style={{ maxHeight: "20px", maxWidth: "400px", color: "white" }}>
                      <h4 style={{}}>Likes:{review.likes}</h4>
                    </LikeBG>
                    <DikeBG style={{ maxHeight: "20px", maxWidth: "400px", color: "white" }}>
                      <h4>{' '}Dislikes:{review.dislike}</h4>
                    </DikeBG>
                  </div>
                </div>
                <img height="10" style={{ marginTop: "20px" }}></img>
              </div>
            </ImageBG>
            <button>
              <MyButton>like</MyButton>
            </button>
            <button>
              <MyButton>dislike</MyButton>
            </button>
            <Link to={{ pathname: `/review/site=${review.webUrl}`, }}>
              <button>See Review</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="webSitesList">
        {webSites.map((site) => (
          <WebBG key={site.id}>
            <br />
            <a href={site.url}>{site.url}</a>
            <br />
            <div>{site.snippet}</div>
            <Link to={{ pathname: `/review/site=${site.url}` }}>
              <button>Review Website!</button>
            </Link>
          </WebBG>
        ))}
      </div>
    </div>
  );
}

export default Search;
