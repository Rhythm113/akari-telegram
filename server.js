const { Telegraf, Markup } = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, "hello there! I'm Akari. Mechine Learning AI ChatBOT. I'm created by @Rhythm113.", {
    })
})

bot.command('id', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, `Current Chat ID : ${ctx.chat.id}` , {
    })
})


bot.on('message', (ctx) => axios
.get('https://www.kukiapi.xyz/api/akari/' + encodeURI(ctx.message.from.first_name)  + `/message="${encodeURI(ctx.message.text)}"`)
.then(res => {

  ctx.telegram.sendMessage(ctx.message.chat.id, res.data.reply).catch((err) => console.log(err))
  //console.log(res)
  console.log("Message : " + ctx.message.text)
  console.log(`Reply: ${res.data.reply}`)
})
.catch(error => {
  ctx.telegram.sendMessage(ctx.message.chat.id, "Invalid Command or Internal Error")
  console.log(error)
})
)
bot.on('sticker', (ctx) => ctx.reply('👍'))
const http = require('http');
//Listener
const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('BOT Up & Running..');
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
console.log("Server Running")
//Launch
bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
//Loop to keep the BOT alive
function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}
while(true){
    sleep(60000, function() {
  console.log("Alive Task Running")
});}
