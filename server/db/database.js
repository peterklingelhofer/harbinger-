const { Sequelize, TableHints } = require('sequelize');
const { WebSearchModels } = require('azure-cognitiveservices-websearch');
// const { default: Reviews } = require('../../client/src/reviews');
require('dotenv').config();
// create a connection to localDB

const db_name = process.env.DB || 'harbinger';
const db_user = process.env.DB_User || 'root';
const db_pass = process.env.DB_Pass || '';
const db_host = process.env.HOST || 'localhost';

// Alternate between production db or local db
const db = process.env.PRODENV === 'gcloud' ? new Sequelize(db_name, db_user, db_pass, {
  host: `/cloudsql/${process.env.HOST}`,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: `/cloudsql/${process.env.HOST}`,
  },
})
  : new Sequelize(db_name, db_user, db_pass, {
    host: db_host,
    dialect: 'mysql',
  });

db.authenticate()
  .then(() => {
    console.log('database connected!!!!');
  })
  .catch((err) => console.error(err));

const Users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(50),
  },
  serial: {
    type: Sequelize.STRING(100),
  },
  bio: {
    type: Sequelize.STRING(1000),
  },
  image: {
    type: Sequelize.STRING(250),
  },
});
Users.sync();

const Message = db.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_sender: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  id_recipient: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  message: {
    type: Sequelize.STRING(2000),
  },
  date: {
    type: Sequelize.DATE,
  },
});

const Followed = db.define('Followed', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_follower: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  id_author: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
});

const RevLike = db.define('RevLike', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_follower: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  id_author: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
});

const Review = db.define('Review', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(100),
  },
  likes: {
    type: Sequelize.INTEGER,
  },
  dislike: {
    type: Sequelize.INTEGER,
  },
  text: {
    type: Sequelize.STRING(2020),
  },
  rating: {
    type: Sequelize.INTEGER,
  },
  UserId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  WebUrlId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  date: {
    type: Sequelize.DATE,
  },
});
Review.sync();

const WebUrls = db.define('WebUrls', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: Sequelize.STRING(500),
  },
});
WebUrls.sync();

const Keyword = db.define('Keyword', {
  KeywordId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  keyword: {
    type: Sequelize.STRING(100),
  },
  ReviewId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
}, { timestamps: false });
Keyword.sync();

// Merging
// created new table in DB to persist users comments on other users website reviews
const Comment = db.define('Comment', {
  id: { // sqeualize id number auto generated
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  message: { // users typed comment on reviews
    type: Sequelize.STRING(256),
  },
  id_user: { // id number of specific user making comment
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  // figure out what other fields are needed in this table and what other tables it must connect to
  id_review: { // id number of review to link user comment with
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
});
Comment.sync();

// TESTING TO SEE IF I CAN FIX DB LINKS
Review.belongsTo(Users, { as: 'User', constraints: false });
Review.belongsTo(WebUrls, { as: 'WebUrl', constraints: false });
Keyword.belongsTo(Review, { as: 'Keyword', constraints: false });
Review.hasMany(Keyword, { as: 'keywords' });
db.sync();

// helper function to save users review comments to the "Comments" table in the harbinger DB
const saveReviewComments = (message, idUser, idReview) => Comment.create({
  message,
  id_user: idUser,
  id_review: idReview,
});
// .then((savedComment) => {
//   console.log('comment successfully saved in DB');
//   console.log(savedComment);
// })
// .catch((error) => { throw error; });

const findArticleByKeyWord = (keyword) => Keyword.findOne({ where: { keyword } }).then((data) => {

/**
 * Database helper to find reviews by keyword
 */
const findArticleByKeyWord = (keyword) => Keyword.findAll({
  where: {
    keyword,
  },
})
  .then((data) => {
    console.log('FOUND KEYWORDS: ', data);
    if (data === null) {
      console.log('KEYWORD NOT FOUND');
    } else {
      const id = data.map((result) => result.dataValues.ReviewId);
      console.log('REVIEW IDS: ', id);
      return Review.findAll({
        where: {
          id,
        },
        include: { model: Keyword, as: 'keywords' },
      })
        .then((data) => data)
        .catch((err) => console.log(err, 'SOMETHING WENT WRONG'));
    }
  })
  .catch((err) => console.log('ERROR: ', err));

const saveOrFindKeyWord = (keyword, idReview) => Keyword.create({ keyword, ReviewId: idReview })
  .then((data) => data)
  .catch((err) => console.log(err));

const saveOrFindWebUrl = (url) => WebUrls.findOne({ where: { url } })
  .then((data) => {
    if (data === null) {
      console.log('webURL created!');
      return WebUrls.create({ url });
    }
    return data;
  })
  .catch((err) => console.log(err));

const saveUsers = (username, serial, bio, image) => Users.findOne({ where: { serial } }).then((data) => {
  if (data === null) {
    return Users.create({
      username,
      serial,
      bio,
      image,
    });
  }
});

const getUser = (id) => Users.findOne({ where: { serial: id } });

const getUserReviews = (name) => Users.findOne({ where: { username: name } }).then((data) => Review.findAll({
  where: {
    id_user: data.id,
  },
  include: [
    {
      model: Users,
      required: true,
    },
  ],
})
  .then((data) => data)
  .catch((err) => console.log(err, 'SOMETHING WENT WRONG')));


const saveReview = (username, title, text, weburl, keyword, rating) => {
  let idUser;
  let idWeb;
  return new Promise((resolve, reject) => {

    saveOrFindWebUrl(weburl).then((data) => {
      idWeb = data.dataValues.id;
      Users.findOne({ where: { username } }).then((data) => {
        idUser = data.dataValues.id;
        return Review.create({
          likes: 0,
          dislike: 0,
          UserId: idUser,
          title,
          text,
          rating,
          WebUrlId: idWeb,
          date: new Date(),
        }).then((data) => resolve(data));
      });
    });
  });
};

const findUserAndUpdateBio = (serial, bio) => Users.findOne({ where: { serial } }).then((user) => user
  .update({ bio })
  .then((data) => data)
  .catch((err) => console.log(err)));
const findUserAndUpdateImage = (serial, image) => Users.findOne({ where: { serial } })
  .then((user) => user.update({ image }))
  .then((data) => data)
  .catch((err) => console.log(err));


/**
 * Database helper to find the reviews joins with User, WebUrl, and Keywords
 */
const findTopReviews = () => new Promise((resolve, reject) => {
  Review.findAll({ include: [{ model: Users, as: 'User' }, { model: WebUrls, as: 'WebUrl' }, { model: Keyword, as: 'keywords' }] })
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateLikeInReview = (reviewId) => new Promise((resolve, reject) => {
  Review.findOne({ where: { id: reviewId } })
    .then((review) => {
      const { likes } = review;
      review.update({ likes: likes + 1 }).then(() => {
        resolve();
      });
    })
    .catch(() => {
      reject();
    });
});

const updateDislikeInReview = (reviewId) => new Promise((resolve, reject) => {
  Review.findOne({ where: { id: reviewId } })
    .then((review) => {
      const { dislike } = review;
      review.update({ dislike: dislike + 1 }).then(() => {
        resolve();
      });
    })
    .catch(() => {
      reject();
    });
});

const findUserAndUpdateUsername = (serial, username) => Users.findOne({ where: { serial } }).then((user) => user
  .update({ username })
  .then((data) => data)
  .catch((err) => console.log(err)));

const getWebUrls = (webIds) => WebUrls.findAll({
  where: {
    id: webIds,
  },
});

module.exports = {
  db,
  getUser,
  saveUsers,
  saveOrFindKeyWord,
  saveOrFindWebUrl,
  saveReviewComments,
  saveReview,
  findUserAndUpdateBio,
  findUserAndUpdateImage,
  findArticleByKeyWord,
  findTopReviews,
  updateLikeInReview,
  updateDislikeInReview,
  getUserReviews,
  findUserAndUpdateUsername,
  getWebUrls,
};



// INSERT INTO reviews (title, likes, dislike, text, UserId, WebUrlId, date, createdAt, updatedAt) VALUES ("google", "5", "2", "good site for used bike and tuba parts", "1", "1", "1000-01-01 00:00:00", "1000-01-01 00:00:00", "9999-12-31 23:59:59");
// INSERT INTO reviews (title, likes, dislike, text, UserId, WebUrlId, date, createdAt, updatedAt) VALUES ("nola.com", "1", "3", "good site for used bike and tuba parts", "1", "2", "1000-01-01 00:00:00", "1000-01-01 00:00:00", "9999-12-31 23:59:59");
// INSERT INTO reviews (title, likes, dislike, text, UserId, WebUrlId, date, createdAt, updatedAt) VALUES ("bikeforums", "2", "2", "good site for used bike and tuba parts", "1", "3", "1000-01-01 00:00:00", "1000-01-01 00:00:00", "9999-12-31 23:59:59");
// INSERT INTO reviews (title, likes, dislike, text, UserId, WebUrlId, date, createdAt, updatedAt) VALUES ("ebay", "5", "4", "good site for used bike and tuba parts", "1", "4", "1000-01-01 00:00:00", "1000-01-01 00:00:00", "9999-12-31 23:59:59");

// insert into WebUrls (url, createdAt, updatedAt) values ('https://google.com', "1000-01-01 00:00:00", "9999-12-31 23:59:59");
// insert into WebUrls (url, createdAt, updatedAt) values ('https://nola.com', "1000-01-01 00:00:00", "9999-12-31 23:59:59");
// insert into WebUrls (url, createdAt, updatedAt) values ('https://ebay.com', "1000-01-01 00:00:00", "9999-12-31 23:59:59");
// insert into WebUrls (url, createdAt, updatedAt) values ('https://bikeforums.net', "1000-01-01 00:00:00", "9999-12-31 23:59:59");

// insert into Keywords (keyword, ReviewId) values ('tuba', 3);
// insert into Keywords (keyword, ReviewId) values ('bike', 3);
// insert into Keywords (keyword, ReviewId) values ('parts', 3);
// insert into Keywords (keyword, ReviewId) values ('part', 3);
// insert into Keywords (keyword, ReviewId) values ('bike', 4);
// insert into Keywords (keyword, ReviewId) values ('cycling', 4);
// insert into Keywords (keyword, ReviewId) values ('news', 2);
// insert into Keywords (keyword, ReviewId) values ('new orleans', 2);

