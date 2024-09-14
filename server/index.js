const express = require('express');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const channelId = 'UCDfuhS7xu69IhK5AJSyiF0g';

app.use(cors({
    origin: 'https://hod1.netlify.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));
app.use(express.json());


// API
const userPoints = {};
userPoints["test"] = { points: 0, watchedVideos: [] }; // test user

const videos = [
    { id: 1, title: "The Defiant: The Case for DeFi", url: 'https://youtu.be/dnefSfsngI8?si=BALy5OoiJBhHbbls', points: 100 },
    { id: 2, title: "FREE tokens for $ONE holders (not clickbait) - Stafi Protocol", url: 'https://youtu.be/s8Qv76ta4QI?si=E0tYf9Pq3y5lF31S', points: 100 },
    { id: 3, title: "The Defiant: What's up with $YFI and yEarn?", url: 'https://youtu.be/tYnwsbXVd1A?si=w3Xe49EAC5YlwO8W', points: 100 },
    { id: 4, title: "The Defiant: the ultimate guide to Yield Farming in DeFi", url: 'https://youtu.be/m6NBKQ9gaes?si=j_qChGLxPuvVnfbB', points: 100 },
    { id: 5, title: "Harmony + BUSD – payment solutions for cross-border finance #crossfi", url: 'https://youtu.be/0Ztq0nyD6Wk?si=3DfNJWLHXcaBBL8Q', points: 100 },
    { id: 6, title: "Create a blockchain token in LESS than a minute: Harmony HRC20", url: 'https://youtu.be/3B0xP7zgQ7I?si=E1tZMQohPU1RIuwB', points: 100 },
    { id: 7, title: "DEFI yield opportunities on Compound using ONE and Switchain (live demo with BAT)", url: 'https://youtu.be/j4bbpqhldRo?si=_HrRhpnEnv62pMmp', points: 100 },
    { id: 8, title: "Binance Stablecoin BUSD: Explained", url: 'https://youtu.be/OrFxyV6YCjw?si=72UYhIMHXtMa_ZRl', points: 100 },
    { id: 9, title: "Harmony Grantee: MoneyHome", url: 'https://youtu.be/ewd1ekAgBPs?si=awURRMHxmHo5kPD7', points: 100 },
    { id: 10, title: "DeFi's next big thing: JellySwap", url: 'https://youtu.be/UyN6GiVdMLk?si=nvoNv-Ax6acGAczE', points: 100 },
    { id: 11, title: "The Defiant: The Curious Case of the CRV Launch", url: 'https://youtu.be/NWkjdfyyIso?si=CFr60zSlJWS0hpdc', points: 100 },
    { id: 12, title: "The Defiant: The Great Governance Wars of DeFi: Curve vs 1inch", url: 'https://youtu.be/PVc4WiazoyY?si=-Ca-K39ngPySIyYT', points: 100 },
    { id: 13, title: "The Defiant: The Greatest $MEME Ever Told", url: 'https://youtu.be/6c2GERwmZPk?si=10lPLMVr0KEJUCD7', points: 100 },
    { id: 14, title: "HACKATHON UPDATE: Iris, an Ethereum // Harmony DeFi Bridge demo", url: 'https://youtu.be/xca3-aIW29U?si=_Dkk2AwD9QTjHt2e', points: 100 },
    { id: 15, title: "The Defiant: $SUSHI - the ballad of Chef Nomi - DeFi’s greatest ever story", url: 'https://youtu.be/Rv8PBP7eGNg?si=kirA0p5EsIydaUFl', points: 100 },
    { id: 16, title: "The Future of DeFi: UniFi Multichain Protocol", url: 'https://youtu.be/hS8z9G33FPI?si=ZH_cwrG49kn_KvbO', points: 100 },
    { id: 17, title: "HORIZON: the Harmony // Ethereum Bridge is live on Mainnet", url: 'https://youtu.be/QVTFjb1aInA?si=9YKzJhIo8sVamOop', points: 100 },
    { id: 18, title: "SWOOP: the Harmony cross-chain dex", url: 'https://youtu.be/kwPvhFqZTqo?si=OknrMFN4H0RRXiJp', points: 100 },
    { id: 19, title: "The DEFIANT guide to DIGITAL ART", url: 'https://youtu.be/kNvqazLSzcs?si=KIsNf4uBB3kwmrdN', points: 100 },
    { id: 20, title: "DeFi 101: dApps, Common Uses, DeFi vs CeFi", url: 'https://youtu.be/kNvqazLSzcs?si=hxojQ18E7TCR6U4T', points: 100 },
    { id: 21, title: "DeFi101: Self Custody, Permissionlessness, Trust, Intermediaries, Censorship, P2P, & KYC", url: 'https://youtu.be/9x848YEaSV0?si=ihnd5zD59wQD2o0T', points: 100 },
    { id: 22, title: "DeFi 101: Interoperability, Bitcoin, Ethereum, Top Tools & Teams", url: 'https://youtu.be/0KLtM1f_3QI?si=QMcsghss4j88KKq0', points: 100 },
    { id: 23, title: "DeFi 101: MakerDAO, Aave, Compound, Perpetual Swaps", url: 'https://youtu.be/yp1X5HWEn64?si=1tdZeiNX2Ykzc_Su', points: 100 },
    { id: 24, title: "DeFi 101: AMMs, DEX Aggregators, Yield Farming", url: 'https://youtu.be/tVLrtcbvzzM?si=ur2eBE32lKIbpIT_', points: 100 },
    { id: 25, title: "DeFi 101: Yearn Finance, DEX vs CEX, Layer 1 & Layer 2, Algorithmic Stablecoins", url: 'https://youtu.be/YLKOmPHI7Cs?si=EyBfKhiqQomPiGoa', points: 100 },
    { id: 26, title: "DeFi 101: Derivatives, Options, Insurance", url: 'https://youtu.be/CaMgdEH6UME?si=8QRvZXCpr6Ljp3en', points: 100 },
    { id: 27, title: "DeFi 101: Risks, Top Resources, Adoption, Gas Fees, The Future", url: 'https://youtu.be/YhEtaR2dRDw?si=HYfvfPlr25g36eA-', points: 100 }
];

app.post('/initializeUser', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  if (!userPoints[userId]) {
    userPoints[userId] = { points: 0, watchedVideos: [] };
    console.log("userpoints initialized")
  } else {
    console.log("userpoints already existed: ", userPoints)
  }
  res.status(200).json({ message: 'User initialized' });
});


app.post('/registerWithReferral', (req, res) => {
  const { userId, referralId } = req.body;

  if (!userId || !referralId) {
    return res.status(400).json({ error: 'Invalid user ID or referral ID' });
  }

  if (!userPoints[referralId]) {
    return res.status(400).json({ error: `Invalid referral code: ${referralId}` });
  }

  if (userPoints[userId]) {
    return res.status(400).json({ error: 'User already registered' });
  }

  userPoints[userId] = { points: 1000, watchedVideos: [] };
  userPoints[referralId].points += 1000;
  res.status(200).json({ message: 'You have been registered with a referral! Both you and the referrer have received 1000 points.' });
});



app.get('/userpoints', (req, res) => {
  res.json({ userPoints });
});

app.get('/points', (req, res) => {
  const userId = req.query.userId;
  const points = userPoints[userId]?.points;
  res.json({ points });
});

app.get('/leaderboard', (req, res) => {
  const sortedUsers = Object.entries(userPoints)
    .map(([userId, data]) => ({ userId, points: data.points }))
    .sort((a, b) => b.points - a.points);

  res.json(sortedUsers);
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

app.get('/watchedVideos', (req, res) => {
  const { userId } = req.query;

  if (!userPoints[userId]) {
    return res.json({ videos: [] });
  }

  res.json({ videos: userPoints[userId].watchedVideos });
});

app.post('/updateWatchedVideos', (req, res) => {
  const { userId, videoId } = req.body;

  if (!userId || !videoId) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  if (!userPoints[userId]) {
    userPoints[userId] = { points: 0, watchedVideos: [] };
  }

  if (!userPoints[userId].watchedVideos.includes(videoId)) {
    userPoints[userId].watchedVideos.push(videoId);
  }

  res.status(200).json({ message: 'Watched video updated' });
});


app.get('/verify-subscription', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/subscriptions`, {
          params: {
              part: 'snippet',
              forChannelId: channelId,
              channelId: userId,
              key: youtubeApiKey
          }
      });

      if (response.data.items.length > 0) {
          res.json({ success: true, message: 'User is subscribed to the channel' });
      } else {
          res.json({ success: false, message: 'User is not subscribed to the channel' });
      }
  } catch (error) {
      console.error('Error verifying subscription:', error);
      res.status(500).json({ error: 'Failed to verify subscription' });
  }
});



// app.get('/youtube/viewcount', async (req, res) => {
//   const { url } = req.query;

//   const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

//   if (!videoIdMatch) {
//       return res.status(400).json({ error: 'Invalid YouTube URL' });
//   }

//   const videoId = videoIdMatch[1];

//   try {
//       const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${youtubeApiKey}`);

//       console.log('YouTube API response:', response.data);

//       const statistics = response.data.items[0]?.statistics;

//       if (!statistics) {
//         throw new Error('No statistics found for the video');
//       }

//       res.json({
//           viewCount: statistics.viewCount
//       });
//   } catch (error) {
//       console.error('Error fetching YouTube video statistics:', error);
//       res.status(500).json({ error: 'Failed to fetch video statistics' });
//   }
// });



app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// BOT
bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const referralId = match[1];
  const userId = chatId.toString();
  
  try {
    if (referralId) {
      const response = await axios.post('https://hod1-a52bc53a961e.herokuapp.com/registerWithReferral', { userId, referralId });
      
      if (response.status === 200) {
        bot.sendMessage(chatId, 'You have been registered with a referral! Both you and the referrer have received 1000 points.');
      } else {
        bot.sendMessage(chatId, `Referral registration failed: ${response.data.error}`);
      }
    } else {
      bot.sendMessage(chatId, 'Welcome! Click the link below to get started:', {
        reply_markup: {
          inline_keyboard: [[
            { text: 'Open Hod1', url: 'https://t.me/HarmonySocialBot/hod1app' }
          ]]
        }
      });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'An error occurred while processing your request. Please try again later.';
    console.error('Error handling /start command:', error.response ? error.response.data : error.message);
    bot.sendMessage(chatId, errorMessage);
  }
});


