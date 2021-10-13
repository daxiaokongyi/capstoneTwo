### Tech stack: 
    React, Node.js
### This will be a full stack application
### This will be a website
### Goal: 
    The goal is to allow people use apple music with the information provided by Apple API
### Users: 
    The users will be all the people who love and enjoy music
### Data; 
    Data I’m going to use will be the information about albums, songs, artists, playlists, music videos, and the user’s most recently played content. And data will be collected through Apple Music API.
### Database schema: 
	    User table
	    Song table
	    Favorite table
    Each user should have its own favorite songs and recommended songs, and so on
    Each song should include artist, albums, music videos, and so on
### Issue might run into issue:
                Not all the songs include all the information such as album cover, image, or something else. If something cannot be found, then I need to catch the error, and solve it. For example, add a default image if no image of that song is found. Also songs searched in the search box may return nothing, then I need to create a 404, “cannot be found” page. Also input formats, such as foreign language, may not be accepted, and need to find a way to solve this error.   
### Sensitive information can be keys including Apple API Key and creating tokens
### Functionality can be: allow user sign up/in/out, and provide recommended songs based on user’s songs’ categories/style; allow user to search song or artist name
### User flow looks like register, sign in, update profile, search, save any song as his/her favorite, play preview song or videos, fetch recommandation list, and log out. 
Recommendation might be the feature more than a CRUD app at this point, can add more later. My stretch goals can be updating popular/recommended songs daily

### Github link: 
    https://github.com/daxiaokongyi/capstoneTwo
### API: 
    https://developer.apple.com/documentation/applemusicapi/