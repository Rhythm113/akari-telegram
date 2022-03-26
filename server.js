const { Telegraf, Markup } = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN);
//---------Inital Setup-------------------------//


if(process.env.HEROKU_URL == null){
var exec = require('child_process').exec;

exec('heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
}else{
    console.log("Welcome..")
}

//----------Commands-----------------------------//

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, `hello there! I'm ${process.env.BOT_NAME}. Mechine Learning AI ChatBOT. My owner is ${process.env.OWNER_NAME}.`, {
    })
})

bot.command('id', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, `Current Chat ID : ${ctx.chat.id}` , {
    })
})

//------------------------API-----------------------//

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
//--------Break------------------------------------------------------//
/*
bot.on('message', (ctx) =>   ctx.telegram.sendMessage(ctx.message.chat.id, "BOT is under Maintenence. It will be back soon :)").catch((err) => console.log(err)))
*/
//--------------------------------------------------------------------//
bot.on('sticker', (ctx) => ctx.reply('👍'))
const http = require('http');
//Listener
const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('BOT Up & Running..');
}
//------------------------Listener-----------------------------------//

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
console.log("Server Running")
console.log(`app url : ${process.env.HEROKU_URL}`)
//--------------Engine----------------------------------------------//
bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
//-------------------------Pinger----------------------------------//
//Keep Alive the node
var http2 = require("http");
setInterval(function() {
    http.get(process.env.HEROKU_URL);
    console.log("I'm Alive hehe")
}, 300000);
