const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();
process.env.NTBA_FIX_319 = 1
const textmsg = require('./text');
let img = __dirname + '/birthday.jpg'

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

const intervalfunc = (chatId, month, day, whom, name, add) => {
    let year = new Date().getFullYear();
    const time = new Date().getTime();
    const timed = new Date(year, month, day, 16, 14).getTime();
    let endDate = timed - time < 0 ? new Date(year+1, month, day, 08).getTime() : new Date(year, month, day, 16, 14, 05).getTime();
    //bot.sendMessage(chatId, `${time}a`)
    //bot.sendMessage(chatId, `${timed}b`)
    //bot.sendMessage(chatId, `${endDate}c`)
    const timer = setInterval(function() {  
        let now = new Date().getTime();
        let t = endDate - now;
        bot.sendMessage(chatId, `${now}a`)
        bot.sendMessage(chatId, `${t}b`)
        return 0
        // if (t < 0) {
        //     bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, ${add === 0 ? whom[0] : add === 1 ? whom[1] : whom[2]}, ${name} з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
        //     year += 1;
        //     endDate = new Date(year, month, day, 08).getTime();
        //     return 0;
        // }
    }, 1000);
}
bot.onText(/start(.+)/, (msg) => {
    let chatId = msg.chat.id;
    textmsg.members.forEach(member => {
        intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
    });
});
bot.on('message', (msg) => {
    let chatId = msg.chat.id;
    let text = msg.text;
    if(text === '/start') {
        textmsg.members.forEach(member => {
            intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
        });
    }
});