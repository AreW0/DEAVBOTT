const Discord = require("discord.js");
const client = new Discord.Client();

client.on("guildMemberAdd", (member, message) => {
  member.send(`:inbox_tray: Sunucumuza Hoşgeldin Seninle Birlikte ${message.guild.memberCount} Kişiyiz!`)
})