## Title And URL
I-Music: URL

## What this website does
It allows user to search music information, be able to add a song to his/her own favorite list after registration, and get a recommendation list provided by the website. 

## List of features I implement

* It allows a user to sign up, sign in, and sign out; also allows user to edit his/her profile by providing correct password. 
* It allows user to retrirve information about songs, artists, albums, playlists, and music videos based on user's search content.
* After registration, a user can save or remove a song from his/her favorited song's list.
* After registration, the website can provide a recommendation list of songs to user based on his/her last favorite song's category. 

## Test 

* Front test files created in the src folder; type jest to test the front-end.
* Back test files created in the folder of helpers, middleware, models, routes, and backend; type jest to test the back-end.

## User Flow

* Database includes three tables: users, songs, favorites (relation between users and songs).
* Users table includes username, first name, last name, email, and password; songs table includes song's ID given by Apple Music Api, name of the aritst and song, and genre names. favorites table includes username from users table and song's id from songs table.
* For setting up the back end:
    * configure the environmental variables of Private_Key, Api_key_id, and Issuer_id, which provided by Apple Music Api, to created apple token in order to fetch its data. 
    * Secret_key is used with payload, such as username in this case, to create a token for user. 
    * Database_url used to create a database to store tables of users, songs, and favorites.
    * Port with 3001 used for running the server
* Importing libraries:
    * Node-pg used to specify a database to connect to depends on an environment  variable. For this application, if the environment is production, then connect to music db; if the environment is test, then connect to music_test db.
    * Redux imported to manage the states on the frontend.
* Edge cases:
    * Fetching with no result.
    * Search content type is invalid, for example, it's written in a foreign languge which API does not accept. 
    * Image is not found, which needs a default image instead.
    * Some search result may not have enough information I would like to display. For example, searching result does not have music videos list. 
    * a new user may type a duplicate username which is not allowed. 
    * Sign up/in and edit form has validation requirement. 
* How it works:
    In gerneral, the front end dispatches an action made from user; action then communicates with the server based on server's base url and its own endpoint. Routes on the server side then communicates with either model, which used to deal with database, or Apple Music Api. After getting the result or errors back, the components will be re-rendered with the new states from reducers. Also on the client side, importing persistedStore to keep store states from losing when the page is freshed; it's a good way to keep user's information for next time when user uses. 
* Tech stack:
    Javascript, HTML, CSS, React, Redux, PostgreSQL, BootStrap, JWT, schema, Jest

### Github link: 
    https://github.com/daxiaokongyi/capstoneTwo
### API: 
    https://developer.apple.com/documentation/applemusicapi/