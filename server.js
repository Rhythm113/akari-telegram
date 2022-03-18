const { Telegraf, Markup } = require('telegraf')

//const bot = new Telegraf("1370810534:AAFL0jZUnzmC7_muqiiT2L-_5wDMItqIziA");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, "hello there! I'm Akari. Mechine Learning AI ChatBOT. I'm created by @InfinityCreators1.", {
    })
})

const axios = require('axios')



bot.on('message', (ctx) => axios
.get('https://www.kukiapi.xyz/api/akari/' + encodeURI(ctx.message.from.first_name) + '/message=' + encodeURI(ctx.message.text))
.then(res => {
  ctx.telegram.sendMessage(ctx.message.chat.id, res.data.reply)
  //console.log(res)
  console.log("Message : " + ctx.message.text)
  console.log(`Reply: ${res.data.reply}`)
})
.catch(error => {
  ctx.telegram.sendMessage(ctx.message.chat.id, "Server Error !")
  console.error(error)
})
)
bot.on('sticker', (ctx) => ctx.reply('👍'))
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
console.log("Server Running")

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
