const express = require('express');
const app = express();

const userPoints = {};
const PORT = process.env.PORT || 5001;

app.get('/points', (req, res) => {
  const userId = req.query.userId;
  const points = userPoints[userId]?.points || 0;
  res.json({ points });
});

app.get('/watch', (req, res) => {
  const { userId, videoId } = req.query;

  if (!userPoints[userId]) {
    userPoints[userId] = { points: 0, watchedVideos: [] };
  }

  const video = videos.find(v => v.id === parseInt(videoId));
  if (video && !userPoints[userId].watchedVideos.includes(videoId)) {
    userPoints[userId].points += video.points;
    userPoints[userId].watchedVideos.push(videoId);
  }

  res.json({ points: userPoints[userId].points });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
