# api_project

### HOW TO USE ###
1. Place unzipped file anywhere (i.e. under /Documents).
2. From Terminal go to the unzipped folder and run 'npm install'
(This should create "node_modules" folder).
3. From Terminal run 'node server.js' to start server.
4. Go to 'loclahost:8081' from browser.
######



This is the repository for Shintaro's API project.

Project Name: Shintaro's Bicycle YouTube channel.

API: YouTube data API
(https://developers.google.com/youtube/v3/getting-started)

Purpose: Users who love to watch <bicycle> related YouTube come to this site and browse YouTube videos organized by various criteria.

Technology in use: HTML/CSS/JS/jQuery/YouTubeDataAPI/node.js

Support: Chrome (Desktop and Mobile)

UI: See wireframe.HEIC file in this repository for the visual structure.

Limitation: Depends on the data availability of the API.  May not support some search criteria/pagination/mobile.
There may be some limitations for showing videos (country, language, minimum view,,,).

User scenario:
1. By default, user can see videos (up to 100?) sorted by date.
2. User can search videos by custom string (i.e. "Tour de France").
3. User can see videos sort by Date/Views/Ranking/....
4. User can have most of the functionality in mobile.
5. Clicking video tile should open the video on new tab.
