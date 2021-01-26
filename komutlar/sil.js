const ayarlar = require('../ayarlar.json')
const db = require('wio.db')
const Discord = require('discord.js')

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("» Bunu Yapabilmek için `Mesajları Yönet` Yetkisine Sahip Olmalısın.");

    let sayı = parseInt(args[0])

    if(!sayı > 2) return message.channel.send("» En az 2 Adet Mesaj Silebilirsin!")

    if(sayı < 201) {

        message.channel.bulkDelete(sayı).catch(err => {
            return message.channel.send("» 14 Günden Eski Mesajları Discord API Silmeme İzin vermiyor.")
        })

        let embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("<a:tik:776899538723405905> » Başarıyla Mesajlar Silindi.")
        .setFooter("DEAV")
        .setDescription(`» Silinen Mesaj Sayısı: **${sayı}**\n\n» Silen Yetkili: ${message.author}`)
        message.channel.send(embed).then(msj => {
            msj.delete( {timeout: 3000} )
        })

    } else {
        return message.channel.send("» En Fazla 200 Mesaj Silebilirsin!")
    }
}

exports.help = {
    name: "sil"
}
exports.conf = {
    aliases: ["temizle","clear"]
}