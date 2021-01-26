const Discord = require("discord.js");
const db = require("quick.db");


exports.run = async (client, message, args) => {

const kullanıcı = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor("DEAV v12 sürümüyle yeniden sizlerle.")
.setTitle(":star: DEAV Kullanıcı Komutları :star:")
 .setTimestamp()
.setDescription(":gear: **-avatar** = Avatarınıza bakarsınız. <a:developeremoji:749525084586115153> \n :gear: **-yetkilerim** = Yetkilerini görürsün. <a:developeremoji:749525084586115153> \n :gear: **-profil** = Profilini görürsün. <a:developeremoji:749525084586115153> \n :gear: **-sunucuresmi** = Sunucu resmini gösterir. <a:developeremoji:749525084586115153> \n :gear: **-ping** = Botun Pingine Bakarsın. <a:developeremoji:749525084586115153> \n :gear: **-id** = Birisinin id'sine Bakarsın. <a:developeremoji:749525084586115153> \n :gear: **-davet** = Beni Sunucuna Ekle. <a:developeremoji:749525084586115153> \n :gear: **-botbilgi** = Bot istatistiklerini görürsünüz. <a:developeremoji:749525084586115153> \n :gear: **-bug-bildir** = Yazdığınız bug'u yapımcılarıma bildirir. <a:developeremoji:749525084586115153>")
.setImage("https://media.discordapp.net/attachments/802564723744702534/802986760266448936/standard_1.gif")
message.channel.send(kullanıcı)
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
   aliases: [],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: 'kullanıcı',
  category: 'kullanıcı',
  description: 'Yardım Menüsü.',
   usage:'!kullanıcı'
}