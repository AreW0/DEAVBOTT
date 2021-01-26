const ayarlar = require('../ayarlar.json')
const db = require('wio.db')
const Discord = require('discord.js')

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("» Bunu Yapabilmek için `Rolleri Yönet` Yetkisine Sahip Olmalısın.");


    let sayı = parseInt(args[1])
    let channel = message.mentions.channels.first();

    if(args[0] == "ayarla") {
        
        if(sayı) {
            if(channel) {
                db.set("sayaçkanal."+message.guild.id, channel.id)
                db.set("sayaç."+message.guild.id, sayı)
                let embed = new Discord.MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle("Sayaç Sistemi Ayarlandı")
                .setDescription(`<a:tik:776899538723405905> » Sayaç Kanalı ${channel} Sayaç Sayısı ${sayı} olarak ayarlandı.`)
                .setColor("BLACK")
                .setFooter("DEAV")
                message.channel.send(embed)

            } else {
                message.channel.send("» Lütfen Sayaç Kanalı Giriniz.")
            }
        } else {
            message.channel.send("» Lütfen Sayaç Sayısını Giriniz.")
        }

    }

    if(args[0] == "kapat") {
        if(db.has("sayaç." + message.guild.id)) {

            db.delete("sayaçkanal."+message.guild.id)
            db.delete("sayaç."+message.guild.id)
    
            let embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("Sayaç Sistemi Kapatıldı")
            .setDescription("<a:tik:776899538723405905> » Sayaç Sistemi Başarıyla Kapatıldı.")
            .setColor("BLACK")
            .setFooter("DEAV")
            message.channel.send(embed)

        } else {
            return message.channel.send("» Sayaç Sistemi Zaten Kapalı")
        }
    }

    if(!args[0]) {    
        let embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("Sayaç")
        .setDescription("» Sayaç Sistem Kullanımı:\n\n» !sa-as ayarla [@rol] [#kanal]\n\n» !sa-as kapat")
        .setColor("BLACK")
        .setFooter("DEAV")
        message.channel.send(embed)
    }

}

exports.help = {
    name: "sayaç"
}
exports.conf = {
    aliases: ["member-counter"]
}