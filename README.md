# Me_in_real_life_bot for telegram

https://t.me/me_in_real_life_bot

### Prerequisites

You need to have node.js and npm installed.

You'll also need to talk with https://t.me/BotFather to create a bot. Then copy the token.example.js file, rename it to token.js and paste your HTTP API token.

## Getting Started

Download the repository, configure your token.js file (see Prerequisites), and run
```
npm install
node bot.js
```

### Deploying

I use a raspberry pi and [PM2](http://pm2.keymetrics.io/) to make sure that the bot is always running

## Built With

* [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/)
* [node-persist](https://github.com/simonlast/node-persist/)
* [request](https://github.com/request/request/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
