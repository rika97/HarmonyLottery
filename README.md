# Website
 - Visit: https://rika97.github.io/HarmonyLotteryWebsite/
 - Repo: https://github.com/rika97/HarmonyLotteryWebsite

# Telegram Bot
Server is deployed on heroku.

How to run on local:
1. Create .env file, and add API keys as in .env.example
2. Run ```node bot.js```

# Rules
 - Rewards: new users (1000 ONE), new friends (500 ONE), new tasks (200 ONE).
 - Daily jackpots. Train keeps going until 10% price gain, someone must add tokens within 30 minutes.
 - Distribution: 50% random user in winning train, 50% community rewards.

# Tasks
- [ ] Create user database/management system, figure out userId assignment
- [ ] Figure out how to connect wallet and complete transactions on telegram
- [ ] Create smart contract for jackpot/lottery train (random winner, "Hold1 world")
- [ ] Logic for /starttrain
- [ ] Logic for displaying all friends' trains in /jointrain
- [ ] Logic to display all past trains you've joined
