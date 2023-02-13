require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const fs = require('fs');
const textmsg = require('./text');
const Chat = require('./models/Chat')

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
);

const intervalfunc = (chatId, month, day, whom, name, add) => {
    let files = fs.readdirSync('./img');
    let images = files.filter(function(el) {
      return el.substring(el.length - 3) == 'jpg';
    });   
    let length = Math.floor(Math.random() * images.length);
    let img = __dirname + `/img/${length}.jpg`;

    let year = moment.tz("Europe/Kiev").year();
    const time = moment.tz("Europe/Kiev").valueOf();
    const timed = moment.tz([year, month, day], "Europe/Kiev").valueOf();
    let endDate;
    if(timed < time) {
        year += 1;
        endDate = moment.tz([year, month, day], "Europe/Kiev").valueOf();   
    } else {
        endDate = moment.tz([year, month, day], "Europe/Kiev").valueOf();
    }

    const timer = setInterval(function() {  
        let now = moment.tz("Europe/Kiev").valueOf();
        if (now >= endDate) {
            if (month === 1 && day === 14) {
                let image = __dirname + `/img/march.jpg`;
                bot.sendPhoto(chatId, image, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі дівчата, вітаю зі святом жіночої краси і чарівності, весняного натхнення і світлої радості! У день 8 березня від щирого серця бажаю постійного відчуття щастя, щоденної радості в душі, чарівних почуттів любові і ніжності, хорошого настрою і впевненості в собі!\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf37 \ud83c\udf37 \ud83c\udf37`});
            }
            if (month === 0 && day === 1) {
                let image = __dirname + `/img/newyear.jpg`;
                bot.sendPhoto(chatId, image, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати вас всіх з Новий роком та побажати щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
            }
            bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, ${add === 0 ? whom[0] : add === 1 ? whom[1] : whom[2]}, ${name} з днем народження та побажати щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
            year += 1;
            endDate = moment.tz([year, month, day], "Europe/Kiev").valueOf();
        }
    }, 1000);
}

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.setMyCommands([
    {command: "start", description: "Початок роботи бота"},
    {command: "say", description: "Сказати щось боту"}
])

Chat.find().then(chat => {
    let chats = chat;
    chats.forEach(c => {
        textmsg.members.forEach(member => {
            intervalfunc(c.chatId, member.month, member.day, textmsg.whom, member.name, member.add);
        })
    })
    
    bot.on('message', function(msg) {
        let chatId = msg.chat.id;
        let text = msg.text;
        
        if(!(chats.some(element => element.chatId === chatId))){
            if(text === '/start') {
                textmsg.members.forEach(member => {
                    intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
                });
                let title = msg.chat.title ? msg.chat.title : `${msg.from.username} chat`;
                bot.sendMessage(624965724, `Fuck: ID: ${chatId}, Who activeted: ${msg.from.username}, Title: ${title}`)
                chats.push({chatId: chatId, username: msg.from.username, title: title});
                const newChat = new Chat({
                    chatId: chatId,
                    username: msg.from.username,
                    title: title
                  });
                newChat.save()
            }
            if(text === '/start@IH_101_Birthdays_bot') {
                textmsg.members.forEach(member => {
                    intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
                });
                let title = msg.chat.title ? msg.chat.title : `${msg.from.username} chat`;
                bot.sendMessage(624965724, `Fuck: ID: ${chatId}, Who activeted: ${msg.from.username}, Title: ${msg.chat.title}`)
                chats.push({chatId: chatId, username: msg.from.username, title: msg.chat.title});
                const newChat = new Chat({
                    chatId: chatId,
                    username: msg.from.username,
                    title: title
                  });
                newChat.save()
            }
        } else if(chats.some(element => element.chatId === chatId)){
            let title = msg.chat.title ? msg.chat.title : `${msg.from.username} chat`;
            if(text === '/start') {
                bot.sendMessage(624965724, `Hui ${chatId} ${msg.from.username} ${title}`)
                bot.sendMessage(chatId, `@${msg.from.username}, чого тобі треба?`)
            }
            if(text === '/start@IH_101_Birthdays_bot') {
                bot.sendMessage(624965724, `Hui ${chatId} ${msg.from.username} ${title}`)
                bot.sendMessage(chatId, `@${msg.from.username}, чого тобі треба?`)
            }
        }
        if(text.split(' ')[0] === '/say') {
            let from = text.search(' ') + 1;
            let to = text.length;
            bot.sendMessage(624965724, `@${msg.from.username} ${chatId} СКАЗАВ: "${text.substring(from,to)}"`)
        }
        if(text.split(' ')[0] === '/say@IH_101_Birthdays_bot') {
            let from = text.search(' ') + 1;
            let to = text.length;
            bot.sendMessage(624965724, `@${msg.from.username} ${chatId} СКАЗАВ: "${text.substring(from,to)}"`)
        }
        if(text === '/getChats') {
            if(chats) {
                chats.forEach(chat => {
                    bot.sendMessage(chatId, `ID: ${chat.chatId}, Who activeted: ${chat.username}, Title: ${chat.title}`)
                })
            }
        }
        if(text === '/start_sasha') {
            if(!(chats.some(element => element.chatId === 661771210))){
                textmsg.members.forEach(member => {
                    intervalfunc(661771210, member.month, member.day, textmsg.whom, member.name, member.add);
                });
                let title = msg.chat.title ? msg.chat.title : `${msg.from.username} chat`;
                chats.push({chatId: 661771210, username: 'Sasha', title: 'Sasha private'});
                bot.sendMessage(chatId, `Done`)
                const newChat = new Chat({
                    chatId: 661771210,
                    username: 'Sasha',
                    title: 'Sasha private'
                  });
                newChat.save()
            } else {
                bot.sendMessage(chatId, `Have already`)
            }
        }
        if(text === '/start_group') {
            if(!(chats.some(element => element.chatId === -1001544778674))){
                textmsg.members.forEach(member => {
                    intervalfunc(-1001544778674, member.month, member.day, textmsg.whom, member.name, member.add);
                });
                let title = msg.chat.title ? msg.chat.title : `${msg.from.username} chat`;
                chats.push({chatId: -1001544778674, username: "It's me", title: 'Our group'});
                bot.sendMessage(chatId, `Done`)
                const newChat = new Chat({
                    chatId: -1001544778674,
                    username: "It's me",
                    title: 'Our group'
                  });
                newChat.save()
            } else {
                bot.sendMessage(chatId, `Have already`)
            }
        }
        if(text.split(' ')[0] === '/send') {
             const chatId = msg.chat.id
             let from = text.search(' ') + 1;
             let to = text.length;
             let txt = text.substring(from,to);
            if(chats.some(element => element.chatId === Number(txt.split(' ')[0]))){
                let id = Number(txt.split(' ')[0])
                from = txt.search(' ') + 1;
                to = txt.length;
                txt = txt.substring(from,to);
                bot.sendMessage(id, txt)
            } else {
                bot.sendMessage(chatId, `Not following yet`)
            }
        };
    });
    bot.onText(/\/follow (.+) (.+) (.+)/, (msg, match) => {
        const chatId = msg.chat.id
        if(!(chats.some(element => element.chatId === Number(match[1])))){
            textmsg.members.forEach(member => {
                intervalfunc(Number(match[1]), member.month, member.day, textmsg.whom, member.name, member.add);
            });
            chats.push({chatId: Number(match[1]), username: match[2], title: match[3]});
            bot.sendMessage(chatId, `Done`)
            const newChat = new Chat({
                chatId: Number(match[1]),
                username: match[2],
                title: match[3]
              });
            newChat.save()
        } else {
            bot.sendMessage(chatId, `Have already`)
        }
    });
    // bot.onText(/\/send (.+) (.+)/, (msg, match) => {
    //     const chatId = msg.chat.id
    //     if(chats.some(element => element.chatId === Number(match[1]))){
    //         bot.sendMessage(Number(match[1]), match[2])
    //     } else {
    //         bot.sendMessage(chatId, `Not following yet`)
    //     }
    // });
})