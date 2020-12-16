'use strict'

const bot = require('../src/app.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTMLParser = require('node-html-parser');

// const requestUrl = 'https://jsonplaceholder.typicode.com/posts';

//add config for keyboard  
const keyboard = [
    [
      {
        text: 'Статистика', 
        callback_data: 'statistic'
      }
    ],
  ];

  // event handler for sending us any message
bot.on('message', (msg) => {
  const chatId = msg.chat.id; 

  //send message with keyboard and resend message when using keyboard
  bot.sendMessage(chatId, 'Здравствуйте! Ваши пожелания?', {
        reply_markup: {
            inline_keyboard: keyboard
            
        }
    });
});


function gettingStatistics(method,requestUrl) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, requestUrl, true);
        xhr.onload = function() {
            console.log(xhr.responseText);
        xhr.responseType = 'json';
        console.log(xhr.response);
        xhr.send();
        }
    }


// keyboard press event handler
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let statistic;

    if (query.data === 'statistic') { 
        statistic = gettingStatistics('GET','https://pravonazemliu.org/api/1.0.0/statistics');
        console.log(statistic);
    }

    if (statistic) {
        bot.sendMessage(chatId, statistic, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Не получаеться, давай попробуем ещё раз?', { 
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });
  bot.on("polling_error", (err) => console.log(err));
