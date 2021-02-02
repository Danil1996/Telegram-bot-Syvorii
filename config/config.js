"use strict";

//node modulse
const bot = require("../src/app.js");
const superagent = require("superagent");
const HTMLParser = require("node-html-parser");

// constant variables
const UrlPravoNaZemlu = "https://pravonazemliu.org/api/1.0.0/statistics";

//add config for keyboard
const keyboard = [
  [
    {
      text: "Статистика",
      callback_data: "statistic",
    },
  ],
];

// event handler for sending us any message
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  //send message with keyboard and resend message when using keyboard
  bot.sendMessage(chatId, "Здравствуйте! Ваши пожелания?", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

// promise with async/await (fn http get requst)
async function gettingStatistics(url) {
  const req = await superagent.get(url);
  return req.text;
}

// answer function
function answer(statisticBody, chatId) {
  if (statisticBody) {
    bot.sendMessage(chatId, `${statisticBody}`, {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } else {
    bot.sendMessage(chatId, "Не получаеться, давай попробуем ещё раз?", {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
}

// function for parsing the html page returned in after request
function parseDom(dom) {
  let root = HTMLParser.parse(dom);
  console.log("3", root.innerHTML);
  return root.innerText;
}

function responseHandler(response) {
  let firstIndex = response.indexOf("Ф");
  let responseLength = response.length;
  let answerLenght = responseLength - firstIndex;
  let answer = response.substr(firstIndex, answerLenght);
  return answer;
}

// keyboard press event handler
bot.on("callback_query", (query) => {
  const chatIdValue = query.message.chat.id;

  if (query.data === "statistic") {
    gettingStatistics(UrlPravoNaZemlu).then((result) => {
      result = responseHandler(parseDom(result));
      answer(result, chatIdValue);
    });
  }
});

//error event
bot.on("polling_error", (err) => console.log(err));
