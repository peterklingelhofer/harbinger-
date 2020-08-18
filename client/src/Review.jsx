import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core';

const ImageBG = styled(Box)({
  borderRadius: 7,
  boxShadow: '0 1px 30px 0px gray',
  color: 'black',
});

const TitleBox = styled(Box)({
  background: 'linear-gradient(45deg, #FE6534 30%, #FCD98D 90%)',
  borderRadius: 7,
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

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 20,
  padding: '0 20px',
});

const Review = ({ info }) => (
  <div>
    <ImageBG width="200">
      <div >
        <img src={info.User.image} style={{ position: 'absolute', marginBottom: "20px", boxShadow: '0 3px 10px 2px gray', }} width='150px' height='150px' />
        <TitleBox>
          <h1 style={{ marginLeft: "200px", padding: "0px", color: "white" }}>{info.title}</h1>
        </TitleBox>
        <Link to={{ pathname: `/userProfile/name=${info.User.username}`, }}>
          <h4 style={{ marginLeft: "170px", padding: "0px" }}>
            {info.User.username || 'Jim'}'s Profile
          </h4>
        </Link>
        <a href={info.WebUrl.url} style={{ marginLeft: "170px", padding: "0px" }}>{info.WebUrl.url}</a>
        <div style={{ padding: "20px" }}>
          <div style={{ display: 'inline-block', marginLeft: "20px" }}>
            <LikeBG style={{ maxHeight: "20px", maxWidth: "400px", color: "white" }}>
              <h4 style={{}}>Likes:{info.likes}</h4>
            </LikeBG>
            <DikeBG style={{ maxHeight: "20px", maxWidth: "400px", color: "white" }}>
              <h4>{' '}Dislikes:{info.dislike}</h4>
            </DikeBG>
          </div>
          <div style={{ maxWidth: "700px", marginLeft: "50px", marginBottom: "30px", positon: "absolute", padding: "12px", display: 'inline-block' }}>{info.text}</div>
        </div>
        <img height="10" style={{ marginTop: "20px" }}></img>
      </div>
    </ImageBG>
    <button
      type="submit"
      onClick={() => { console.log(info.likes); }}
    >
      <MyButton>like</MyButton>
    </button>
    <button
      type="submit"
      onClick={() => { console.log(info.dislike); }}
    >
      <MyButton>dislike</MyButton>
    </button>
  </div>
);

export default Review;
