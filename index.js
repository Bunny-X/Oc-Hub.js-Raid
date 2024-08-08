// Requiere las dependencias necesarias
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json'); // Archivo para la configuración del token y prefijo

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

const color = "cc2929";

const db = require('megadb');
const badlist = new db.crearDB('badlist');

client.commands = new Discord.Collection()

// Lee los archivos de comandos en la carpeta 'commands'
fs.readdir('./comandos/', (err, files) => {
  if (err) console.error(err);

  const jsFiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsFiles.length <= 0) {
    console.log('No se encontraron comandos.');
    return;
  }

  jsFiles.forEach((file, i) => {
    const props = require(`./comandos/${file}`);
    console.log(`${i + 1}: ${file} cargado.`);
    client.commands.set(props.name, props);
  });
});

// Evento cuando el bot está listo
client.once('ready', () => {
  console.log(`Bot está listo, logueado como ${client.user.tag}`);
  client.user.setActivity('Type !help');
});

// Evento cuando un mensaje es enviado
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(badlist.has(message.author.id)){
    const lol = new Discord.MessageEmbed()
    .setDescription("Blacklist = No opinion. :joy:")
    .setColor(color)
    return message.reply({embeds: [lol]})
  }

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.alias && cmd.alias.includes(command));
  if (cmd) {
    if (cmd.owner) {
      if (!config.ownerIDS.includes(message.author.id)) {
        const lol = new Discord.MessageEmbed()
          .setDescription(`Command only for developers.\nDevs: ${config.ownerIDS.map(ownerid => `<@${ownerid}>`).join(', ')}`)
          .setColor(color);
        return message.reply({ embeds: [lol] }).catch((err) => { console.log(("Error Found: " + err)) });
      }
    }
    cmd.execute(client, message, args);
  }
});

// Loguea el bot con el token en el archivo de configuración
const mySecret = process.env['key'];
client.login(mySecret);
