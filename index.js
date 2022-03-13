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
    const timed = new Date(year, month, day, 14, 11).getTime();
    let endDate = timed - time < 0 ? new Date(year+1, month, day, 08).getTime() : new Date(year, month, day, 14, 11, 05).getTime();
    const timer = setInterval(function() {  
        let now = new Date().getTime();
        let t = endDate - now;
        if (t < 0) {
            //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, ${add === 0 ? whom[0] : add === 1 ? whom[1] : whom[2]}, ${name} з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
            //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
            bot.sendMessage(chatId, 'ddd');
            year += 1;
            endDate = new Date(year, month, day, 08).getTime();
            return 0;
        }
    }, 1000);
}
//bot.onText(/start(.+)/, (msg) => {
    //let chatId = msg.chat.id;
    // textmsg.members.forEach(member => {
    //     intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
    // });
    //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, ${add === 0 ? whom[0] : add === 1 ? whom[1] : whom[2]}, ${name} з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
//});
bot.on('message', (msg) => {
    let chatId = msg.chat.id;
    let text = msg.text;
    if(text === '/start') {
        //textmsg.members.forEach(member => {
            //intervalfunc(chatId, member.month, member.day, textmsg.whom, member.name, member.add);
            //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, ${member.add === 0 ? textmsg.whom[0] : member.add === 1 ? textmsg.whom[1] : textmsg.whom[2]}, ${member.name} з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});           
            let year = new Date().getFullYear();
            //const time = new Date().getTime();
            //const timed = new Date(year, member.month, member.day, 14, 53).getTime();
            let endDate = new Date(year, 02, 13, 15, 10, 05).getTime();
            setInterval(() => {  
                let now = new Date().getTime();
                let t = endDate - now;
                //if (t < 0) {
                    //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, ${add === 0 ? whom[0] : add === 1 ? whom[1] : whom[2]}, ${name} з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
                    //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
                    bot.sendMessage(chatId, 'ddd');
                    year += 1;
                    endDate = new Date(year, 02, 13, 08).getTime();
                    //bot.sendMessage(chatId, year);
                    //bot.sendMessage(chatId, endDate);
                    //bot.sendMessage(chatId, now);
                    bot.sendMessage(chatId, t);
                //}
            }, 1000);
        //});
        //bot.sendPhoto(chatId, img, {caption: `\u2764\ufe0f \u2764\ufe0f \u2764\ufe0f \nЛюбі друзі, у цей чудовий день хотілось би привітати, з днем народження та побажати йому щастя, здоров'я, успіхів у житті й мирного неба над головою\ud83c\uddfa\ud83c\udde6))) \nЗі святом!!!!!!!\ud83c\udf89 \ud83c\udf89 \ud83c\udf89`});
    }
});