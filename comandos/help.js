const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "help",
  alias: [],

execute (client, message, args){

  if(!blacklist.has(message.author.id)){
    const a = new Discord.MessageEmbed()
    .setDescription("You are not registered in the Whitelist.")
    .setColor("cc2929")
     return message.reply({embeds: [a]})
  }

const embed = new Discord.MessageEmbed()
.setAuthor({name: `${client.user.username} | Oc-Hub`, iconURL: client.user.displayAvatarURL()})
.setDescription("*`Nota: No usar todos los comandos a la vez. Si lo haces entraras dentro de la BlackList.`*")
.addField("**» Links.**", "> [Comandos](https://dppbleed.github.io/NuevaVidaLaQueMeEstoyDando/)")
  .setColor("cc2929")
  message.reply({embeds: [embed]})

  message.author.send("**Nombre de Usuario:** **`admin`**\n**Contraseña:** **`password`**").catch(err => {
    message.reply("**Nombre de Usuario:** **`admin`**\n**Contraseña:** **`password`**")
  })




 }

}