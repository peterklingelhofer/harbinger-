const { Router } = require('express');
require('../db/database');
const {
  saveReview,
  getUser,
  findTopReviews,
  updateLikeInReview,
  updateDislikeInReview,
  saveOrFindWebUrl,
  saveOrFindKeyWord,
} = require('../db/database');
const { rest } = require('lodash');

const reviewRoute = Router();
let changer = '';
reviewRoute.get('/url', (req, res) => {
  saveOrFindWebUrl(changer)
    .then((data) => {
      console.log(data.dataValues.id, 'this is data ofcourse');
      findTopReviews({ where: { id_web: data.dataValues.id } })
        .then((ddata) => {
          console.log('I AM DEHDDJDSK', ddata);
          res.send(ddata);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

reviewRoute.post('/url', (req, res) => {
  changer = req.body.weburl;
  console.log(changer, 'here I am in time');
  res.end();
});

// Tag is the tag to search by, nothing returns all reviews sorted by likes
// returns an array of Reviews, each with a User and a WebUrl
reviewRoute.get('/retrieve/:tag', (req, res) => {
  const { tag } = req.params;
  findTopReviews(tag).then((data) => {
    res.status(200).send(data);
  })
    .catch((err) => {
      res.status(500).send(err);
    });
});

reviewRoute.get('/retrieve', (req, res) => {
  findTopReviews().then((data) => {
    res.status(200).send(data);
  })
    .catch((err) => {
      res.status(500).send(err);
    });
});

reviewRoute.post('/submit', (req, res) => {
  if (req.user) {
    getUser(req.user).then((data) => {
      const { text, title, weburl, keyword, rating } = req.body;
      // console.log('**** STAR RATING HELLOOOOOOOO:', rating);
      return saveReview(
        data.dataValues.username,
        title,
        text.message,
        weburl,
        keyword,
        rating,
      ).then((data) => {
        saveOrFindKeyWord(
          keyword,
          data.id,
        );
      })
        .then(() => {
          res.status(201);
          res.send('review POST');
        });
    });
  } else {
    res.status(401);
    res.send('unauthorized');
  }
});
reviewRoute.put('/update/:type', (req, res) => {
  if (req.params.type === 'type=like') {
    updateLikeInReview(req.body.reviewId).then(() => {
      console.log('review updated!');
      res.status(204);
      res.end();
    });
  } else {
    updateDislikeInReview(req.body.reviewId).then(() => {
      console.log('review updated!');
      res.status(204);
      res.end();
    });
  }
});

module.exports = {
  reviewRoute,
};
