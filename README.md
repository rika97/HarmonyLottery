# Project Overview

Production Deploy on Telegram: @HarmonyLotteryBot

## Front-End
- **Framework**: React
- **Deployment**: [Netlify](https://hod1.netlify.app/) (Automatic deployment from `miniApp` branch)

## Back-End
- **Framework**: Express
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

# Notes
Previous testing stuff are stored on other branches (chat-based inetraction, lottery, etc)
