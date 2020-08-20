const { Router } = require('express');
const path = require('path');
const { getUsers, saveUsers } = require('../db/database');

const homeRoute = Router();

homeRoute.get('/api/users', (req, res) => {
  getUsers()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.error(err));
});

homeRoute.post('/api/users', (req, res) => {
  saveUsers(req.body)
    .then(() => {
      console.log('users have been saved');
      res.end();
    })
    .catch((err) => console.error(err));
});

//
module.exports = {
  homeRoute,
};
