// testing upstream
const { Router } = require('express');
const path = require('path');
require('../db/database');
const { saveOrFindKeyWord, findArticleByKeyWord, getWebUrls } = require('../db/database');

// const azure = require('server/azure.js');
const searchRoute = Router();
const { webSearchApiClient } = require('../azure.js');

// findArticleByKeyWord('apple.com');

searchRoute.post('/search', (req, res) => {
  let bingSearch;
  let dbSearch;
  if (req.user) {
    webSearchApiClient.web
      .search(req.body.clientSearch)
      .then((result) => {
        const properties = ['webPages'];
        for (let i = 0; i < properties.length; i++) {
          if (result[properties[i]]) {
            bingSearch = result;
          }
        }
      })
      .catch((err) => {
        throw err;
      })
      .then(() => findArticleByKeyWord(req.body.clientSearch))
      .then((data) => {
        if (data !== undefined) {
          const webUrls = [];
          // console.log(data[0].dataValues);
          const webIds = data.map((review) => review.dataValues.id_web);
          //console.log(webIds, 'this is a review!');
          getWebUrls(webIds)
            .then((websites) => {
              webIds.forEach((webId) => {
                websites.forEach((webObj) => {
                  if (webObj.dataValues.id === webId) {
                    webUrls.push(webObj.dataValues.url);
                  }
                });
              });
              console.log(webUrls);
              dbSearch = data;
              res.send([bingSearch, dbSearch, webUrls]);
            });
        } else {
          res.send([bingSearch, dbSearch]);
        }
      })
      .catch((err) => console.log(err, 'YOURE NOT GOOD AT PROMISES'));
  } else {
    res.status(401);
    res.send('unauthorized');
  }
});

module.exports = {
  searchRoute,
};
