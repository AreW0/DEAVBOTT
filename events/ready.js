const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("wio.db")

var prefix = ayarlar.prefix;

module.exports = client => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
    client.user.setStatus("dnd");

    client.user.setActivity("DEAV İçin Çalışıyor!");

};