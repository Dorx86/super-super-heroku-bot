// server.js
// where your node app starts
var port = Number(process.env.PORT || 8000);
// init project
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/app'));
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("Web app ready!");
  let channelobj = bot.channels.find("name","lounge");
  //console.log(channelobj);
});

app.use(bodyParser.urlencoded( {extended: false }));
app.use(bodyParser.json());
// http://expressjs.com/en/starter/basic-routing.html
const hook = new Discord.WebhookClient('269906337620688897','g1vigCQ2YOe3Qtg7lNKItA9iWSj33k2MV8ovfuxvrttGE9oLrNiKqMUM8pzaeUOJakUk');
app.post("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  //console.log(request.headers);
  //let msg = request.headers.message;
  console.log("test");
  let msg = request.body.msg;
  hook.send(msg,{
    username:request.body.username,
    avatarURL:request.body.avatarURL
  }).then(function(){
    console.log("message sent");

  }).catch(console.error);
  response.end();
});

app.get("/lastmessage", function (request, response) {
  //console.log(request);
  //console.log(request.headers);
  let channel = request.headers.channel;
  //console.log(request);
  console.log(channel);

  let channelobj = bot.channels.find("name",channel);
  //console.log(channelobj);
  channelobj.fetchMessage(channelobj.lastMessageID)
  .then(function(message){
    console.log(message);
    response.send({
      channel:message.channel,
      id:message.id,
      member:message.member,
      author:message.author,
      content:message.content
    });
  })
  .catch(console.error);
});

bot.login(process.env.BOT_TOKEN);

hook.send("hi testing info",{
  username:"TestThing",
  avatarURL:"https://americanaddictioncenters.org/wp-content/uploads/2017/07/transgender_icon.jpg",
}).then(function(){
    console.log("message sent");

  }).catch(console.error);
