const Discord = require('discord.js');

exports.run = (client, message, params) => {
  const embed = new Discord.MessageEmbed()
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**》 Yapımcım 《**", `<@606787214004846593>`)

 
  return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım'],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'Developed by AreW',
  usage: 'yapımcımm'
}