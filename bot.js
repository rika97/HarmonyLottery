require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || 'TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Command: /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to the Lottery Bot! Use /register to register.');
});

// Command: /register
bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    console.log('[UserAction] Pressed /register');

    bot.sendMessage(chatId, `User ${userId} registered!`);
});

// Command: /buyticket
bot.onText(/\/buyticket/, (msg) => {
    const chatId = msg.chat.id;

    console.log('[UserAction] Pressed /buyticket');
    // Logic for buying a ticket (e.g., interact with TON blockchain)
    bot.sendMessage(chatId, 'Ticket purchased!');
});

// Command: /draw
bot.onText(/\/draw/, (msg) => {
    const chatId = msg.chat.id;

    console.log('[UserAction] Pressed /draw');
    // Logic for drawing the lottery (e.g., pick a random winner)
    bot.sendMessage(chatId, 'The draw is complete! The winner is ...');
});

// Command: /winners
bot.onText(/\/winners/, (msg) => {
    const chatId = msg.chat.id;

    console.log('[UserAction] Pressed /winners');
    // Logic for displaying winners
    bot.sendMessage(chatId, 'Here are the winners: ...');
});

console.log('Bot is running...');
