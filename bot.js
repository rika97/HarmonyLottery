require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || 'TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Userbase must be made in later step
const users = {};

// Command: /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to Harmony's Hold1 Bot! Use /register to register and /help for help.");
});

// Command: /help
bot.onText(/\/help/, (msg) => {
    const helpMessage = `
/register: Register
/addfriend <friend_id>: Add a friend
/starttrain: Start a new train
/jointrain: Join one of your friends' existing trains
/past: View past trains you've joined and winners
/wallet: View your wallet balance
`;

    bot.sendMessage(msg.chat.id, helpMessage);
});


// Command: /register
bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!users[userId]) {
        users[userId] = {
            chatId: chatId,
            tokens: 1000,
            friends: []
        };
        bot.sendMessage(chatId, `User ${userId} registered! You have been credited with 1000 ONE tokens.`);
        console.log('[UserAction] Pressed /register');
    } else {
        bot.sendMessage(chatId, `User ${userId} is already registered.`);
    }
});

// Command: /addfriend
// new friends (both sides) get 500 tokens
bot.onText(/\/addfriend (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const friendId = match[1];

    if (users[userId] && users[friendId]) {
        if (!users[userId].friends.includes(friendId)) {
            users[userId].friends.push(friendId);
            users[userId].tokens += 500;
            users[friendId].tokens += 500;
            bot.sendMessage(chatId, `Friend ${friendId} added! You receive 500 ONE tokens, and your friend receives 500 ONE tokens.`);
            console.log('[UserAction] Pressed /addfriend');
        } else {
            bot.sendMessage(chatId, `Friend ${friendId} is already added. You cannot receive tokens again for the same friend.`);
            console.log('[UserAction] Tried to add already added friend');
        }
    } else {
        bot.sendMessage(chatId, `Invalid user or friend ID.`);
        console.log('[UserAction] Invalid user or friend ID');
    }
});


// Command: /starttrain
bot.onText(/\/starttrain/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (users[userId]) {
        // Logic for starting a Hold1 Train
        bot.sendMessage(chatId, 'Hold1 Train started! Ask your friends to join.');
        console.log('[UserAction] Pressed /starttrain');
    } else {
        bot.sendMessage(chatId, 'You need to register first. Use /register.');
    }
});

// Command: /jointrain
bot.onText(/\/jointrain/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (users[userId]) {
        // Logic for joining a Hold1 Train
        bot.sendMessage(chatId, 'Select an existing train to join.');
        console.log('[UserAction] Pressed /jointrain');
    } else {
        bot.sendMessage(chatId, 'You need to register first. Use /register.');
    }
});

// Command: /past
bot.onText(/\/past/, (msg) => {
    const chatId = msg.chat.id;

    console.log('[UserAction] Pressed /past');
    // Logic for displaying past trains and winners
    bot.sendMessage(chatId, 'Here are the past trains: ...');
});

// Command: /wallet
bot.onText(/\/wallet/, (msg) => {
    const chatId = msg.chat.id;

    console.log('[UserAction] Pressed /wallet');
    // Logic for displaying wallet balance
    bot.sendMessage(chatId, 'Your wallet balance: ');
});

console.log('Bot is running...');
