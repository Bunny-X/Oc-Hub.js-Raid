const { error } = require('console');
const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

const color = 'cc2929'

module.exports = {
  name: "whitelist",
  alias: ["list"],
  owner: true,

 async execute (client, message, args){

 let usuario = message.mentions.members.first()
  if(!usuario) return message.reply("**You have to mention a user.**")

  var razon = args.slice(1).join(" ")
 if(!razon){
   razon = 'No hay ni una razón.'
 }

  if(blacklist.has(usuario.id)) return message.channel.send("**This user was already registered in the whitelist.**")



  if(usuario.user.bot) return message.channel.send("**No**") 


 blacklist.establecer(usuario.id, usuario.user.tag)

   const role = message.guild.roles.cache.get("1241618832121139271")
   await usuario.roles.add(role).catch(error => {
     console.log(error)
   })
   

   message.react("👍")

    client.channels.cache.get("1268514396234055752").send(`<@${usuario.id}>`).then(m => {
      setTimeout(() => {
        m.delete()
      }, 60000)
    })


 const embed = new Discord.MessageEmbed()

 .setTitle("Success!")
 .setDescription(`${usuario} You have been added to the whitelist!`)
   .addField("*How to get verified?*", '> 1- Ingresa a la página.\n> 2- En "Nombre de Usuario" escribe: **`admin`**\n> 3- En "Contraseña" escribe: **`password`**')
   .addField("**» Link**", "[Click here](https://dppbleed.github.io/NuevaVidaLaQueMeEstoyDando/)")
   .setImage("https://media.discordapp.net/attachments/945559913055256616/1267760682137554976/image.png?ex=66a9f5a4&is=66a8a424&hm=b2f304ebdbb633101ed7b460996b3b1c676cbbe2930af32c368c7e09ff5d1f5e&=&format=webp&quality=lossless&width=1020&height=497")
 .setColor(color)
  .setThumbnail(usuario.user.displayAvatarURL({format: 'png', dynamic: true}))

    client.channels.cache.get("1268514396234055752").send({embeds: [embed]}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 60000)
    })


 client.channels.cache.get("1265925553525882971").send(`**${usuario.user.tag} | ${usuario.user.id}**`)


 }

}