const TelegramBot = require('node-telegram-bot-api');
const token = require('./token.js')
const bot = new TelegramBot(token, { polling: true });
const storage = require('node-persist');
storage.initSync();
const chatIDs = require('./chatIDs.js');
const memes = require('./memes.js');
const request = require('request');


// Matches "/shutup"
bot.onText(/\/shutup/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ok, I will shut up. Send me any message if you want me to send spicy memes again');
  chatIDs.remove(chatId);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (chatIDs.add(chatId)) {
    bot.sendMessage(chatId, 'Hello! You have been added to the list. Send /shutup if you want me to shut up');
  }
});

setInterval(function () {
  memes.getSpicyMeme(function (meme) {
    var pic_stream = request.get(meme.data.url).on('error', function (err) { console.log(err); });
    chatIDs.list().forEach(function (chatId) {
      bot.sendPhoto(chatId, pic_stream, { caption: 'https://reddit.com' + meme.data.permalink });
    }, this);
  });
}, 1000);