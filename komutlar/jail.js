const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message, args) {//AreW
  let jailli = message.mentions.members.first()
  let sebep = args.slice(1).join(' ')
  let rol = ayarlar.jailROL
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu işlemi sadece yetkililer yapabilir')
   if(!jailli) return message.channel.send('Jaile atacağın kişiyi etiketlemelisin.')
  if(!sebep) return message.channel.send('Jail sebebini belirtmelisin.')
  
  var role = message.guild.roles.find(role => role.id === rol); 
  jailli.addRole(rol);
  
  let embed2 = new Discord.MessageEmbed()
  .setThumbnail(jailli.user.avatarURL)
  .setTitle(` :gear: • __\`Bir Kullanıcı Jaile Atıldı \`__   `)
  .setDescription(`
:gear: • __**\`Yetkili\`**__ ${message.author}
:gear: • __**\`Kullanıcı\`**__ ${jailli} 

:gear: • __**\`Jaile Atılma Sebebi\`**__ \n• __\`${sebep}\`__
`)
  
  let embed = new Discord.RichEmbed()
  .setTitle(` :gear: • __\`Kullanıcı Başarıyla Jaile Atıldı\`__   `)
  .setDescription(`:gear: • __**\`Yetkili\`**__ ${message.author}`)
  .setImage(`https://cdn.discordapp.com/attachments/522469528505155584/780040427616731136/simsek.gif`)
  message.channel.send(embed).then(m => m.delete(4000))
  client.channels.get(ayarlar.jailLOG).send(embed2)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['jail-ver'],
  permLevel: 0
};

exports.help = {
  name: 'jail'
};
//AreW