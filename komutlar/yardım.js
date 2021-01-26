const Discord = require("discord.js");
const db = require("quick.db");


exports.run = async (client, message, args) => {

const yardım = new Discord.MessageEmbed()
.setColor("BLUE")
.setAuthor("DEAV Bot")
.setTitle(":star: DEAV'ın yardım menüsüne hoşgeldin! :star:")
 .setTimestamp()
.setDescription(":hammer: **-eğlence** = __Eğlence komutlarını görüntülersiniz.__ \n :gear: **-moderasyon** = __Moderasyon komutlarını görüntülersiniz.__ \n :zap: **-kullanıcı** = __Kullanıcı komutlarını görüntülersiniz.__")
.setImage("https://media.discordapp.net/attachments/802564723744702534/802986760266448936/standard_1.gif")
message.channel.send(yardım)
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
   aliases: ["help","y"],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: 'yardım',
  category: 'kullanıcı',
  description: 'Yardım Menüsü.',
   usage:'!yardım'
}