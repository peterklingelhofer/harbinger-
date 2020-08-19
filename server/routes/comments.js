const { Router } = require('express');

const { saveReviewComments } = require('../db/database');

const reviewComments = Router();

/**
 * this route allows users to POST their comments on other users website reviews
 * saveReviewComments(body) - db helper function take and object
 * {Params} = {message, idUser, idReview}
 *  note - all input params can be found req.body
 * returns = object with 
 */

reviewComments.post('/comments', (req, res) => {
  const { message, idUser, idReview } = req.body;
  // console.log('Hit THe COMMEnts Route');
  console.log('*********Hit THe POST COMMEnts Route***********');
  saveReviewComments(message, idUser, idReview)
    .then((savedComment) => {
      res.send(savedComment);
    })
    .catch((error) => {
      res.status(500);
      res.send(error);
    });
});

reviewComments.get('/comments', (req, res) => {
  console.log('*********Hit THe GET COMMEnts Route***********');
});

module.exports = {
  reviewComments,
};
