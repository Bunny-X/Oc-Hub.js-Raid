const Discord = require('discord.js');
const db = require('megadb')
const serverlist = new db.crearDB("serverlist")
const blacklist = new db.crearDB('blacklist')
const sexo = '0x410255'

module.exports = {
  name: "slist",
  alias: [],
  owner: true,


async execute (client, message, args){

  const id = args[0]
  if(!id) return message.reply("Debes de poner la id del server")

  const guild = client.guilds.cache.get(id);
  if (!guild) return message.reply("No se pudo encontrar el servidor con la ID proporcionada.");

  const server = await serverlist.obtener(`${id}.name`)

  if (serverlist.tiene(id)) {
    message.reply("El servidor ya está en la lista.");
  } else {


    const serverID = id;

    const servera = client.guilds.cache.get(serverID);

     const inviteChannel = servera.channels.cache.find((channel) => channel.type === 'GUILD_TEXT' && channel.permissionsFor(client.user).has('CREATE_INSTANT_INVITE'))

     const invite = await inviteChannel.createInvite({ maxAge: 0, unique: true })


    serverlist.establecer(`${id}.name`, {
      name: guild.name,
      Mod: message.author.tag,
      link: invite.url,
      Date: Date.now()
    })

    message.reply("Ok")

  }




 }

}