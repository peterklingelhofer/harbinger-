/* eslint-disable arrow-body-style */
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
  findArticleByKeyWord,
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

// Keyword is the keyword to search by
reviewRoute.get('/retrieve/:keyword', (req, res) => {
  const { keyword } = req.params;
  findArticleByKeyWord(keyword).then((data) => {
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

// Saves a review and its keywords to the db (user and url saved to db in db file)
reviewRoute.post('/submit', (req, res) => {
  if (req.user) {
    getUser(req.user).then((data) => {
      const { text, title, weburl, keyword, rating } = req.body;
      return saveReview(
        data.dataValues.username,
        title,
        text.message,
        weburl,
        keyword,
        rating
      ).then((data) => {
        const keywords = keyword.split(", ");
        const saveKeywords = keywords.map((keyword) => {
          return saveOrFindKeyWord(
            keyword,
            data.dataValues.id,
          );
        });
        return Promise.all(saveKeywords);
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
