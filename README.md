![🔎](https://github.com/SeniorTrails/harbinger-/raw/master/client/assets/imgs/searchLogo.png)

# harbinger-

Upvote and comment on your favorite websites!

Server-

- required express, body-parser, path, cors
- npm init -y
- npm install
- npm i -S express
- npm i -S cors
- npm i -S body-parser
- npm i -S nodemon
- index.js in server folder requires express and uses app.listen, defines the environmental variable 'PORT'
- package.json starts with the server/index.js file

Database Functions-

1. findArticleByKeyword
   Takes a keyword as parameter and finds a review stored which references that keyword.
2. saveOrFindKeyword
   Will store a keyword in the DB if not already found in there. It returns either the newly created Keyword object
   or the one that it found.
3. saveUsers
   This function will create a new User and store them in the database if they are not already in the DB. It is only called
   inside passport-setup.js on authentication. It takes a username, image, bio, and serial number. The username, serial number and image are found on the Google object we recieve during authentication. The bio is defaulted as 'bio goes here' and can be updated in the user profile page.
4. getUsers
   This function is called inside of app.js under the route '/good'. '/good' is the redirect route after successful authentication
   which renders either the newly-created user profile from 'saveUsers' or the profile we already have stored in the DB. It uses the serial number found on the user's cookie.
5. saveReview
   This function saves a review in the database. It is called in the /server/routes/review.js file under the route '/submit'. It returns a promise. First
   it finds or saves a keyword, and saves the keyword id value to the variable 'idKeyword'. This is because in our review table, three foreign keys are present, 'id_keyword', which references a keyword from the keywords table, id_web, which references a url from the webUrls table, and 'id_user', which references a user from the users table. Thus we only need the ids for these three fields. Then we save or find the web url, and save the id under 'idWeb'. Then we find the id_user with users.findOne: because nobody can use our site without having a user profile stored, we know we will find a user. We take these three id foreignkey values and store them inside of a review obj in the database.

6. findUserandUpdateBio
   This finds a user based on the serial number which is stored in their cookie. When a user logs in, they get a cookie, which contains a serial number unique to them which is also stored in the database in their user profile which references their google account. We use this, which is present in all the requests, to find their user object which is stored in the DB and to update its 'bio' field with the posted text of the bio. The function is called in '/profile/bio'

7. findUserandUpdateImage
   This finds a user based on the serial number which is stored in their cookie. When a user logs in, they get a cookie, which contains a serial number unique to them which is also stored in the database in their user profile which references their google account. We use this, which is present in all the requests, to find their user object which is stored in the DB and to update its 'image' field with the posted text of the bio. The function is called in '/profile/image'

8. findTopReviews
   This function renders the top reviews to the homepage. It grabs all reviews from the DB and sorts them based on likes. Then it creates two arrays, one for userIds and one for webIds. Each of these ids corresponds to each of the id_user and id_web in the review. Then we find the users who match the ids with User.findAll. Then we create an array, called usernames, which is filled with all the usernames in the given reviews. We match the userId with the id_user in the userObj and when there is a match, we push that username into usernames. As a result, we match each username to each review. Then below we repeat exactly the same process for webUrls and id_web(webIds). In the end, we send back three arrays, one of review objects, one of usernames and one of webUrls. These get combined in the homepage.jsx inside of the useEffect which contains an axios 'get' request to 'id=top' in order to update 'topReviews' in useState.

9. updateLikeInReview
   This returns a promise. It accepts a reviewId as a parameter, finds that review in the DB with review.findOne and updates its 'likes' field. It is called in the 'PUT' request in /server/routes/review.js under the route '/update/:type'. It is called from various files in the front end wherever a like or dislike is created.

10. updateDisikeInReview
    This returns a promise. It accepts a reviewId as a parameter, finds that review in the DB with review.findOne and updates its 'dislikes' field. It is called in the 'PUT' request in /server/routes/review.js under the route '/update/:type'. It is called from various files in the front end wherever a like or dislike is created.

Server Folders

1. app.js

2. azure.js
   In this file we require the module that allows us to use the cognitiveServices WebSearchAPIClient. We also define credentials and webSearchAPIClient which allow us to use a local instance of the web search client.

3. index.js
   In this file we require the server, 'app' and set it to listen on the PORT as defined in our process.env

4. passport-setup.js

Server Routes

1. home.js
   The instance of the express server route is named 'homeRoute'. Not sure what we are using these routes for if anything. need to investigate

2. login.js
   also not sure if we are using this

3. profile.js
   Here we have two POST request handlers which are used to update the user Bio and user Image. The code in '/bio' calls the DB function findUserAndUpdateBio, and updates the user bio in the DB. The code in '/image' calls the DB function findUserAndUpdateImage, and updates the user image in the DB.They are called on lines 15 and 20 of the profile.jsx folder respectively

4. review.js
   When hitting a save review you first hit the reviewRoute.post
   which allows you to get to the page if you're logged in
   When you're in you can save a review ->
   This has a post request for submitting a review
   if you're logged in, it retrieves the user stored in the database.
   It then returns the saveReview function in the db function
   and posts the review
   There is also a reviewRoute.put which is for updating likes & dislikes

5. search.js
   searchRoute.post/search
   post request: checks if you're logged in
   via if (req.user) cookie present.
   if yes -> webSearchApiClient.web called
   this is bing's search API, will retrieve an array
   of results pertaining to query.
   set results of query equal to bingSearch variable
   then() --> call findArticleByKeyWord:
   calls database function that retrieves any review
   written that pertains to this keyword.
   Stores the information in dbSearch variable
   when done, server will res.send both dbSearch + bingSearch

6. userProfile
   This has one GET request handler which will find the elements of a user's profile, NOT the user who is logged in. This is basically to handle the user story of clicking on somebody else's username and wanting to see their profile. It is called from the userProfile.jsx folder. It essentially only calls the DB function getUserReviews so they can be rendered on the 'profile' page.
-----------------------------------------------------------------------------
JSX ROUTES / REACT

1.) app.jsx
Handles all routes and paths, self explanitory.

2.) homepage.jsx
   The homepage component is responsible for rendering the list of Top Reviews which is the automatic redirect after the user logs in. The axios get request to the endpoint '/review/retrieve/id=top' retrieves the top reviews and sets the 'use state' for topReviews to topArray.
   updateLike is a function which sends a PUT request to the endpoint '/review/update/type=' in order to update either a like or a dislike on a given review.
   userLogout is a function that logs the user out and is called down below in the jsx html in a button. After the user session is destroyed, we are redirected to the homepage, which then redirects us back to the google oAuth login.

3.) index.jsx
standard index.jsx page, calls to render the App.jsx component

4.) login.jsx
testing page component, nothing here of importance

5.) profile.jsx
onSubmit is a function which makes an axios post request to '/profile/bio' in order to update the user bio
imageSubmit and usernameSubmit are also functions which update the user's image and username respectively.
The axios GET request in line 98 useEffect to '/good' grabs the user profile information. the axios POST request sends user information and receives their reviews back, setting the setUserReviews array to 'userArray'. 
userLogout logs the user out, as above.

6.) reviews.jsx
searchBing is the function that we call to hit the Cognitive Services Bing Search API. We make a post request to the endpoint '/api/websites/search' with the keyword we want to search. When the data from that search returns, we render the results to the page. Note that these results get rendered to the home page, because search only occurs as part of the homepage jsx.

7.) search.jsx
Function = Search : rendering part for the route
It's going to contain a function called searchBing
searchBing is the axios request that calls to the database. it's only parameter is the query the user submits.
Two states: webSites & reviewedSites
Each handle their respective data handling
WebSites coming from the bing search
Reviewed sites coming from the database
When retrieved the data will map out to the webpage and render appropriately.
Each search result will have a review button, clicking this
will lead you to a review page of hte website, you'll notice the data of the actual site link is passed through so the form is prefilled out.
There is also a button for each user that will lead you to their profile.

8.) testData.js
Dummy file for test Data

9.) userProfile.jsx

variable username = retrieves username from route
variable usernameReverse = username reversed to display properly on webpage (i.e. Sebastian Hove, not Hove Sebastian)

function UserProfile: Rendering component

state = userReviews

useEffect -> calls axios post for user info
Upon retrieval call setUserReviews to update state

function update like -> put request -> updates likes

HTML return calls mapping function which maps over the state of userReviews

2 buttons - updateLikes & dislikes
---------------------------------------------------------------------------------------

DATABASE SCHEMAS-
1. Users-
   serial- this is the unique identifier found each the google profile, accessable through authentication

2. Review
   id_user- This corresponds to the id key of the user who wrote the review
   id_web- the id of the webUrl stored in webUrls
   id_keyword- the id of the keyword stored in 'keywords'

3. WebUrls
   stores webUrls

4. Keyword
   stores keywords


