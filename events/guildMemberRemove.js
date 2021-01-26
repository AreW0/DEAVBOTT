const Discord = require("discord.js");
const client = new Discord.Client();

client.on("guildMemberRemove", (member, message) => {
  member.send(`:outbox_tray: Sunucumuzdan Ayrıldı, Tekrardan Görüşmek Üzere.`)
})