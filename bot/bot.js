require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });
const frontendUrl = 'https://hod1.netlify.app/';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Click the link below to open the frontend:', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Open Frontend', url: frontendUrl }
      ]]
    }
  });
});
