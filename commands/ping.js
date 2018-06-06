const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send("Pong");
    console.log("worker DOES run");
}

module.exports.help = {
  name:"ping"
}
