'use strict'

// connect telergam-bot-api
const TelegramBot = require('node-telegram-bot-api'); 

// This is token given by telegram bot @BotFather
const token = '1467634524:AAHAgwZTKIziO8rSEfaOkX9FfPKj6Gwucuc'; 

const bot = new TelegramBot(token, {polling: true});

//add config for keyboard  
const keyboard = [
    [
      {
        text: 'Поздороватся', 
        callback_data: 'hello'
      }
    ],
    [
        {
          text: 'Попращатся',
          callback_data: 'goodBy'
        }
    ],
  ];

  // event handler for sending us any message
bot.on('message', (msg) => {
  const chatId = msg.chat.id; 

  //send message with keyboard and resend message when using keyboard
  bot.sendMessage(chatId, 'Привет! Чаво хочешь?', {
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// keyboard press event handler
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'hello') { 
        img = '../img/IMAGE 2020-11-02 10:25:30.jpg';
    }

    if (query.data === 'goodBy') { 
        img = '../img/IMAGE 2020-11-02 10:36:42.jpg';
    }

    if (img) {
        bot.sendPhoto(chatId, img, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { 
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });