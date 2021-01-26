const Discord = require("discord.js");
const db = require("quick.db");


exports.run = async (client, message, args) => {

const mod = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor("DEAV Bot")
.setTitle(":star: DEAV Moderasyon Komutları :star:")
 .setTimestamp()
.setDescription(":gear: **-sil** = Yazdığınız miktarda mesajı siler. <a:developeremoji:749525084586115153> \n :gear: **-ban** = Etiketlediğiniz kişiyi banlarsınız. <a:developeremoji:749525084586115153> \n :gear: **-kick** = Etiketlediğiniz kişiyi atarsınız. <a:developeremoji:749525084586115153> \n :gear: **-duyuru** = Bota duyuru yaptırırsınız. <a:developeremoji:749525084586115153> \n :gear: **-küfür** = Küfür engel sistemini açarsınız. <a:developeremoji:749525084586115153> \n :gear: **-reklam** = Reklam engel sistemi açarsınız. <a:developeremoji:749525084586115153> \n :gear: **-slowmode** = Yavaş modu ayarlarsınız. <a:developeremoji:749525084586115153> \n :gear: **-forceban** = Birisine id ban atarsınız. <a:developeremoji:749525084586115153> \n :gear: **-unban** = Birisinin banını açarsınız. <a:developeremoji:749525084586115153> \n :gear: **-sa-as** = Bot biri sa dedimi cevap verir. <a:developeremoji:749525084586115153> \n :gear: **-sunucubilgi** = Sunucu bilgilerini görürsün. <a:developeremoji:749525084586115153> \n :gear: **-üyedurum** = Üyelerin durumlarını görürsün. <a:developeremoji:749525084586115153> \n :gear: **-çekiliş** = Çekiliş başlatırsınız. <a:developeremoji:749525084586115153>")
.setImage("https://media.discordapp.net/attachments/802564723744702534/802986760266448936/standard_1.gif")
message.channel.send(mod)
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
   aliases: ['mod'],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: 'moderasyon',
  category: 'kullanıcı',
  description: 'Yardım Menüsü.',
   usage:'!moderasyon'
}