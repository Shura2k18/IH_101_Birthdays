require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const textmsg = require('./text');
let img = __dirname + '/birthday.jpg'

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

const intervalfunc = (chatId, month, day, whom, name, add) => {
    let year = new Date().getFullYear();
    const time = new Date().getTime();
    const timed = new Date(year, month, day, 22, 00).getTime();
    let endDate;
    if(timed < time) {
        //year += 1;
        endDate = new Date(year, month, day, 21, 44).getTime();   
    } else {
        endDate = new Date(year, month, day, 21, 44).getTime();
    }
    //let t = endDate - time;
    //bot.sendMessage(chatId, `${t}   a`)
    const timer = setInterval(function() {  
        let now = new Date().getTime();
        //let t = endDate - now;
        if (now > endDate) {
            //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, ${add === 0 ? whom[0] : add === 1 ? whom[1] : whom[2]}, ${name} з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
            bot.sendMessage(chatId, 'aaa')
            year += 1;
            endDate = new Date(year, month, day, 08).getTime();
        }
    }, 1000);
}
bot.onText(/start(.+)/, function(msg) {
    let chatId = msg.chat.id;
    textmsg.members.forEach(member => {
        intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
    });
});
bot.on('message', function(msg) {
    let chatId = msg.chat.id;
    let text = msg.text;
    if(text === '/start') {
        textmsg.members.forEach(member => {
            intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
        });
    }
});