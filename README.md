# Project Overview

Production Deploy on Telegram: @HarmonyLotteryBot

## Front-End
- **Framework**: React
- **Deployment**: [Netlify](https://hod1.netlify.app/) (Automatic deployment from `miniApp` branch)

## Back-End
- **Framework**: Express, Node.js, Axios
- **Deployment**: [Heroku](https://hod1-a52bc53a961e.herokuapp.com/) (Manual deployment with `git push heroku master`)
- **Components**: Includes both bot server and API server in `index.js`

### REST API Endpoints

- **GET /points**
  - **Parameters**: `userId`
  - **Description**: Retrieves the user's NIL balance (points).

- **GET /watch**
  - **Parameters**: `userId`, `videoId`
  - **Description**: Calls the function to mark a video as watched.

- **GET /watchedVideos**
  - **Parameters**: `userId`
  - **Description**: Retrieves the list of videos the user has watched.

- **POST /updateWatchedVideos**
  - **Parameters**: `userId`, `videoId`
  - **Description**: Updates the user's watched videos list.
 
- **GET /youtube/viewcount**
  - **Parameters**: `url`
  - **Description**: Fetches view count of specific youtube video from url

## Telegram MiniApp
- **Integration**: [Telegram MiniApp](https://t.me/HarmonyLotteryBot/hod1app)

# Tasks
- [ ] **Database**: Port user database from `index.js` server to an actual database.
- [ ] **Video Player**: Implement a video player to embed YouTube videos when clicked on "watch" button.
- [ ] **Verify watching video**: Implement a way to confirm the user has watched the video until the end, no skipping or just clicking on url.
- [ ] **UI Update**: Enhance the web UI for better visuals.
- [ ] **Video List Management**: Clean up and streamline the video list to allow updates from a single file.
- [ ] **TMA UI Improvement**: Enhance the Telegram Mini App UI with features such as back buttons and better navigation.
- [ ] Update bot details (change bot username)
- [x] Add inline keyboard menu button 'play'
- [x] Integrate Youtube API

# Notes
Previous testing stuff are stored on other branches (chat-based inetraction, lottery, etc)

# Instructions for replicating:
1. Install dependencies for both client and server:
```
npm i
```
2. Telegram: Create your bot with Telegram BotFather. Get API key, `touch .env` in `/server` (example given in .env.example). 
3. Server-side: Dpeloy to server-hosting or on local:
```
cd server
node index.js
```
4. Modify client-side API endpoint URLs in `client/App.js` with your PORT or deployed server URL.
5. Client-side: Deploy client side on hosting app. Make sure to add deploy setting `npm run build`. (Will need to be on hosting app, not local since need to connect through Telegram).
6. Give command to BotFather `/newapp` and register your Web App URL (front-end deploy link).
7. (Optional) Give command to BotFather `/setmenubutton` to add menu button to bot.

