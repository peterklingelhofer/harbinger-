const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
require('./passport-setup');

const passport = require('passport');
const { searchRoute } = require('./routes/search');
const { homeRoute } = require('./routes/home');
const { profileRoute } = require('./routes/profile');
const { loginRoute } = require('./routes/login');
const { reviewRoute } = require('./routes/review');
const { userProfile } = require('./routes/userProfile');
const { getUser } = require('./db/database');
const { reviewComments } = require('./routes/comments');

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(multerMid.single('file'));
// per video tutorial @ 6:19
// figure out which dynamic values to give name and keys
app.use(
  cookieSession({
    name: 'login-session',
    keys: ['key1', 'key2'],
  }),
);
// per video tutorial @5:23
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/websites', searchRoute);
app.use('/profile', profileRoute);
// app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
app.use('/review', reviewRoute);
app.use('/user', userProfile);
app.use('/review', reviewComments);


let loggedin = false;
// app.use()
// video @ 12:37 is logged in function
const isLoggedIn = (req, res, next) => {
  // console.log(req, "this is the user");
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/', (req, res) => {
  if (loggedin === false) {
    res.redirect('/google');
  } else {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  }
});
// login failed attempt, change this to login again if it fails?
app.get('/failed', (req, res) => {
  res.send('You failed to login!');
});

// if successful login, send users to this page
app.get('/good', isLoggedIn, (req, res) => {
  // console.log(req.user, " IA MA JIS F");
  getUser(req.user)
    .then((account) => {
      //console.log(account, ' testing account');
      res.send(account);
    })
    .catch((err) => { console.error(err); res.status(500).end(); });
});
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    loggedin = true;
    res.redirect('/');
  },
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  // redirect them to login page?
  console.log('hit logout')
  loggedin = false;
  res.redirect('/google');
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
module.exports = {
  app, isLoggedIn,
};
