const Discord = require('discord.js');
const db = require('megadb');
const blacklist = new db.crearDB("blacklist");
const serverlist = new db.crearDB("serverlist");
const sexo = 'cc2929';

let cooldown = new Set();

module.exports = {
  name: "spamdm",
  alias: ["spammd"],

  execute(client, message, args) {

    if (!blacklist.has(message.author.id)) {
      const a = new Discord.MessageEmbed()
        .setDescription("You are not registered in the Whitelist.")
        .setColor(sexo);
      return message.reply({ embeds: [a] });
    }

    if (serverlist.has(message.guild.id)) {
      const serverInListEmbed = new Discord.MessageEmbed()
        .setDescription("This command is not available in this server.")
        .setColor(sexo);
      return message.reply({ embeds: [serverInListEmbed] });
    }

    const user = message.mentions.members.first();
    if (!user) {
      const qq = new Discord.MessageEmbed()
        .setDescription("You have to mention a user.\nMode of use: `!spamdm [user] [message]`")
        .setColor(sexo);
      return message.reply({ embeds: [qq] });
    }

    if (user.id === client.user.id) {
      const si = new Discord.MessageEmbed()
        .setDescription(`You can't spam \`${client.user.username}.\``)
        .setColor(sexo);
      return message.reply({ embeds: [si] });
    }

    if (user.id === message.author.id) {
      const uwu = new Discord.MessageEmbed()
        .setDescription(`You can't spam \`${message.author.username}.\``)
        .setColor(sexo);
      return message.reply({ embeds: [uwu] });
    }

    if (cooldown.has(message.author.id)) {
      const l = new Discord.MessageEmbed()
        .setDescription(`${message.author}, you must wait 10 seconds to use the command.`)
        .setColor(sexo);
      return message.reply({ embeds: [l] });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 10000);

    let pendejo = args.join(' ');

    let i = 0;
    const interval = setInterval(() => {
      if (i >= 1000) {
        clearInterval(interval);
        return;
      }

      user.send(pendejo).catch(e => {
        if (e) {
          clearInterval(interval);
          return message.reply("I can't send messages to this user.");
        }
      });

      i++;
    }, 500); // Enviar un mensaje cada 500 ms (0.5 segundos)

    message.channel.send("🐷");

    const e = new Discord.MessageEmbed()
      .setDescription(`spamdm executed successfully!`)
      .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
      .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
      .addField("Content", `${pendejo}`)
      .setColor(sexo)
      .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }));

    const logChannel = client.channels.cache.get("1265925374601334914");
    if (logChannel) {
      logChannel.send({ embeds: [e] });
    } else {
      console.log(`Log channel with ID "1265857634322481232" not found.`);
    }
  }
}
