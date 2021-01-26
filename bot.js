const fs=require('fs');
const Discord=require("discord.js");
const client=new Discord.Client();
const db = require('quick.db')
const moment = require("moment");
const ayarlar=require("./ayarlar.json");
const express = require('express');
/////
const app = express()
app.get('/', (req, res) => res.send("Bot Aktif"))
app.listen(process.env.PORT, () => console.log('Port ayarlandı: ' + process.env.PORT))
//////////////////



client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})


client.on("ready", () => {
  console.log(`Bütün komutlar başarıyla yüklendi!`);
  client.user.setStatus("dnd");
  client.user.setActivity('-yardım | -davet');
})


const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  
client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = -ayarlar.varsayilanperm  ;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};



client.on("message", async msg => {
    if(msg.author.bot) return;
    
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["https://","http://","discord.gg"];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                                       
                    return msg.channel.send(`${msg.author.tag}, Reklam Yapmak Yasak!`).then(msg => msg.delete(10000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });    


client.on("messageUpdate", msg => {
 
 
 const i = db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", 
                       "amk", 
                       "ananı sik iyim",
                       "piç",
                       "orospu çocuğu",
                       "orospu",
                       "oruspu"];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                         
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});
 


client.on("message", msg => {

  if(db.has(`sa-as.${msg.guild.id}`)) {

      if(msg.content.toLowerCase() == "sa" || msg.content.toLowerCase() == "slm" || msg.content.toLowerCase() == "mrb" || msg.content.toLowerCase() == "merhaba" || msg.content.toLowerCase() == "selam"||msg.content.toLowerCase() == "selamun aleyküm"||msg.content.toLowerCase() == "selamın aleyküm"||msg.content.toLowerCase() == "sea"||msg.content.toLowerCase() == "hop sa"||msg.content.toLowerCase() == "hop sea"||msg.content.toLowerCase() == "selamlar") {
          let embed = new Discord.MessageEmbed()
          .setFooter("")
          .setColor("RANDOM")
          .setDescription("<a:799988525050232892:802619372837273600>  Aleyküm Selam, Hoşgeldin")
          msg.channel.send(embed)
      }
  }
})
client.on("message", async msg => {

    let reklamacik = db.has(`reklamengel.${msg.guild.id}`)

    if (reklamacik) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
            const reklam = [".gq", ".tk", ".com", ".net", ".network", ".ml", ".gg", "http://", "https://", ".vip", ".xyz", ".site", ".design", ".cf", ".wtf", ".at", ".tr", ".de", ".online", ".one", ".shop", ".club", ".ws", ".shop", ".camera", ".cheap", ".org", ".lighting", ".plumbing", ".biz", ".auto", "info", ".guru"]
            if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                msg.delete()
                msg.channel.send("<@" + msg.author.id + ">" + " » Bu Sunucuda Reklam Filtresi Aktiftir <a:unlemv2:778001793065680896>")

                const embed = new Discord.MessageEmbed()
                .setTitle("Reklam Log")
                .setDescription(`<a:sariisaret:778001476672553010> » Reklam Atan: ${msg.author}\n<a:unlemv2:778001793065680896> » Reklam Bulunan Mesajı: `+"```"+ msg.content +"```"+`\n<a:yukleniyormavi:776898977408876565> » Reklam Atılan Kanal: ${msg.channel}`)
                .setFooter("DEAV")
                .setColor("BLACK")
                msg.guild.channels.cache.get("803228625271783443").send(embed)

            }
        }
    }
})
// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.addRole(kayıtsızROL)
})

/// kayıtsız rolü son
//AreW


// TAG LOG
client.on("userUpdate", async (oldUser, newUser) => {//AreW
  if (oldUser.username !== newUser.username) {
    let tag = ayarlar.tag
  
    let rol = ayarlar.tagROL;
    
    
    let embed1 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    let embed2 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    if (newUser.username.includes(tag) && !client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(ayarlar.tagLOG).send(embed1)
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).removeRole(rol)
      client.channels.get(ayarlar.tagLOG).send(embed2)
    }

  }
})
// TAG LOG SON
//AreW

// BOT OTOROL

client.on('guildMemberAdd', async member => {//AreW
if(member.user.bot)
member.setRoles(['İDSİ'])
})
// GİRİŞ 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.RichEmbed()
  let rol = ayarlar.kayıtsızROL
 member.addRole(rol)//AreW

  var kontrol;
if (tarih < 1296000000) kontrol = ':no_entry: __**Bu Kullanıcı Şüpheli**__'
if (tarih > 1296000000) kontrol = ':white_check_mark: __**Bu Kullanıcı Güvenli**__'
  moment.locale("tr");
  let kanal1 = client.channels.get(kanal);
    let giris = new Discord.RichEmbed()
   .setTitle(`<a:kraltac:740610303628279808> | \`Sunucuya Bir Üye Katıldı!\` | <a:kraltac:740610303628279808>`)
    .setDescription(`
• ** __Hoşgeldin! ${member}__ **

•  <a:pembeh:751553654561046619> **__Seninle Birlikte ${member.guild.memberCount} Kişiyiz.__ **

• \`{ ${ayarlar.tag} }\`** __Tagımızı alarak ekibimize katılabilirsin.__ **

• <a:alarm1:756946152938799225> ** <@&${ayarlar.yetkiliROL}> __seninle ilgilenicektir.__ **

• <a:sari3:751558669585612830> ** __Hesabın Oluşturulma Tarihi:__** \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`

•  ${kontrol} 

• <a:duyur:766652129678721074> ** __ Ses teyit odasında kaydınızı yaptırabilirsiniz. __ ** 

`)//AreW
    .setThumbnail(member.user.avatarURL || 'https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
    .setImage('https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
    .setTimestamp()
kanal1.send(giris)
  });
// GİRİŞ SON

if (db.has(`sayaç.${member.guild.id}`)) {


  let sayı = db.fetch(`sayaç.${member.guild.id}`)
  let otorolkanal = member.guild.channels.cache.get(db.fetch(`sayaçkanal.${member.guild.id}`))

  if(member.guild.memberCount <= sayı) {
      let embed = new Discord.MessageEmbed()
      .setTitle(":inbox_tray: Aramıza Yeni Biri Katıldı.")
      .setDescription(`<a:796855648293748748:802619430386794587> » Aramıza Hoşgeldin ${member} seninle beraber ${sayı} kişi olmamıza ${sayı - member.guild.memberCount} kişi kaldı!`)
      .addField("🤖 » Botmu?", member.bot ? "Evet" : "Hayır", true)
      .addField("🔑 » Hedef", `${sayı}`, true)
      otorolkanal.send(embed)
  } else {
      let embed = new Discord.MessageEmbed()
      .setTitle(":inbox_tray: Aramıza Yeni Biri Katıldı.")
      .setDescription(`<a:796855648293748748:802619430386794587> » Aramıza Hoşgeldin ${member} Seninle Beraber Tam ${sayı} kişi olduk!`)
      .addField("🤖 » Botmu?", member.bot ? "Evet" : "Hayır", true)
      .addField("🔑 » Hedef", `${sayı}`, true)
      otorolkanal.send(embed)
  }
}


client.login(ayarlar.token)