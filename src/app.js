'use strict'

// connect telergam-bot-api
const TelegramBot = require('node-telegram-bot-api'); 

// This is token given by telegram bot @BotFather
const token = '1467634524:AAHAgwZTKIziO8rSEfaOkX9FfPKj6Gwucuc'; 

const bot = new TelegramBot(token, {polling: true});

module.exports = bot;

const config = require('../config/config.js');
