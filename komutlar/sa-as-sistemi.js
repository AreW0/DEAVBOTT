const ayarlar = require('../ayarlar.json')
const db = require('wio.db')
const Discord = require('discord.js')

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bunu Yapabilmek için `Mesajları Yönet` Yetkisine Sahip Olmalısın.");


    if(args[0] == "aç") {
        if(!db.has("sa-as." + message.guild.id)) {

            db.set("sa-as." + message.guild.id, "açık")
    
            let embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("SA-AS Sistemi Açıldı")
            .setDescription("<a:tik:776899538723405905> » SA-AS Sistemi Başarıyla aktifleştirildi.")
            .setColor("BLACK")
            .setFooter("DEAV")
            message.channel.send(embed)

        } else {
            return message.channel.send("SA-AS Sistemi Zaten Açık")
        }
    }

    if(args[0] == "kapat") {
        if(db.has("sa-as." + message.guild.id)) {

            db.delete("sa-as." + message.guild.id)
    
            let embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("SA-AS Sistemi Kapatıldı")
            .setDescription("<a:tik:776899538723405905> » SA-AS Sistemi Başarıyla deaktifleştirildi.")
            .setColor("BLACK")
            .setFooter("DEAV")
            message.channel.send(embed)

        } else {
            return message.channel.send("SA-AS Sistemi Zaten Kapalı")
        }
    }

    if(!args[0]) {    
        let embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("SA-AS Sistemi Kapatıldı")
        .setDescription("SA-AS Sistem Kullanımı:\n!sa-as aç\n!sa-as kapat")
        .setColor("BLACK")
        .setFooter("DEAV")
        message.channel.send(embed)
    }

}

exports.help = {
    name: "sa-as"
}
exports.conf = {
    aliases: ["sa-as aç"]
}