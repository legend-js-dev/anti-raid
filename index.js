console.clear();
console.log('[INFO]: Loading...');
console.log('-------------------------------------');
//anti raid / anti nuke bot coded by legendjs >:D
const { Client, Collection } = require('discord.js');
const discord = require('discord.js');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
//dont touch the credits or i will find you and u will have to commit die >:D
const client = new Client({
	disableMentions: 'everyone'
});

client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

const db = require("quick.db")

console.log('-------------------------------------');
console.log(`
██╗     ███████╗ ██████╗ ███████╗███╗   ██╗██████╗         ██╗███████╗
██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║██╔══██╗        ██║██╔════╝
██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║██║  ██║        ██║███████╗
██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║██║  ██║   ██   ██║╚════██║
███████╗███████╗╚██████╔╝███████╗██║ ╚████║██████╔╝██╗╚█████╔╝███████║
╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚════╝ ╚══════╝
`);
console.log('-------------------------------------');
console.log('[CREDITS]: made by legendjs#0001')
console.log('-------------------------------------');
console.log(`
 █████╗ ███╗   ██╗████████╗██╗      ██████╗  █████╗ ██╗██████╗ 
██╔══██╗████╗  ██║╚══██╔══╝██║      ██╔══██╗██╔══██╗██║██╔══██╗
███████║██╔██╗ ██║   ██║   ██║█████╗██████╔╝███████║██║██║  ██║
██╔══██║██║╚██╗██║   ██║   ██║╚════╝██╔══██╗██╔══██║██║██║  ██║
██║  ██║██║ ╚████║   ██║   ██║      ██║  ██║██║  ██║██║██████╔╝
╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝      ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═════╝ 
`)
console.log('-------------------------------------');
//this took me some time so dont you dare remove credits, if u do remove credits then you will have copy right issues.
client.on('ready', () => {
	console.log(`[INFO]: Ready on client (${client.user.tag})`);
	console.log(`[INFO]: watching ${client.guilds.cache.size} Servers, ${client.channels.cache.size} channels & ${client.users.cache.size} users`)
	console.log('-------------------------------------');
	client.user.setActivity('anti raid by legendjs :D', {
		type: 'WATCHING'
	});
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) command.run(client, message, args, db);
});

client.on("roleCreate", async role => {
  if (role.managed === true) return;
  const log = await role.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    const user = log.executor
    if (user.id === client.user.id) return;
    let whitelist = db.get(`whitelist_${role.guild.id}`)
    if(whitelist && whitelist.find(x => x.user === user.id)) {
    return;
    }
    let person = db.get(`${role.guild.id}_${user.id}_rolecreate`)
    let limit = db.get(`rolecreate_${role.guild.id}`)
    if (limit === null) {
      return;
    }
    let logsID = db.get(`logs_${role.guild.id}`)
    let punish = db.get(`punish_${role.guild.id}`)
    let logs = client.channels.cache.get(logsID)
    if(person > limit - 1) {
      if (punish === "ban") {
        role.guild.members.ban(user.id).then(bruhmoment => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role create limits")
          .addField("Punishment", punish)
          .addField("Banned", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role create limits")
          .addField("Punishment", punish)
          .addField("Banned", "No")
          .setColor("#FF0000")
          if (logs) {
            return logs.send({ embed: embed })
          }
        })
      } else if (punish === "kick") {
        role.guild.members.cache.get(user.id).kick().then(bruhlol => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role create limits")
          .addField("Punishment", punish)
          .addField("kicked", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role create limits")
          .addField("Punishment", punish)
          .addField("kicked", "No")
          .setColor("#FF0000")
          if (logs) {
            return logs.send({ embed: embed })
          }
        })
      } else if (punish === "demote") {
        role.guild.members.cache.get(user.id).roles.cache.forEach(r => {
          if (r.name !== "@everyone") {
            role.guild.members.cache.get(user.id).roles.remove(r.id)
          }
        }).then(bruhlolxd => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role create limits")
          .addField("Punishment", punish)
          .addField("demoted", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .setColor("#FF0000")
          .addField("User", user.tag)
          .addField("Case", "Tried to Raid | Breaking role create limits")
          .addField("Punishment", punish)
          .addField("demoted", "No")
          if (logs) {
            return logs.send({ embed: embed })
          }
        })
      }
    } else {
      db.add(`${role.guild.id}_${user.id}_rolecreate`, 1)
       let pog = db.get(`${role.guild.id}_${user.id}_rolecreate`)
       let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Creating Roles...")
          .addField("Punishment", punish)
          .addField("Times", `${pog || 0}/${limit || 0}`)
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
    }
    }
});

client.on("roleDelete", async role => {
  if (role.managed === true) return;
  const log = await role.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    const user = log.executor
    if (user.id === client.user.id) return;
    let whitelist = db.get(`whitelist_${role.guild.id}`)
    if(whitelist && whitelist.find(x => x.user === user.id)) {
    return;
    }
    let person = db.get(`${role.guild.id}_${user.id}_roledelete`)
    let limit = db.get(`roledelete_${role.guild.id}`)
    if (limit === null) {
      return;
    }
    let logsID = db.get(`logs_${role.guild.id}`)
    let punish = db.get(`punish_${role.guild.id}`)
    let logs = client.channels.cache.get(logsID)
    if(person > limit - 1) {
      if (punish === "ban") {
        role.guild.members.ban(user.id).then(xdbruhlol => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role delete limits")
          .addField("Punishment", punish)
          .addField("Banned", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role delete limits")
          .addField("Punishment", punish)
          .addField("Banned", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "kick") {
        role.guild.members.cache.get(user.id).kick().then(xdbruhlolmoment => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role delete limits")
          .addField("Punishment", punish)
          .addField("kicked", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role delete limits")
          .addField("Punishment", punish)
          .addField("kicked", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "demote") {
        role.guild.members.cache.get(user.id).roles.cache.forEach(r => {
          if (r.name !== "@everyone") {
            role.guild.members.cache.get(user.id).roles.remove(r.id)
          }
        }).then(bruhmomentlolxd => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the role delete limits")
          .addField("Punishment", punish)
          .addField("demoted", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .setColor("#FF0000")
          .addField("User", user.tag)
          .addField("Case", "Tried to Raid | Breaking role delete limits")
          .addField("Punishment", punish)
          .addField("demoted", "No")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      }
    } else {
      db.add(`${role.guild.id}_${user.id}_roledelete`, 1)
       let pog = db.get(`${role.guild.id}_${user.id}_roledelete`)
       let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(role.guild.name + " | made by legendjs#0001", role.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Deleting Roles...")
          .addField("Punishment", punish)
          .addField("Times", `${pog || 0}/${limit || 0}`)
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
    }
    }
})

client.on("channelCreate", async channel => {
  const log = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_CREATE'
    }).then(audit => audit.entries.first())
    const user = log.executor
    if (user.id === client.user.id) return;
    let whitelist = db.get(`whitelist_${channel.guild.id}`)
    if(whitelist && whitelist.find(x => x.user === user.id)) {
    return;
    }
    let person = db.get(`${channel.guild.id}_${user.id}_channelcreate`)
    let limit = db.get(`channelcreate_${channel.guild.id}`)
    if (limit === null) {
      return;
    }
    let logsID = db.get(`logs_${channel.guild.id}`)
    let logs = client.channels.cache.get(logsID)
    let punish = db.get(`punish_${channel.guild.id}`)
    if(person > limit - 1) {
      if (punish === "ban") {
        channel.guild.members.ban(user.id).then(hshshshs => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel create limits")
          .addField("Punishment", punish)
          .addField("Banned", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel create limits")
          .addField("Punishment", punish)
          .addField("Banned", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "kick") {
        channel.guild.members.cache.get(user.id).kick().then(jsisj => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel create limits")
          .addField("Punishment", punish)
          .addField("kicked", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel create limits")
          .addField("Punishment", punish)
          .addField("kicked", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "demote") {
        channel.guild.members.cache.get(user.id).roles.cache.forEach(r => {
          if (r.name !== "@everyone") {
            channel.guild.members.cache.get(user.id).roles.remove(r.id)
          }
        }).then(hrh => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel create limits")
          .addField("Punishment", punish)
          .addField("demoted", "Yes")
          .setColor("GREEN")
          if (logs) {
            return logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .setColor("#FF0000")
          .addField("User", user.tag)
          .addField("Case", "Tried to Raid | Breaking channel create limits")
          .addField("Punishment", punish)
          .addField("demoted", "No")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      }
    } else {
      db.add(`${channel.guild.id}_${user.id}_channelcreate`, 1)
       let pog = db.get(`${channel.guild.id}_${user.id}_channelcreate`)
       let bruh = db.get(`channelcreate_${channel.guild.id}`)
       let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Creating channels...")
          .addField("Punishment", punish)
          .addField("Times", `${pog || 0}/${bruh || 0}`)
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
    }
    }
})

client.on("channelDelete", async channel => {
  const log = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    const user = log.executor
    if (user.id === client.user.id) return;
    let whitelist = db.get(`whitelist_${channel.guild.id}`)
    if(whitelist && whitelist.find(x => x.user === user.id)) {
    return;
    }
    let person = db.get(`${channel.guild.id}_${user.id}_channeldelete`)
    let limit = db.get(`channeldelete_${channel.guild.id}`)
    if (limit === null) {
      return;
    }
    let logsID = db.get(`logs_${channel.guild.id}`)
    let logs = client.channels.cache.get(logsID)
    let punish = db.get(`punish_${channel.guild.id}`)
    if(person > limit - 1) {
      if (punish === "ban") {
        channel.guild.members.ban(user.id).then(hahsh => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel delete limits")
          .addField("Punishment", punish)
          .addField("Banned", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel delete limits")
          .addField("Punishment", punish)
          .addField("Banned", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "kick") {
        channel.guild.members.cache.get(user.id).kick().then(gsy => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel delete limits")
          .addField("Punishment", punish)
          .addField("kicked", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel delete limits")
          .addField("Punishment", punish)
          .addField("kicked", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "demote") {
        channel.guild.members.cache.get(user.id).roles.cache.forEach(r => {
          if (r.name !== "@everyone") {
            channel.guild.members.cache.get(user.id).roles.remove(r.id)
          }
        }).then(lolxd => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the channel delete limits")
          .addField("Punishment", punish)
          .addField("demoted", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .setColor("#FF0000")
          .addField("User", user.tag)
          .addField("Case", "Tried to Raid | Breaking channel delete limits")
          .addField("Punishment", punish)
          .addField("demoted", "No")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      }
    } else {
      db.add(`${channel.guild.id}_${user.id}_channeldelete`, 1)
       let pog = db.get(`${channel.guild.id}_${user.id}_channeldelete`)
       let bruh = db.get(`channeldelete_${channel.guild.id}`)
       let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(channel.guild.name + " | made by legendjs#0001", channel.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Deleting channels...")
          .addField("Punishment", punish)
          .addField("Times", `${pog || 0}/${bruh || 0}`)
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
    }
    }
})

client.on("guildMemberRemove", async member => {
  const log1 = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
  if (log1.action === "MEMBER_KICK") {
    const log = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
        })
        .then(audit => audit.entries.first());
    const user = log.executor
    if (user.id === client.user.id) return;
    let whitelist = db.get(`whitelist_${member.guild.id}`)
    if(whitelist && whitelist.find(x => x.user === user.id)) {
    return;
    }
    let person = db.get(`${member.guild.id}_${user.id}_kicklimit`)
    let limit = db.get(`kicklimit_${member.guild.id}`)
    if (limit === null) {
      return;
    }
    let logsID = db.get(`logs_${member.guild.id}`)
    let punish = db.get(`punish_${member.guild.id}`)
    let logs = client.channels.cache.get(logsID)
    if(person > limit - 1) {
      if (punish === "ban") {
        member.guild.members.ban(user.id).then(lolxdbruh => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the kick limits")
          .addField("Punishment", punish)
          .addField("Banned", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the kick limits")
          .addField("Punishment", punish)
          .addField("Banned", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "kick") {
        member.guild.members.cache.get(user.id).kick().then(ehbruh => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the kick limits")
          .addField("Punishment", punish)
          .addField("kicked", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the kick limits")
          .addField("Punishment", punish)
          .addField("kicked", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "demote") {
        member.guild.members.cache.get(user.id).roles.cache.forEach(r => {
          if (r.name !== "@everyone") {
            member.guild.members.cache.get(user.id).roles.remove(r.id)
          }
        }).then(lolbutbruh => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the kick limits")
          .addField("Punishment", punish)
          .addField("demoted", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .setColor("#FF0000")
          .addField("User", user.tag)
          .addField("Case", "Tried to Raid | Breaking kick limits")
          .addField("Punishment", punish)
          .addField("demoted", "No")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      }
    } else {
      db.add(`${member.guild.id}_${user.id}_kicklimit`, 1)
       let pog = db.get(`${member.guild.id}_${user.id}_kicklimit`)
       let bruh = db.get(`kicklimit_${member.guild.id}`)
       let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "kicking members...")
          .addField("Punishment", punish)
          .addField("Times", `${pog || 0}/${bruh || 0}`)
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
    }
    }
  }
})

client.on("guildBanAdd", async (guild, userr) => {
  let member = guild.members.cache.get(userr.id)
    const log = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_BAN"
        })
        .then(audit => audit.entries.first());
    const user = log.executor
    if (user.id === client.user.id) return;
    let whitelist = db.get(`whitelist_${member.guild.id}`)
    if(whitelist && whitelist.find(x => x.user === user.id)) {
    return;
    }
    let person = db.get(`${member.guild.id}_${user.id}_banlimit`)
    let limit = db.get(`banlimit_${member.guild.id}`)
    if (limit === null) {
      return;
    }
    let logsID = db.get(`logs_${member.guild.id}`)
    let logs = client.channels.cache.get(logsID)
    let punish = db.get(`punish_${member.guild.id}`)
    if(person > limit - 1) {
      if (punish === "ban") {
        member.guild.members.ban(user.id).then(lolxdbruh => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the ban limits")
          .addField("Punishment", punish)
          .addField("Banned", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the ban limits")
          .addField("Punishment", punish)
          .addField("Banned", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "kick") {
        member.guild.members.cache.get(user.id).kick().then(lolxdok => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the ban limits")
          .addField("Punishment", punish)
          .addField("kicked", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the ban limits")
          .addField("Punishment", punish)
          .addField("kicked", "No")
          .setColor("#FF0000")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      } else if (punish === "demote") {
        member.guild.members.cache.get(user.id).roles.cache.forEach(r => {
          if (r.name !== "@everyone") {
            member.guild.members.cache.get(user.id).roles.remove(r.id)
          }
        }).then(ok => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "Tried To Raid | breaking the ban limits")
          .addField("Punishment", punish)
          .addField("demoted", "Yes")
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
          }
        }).catch(err => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .setColor("#FF0000")
          .addField("User", user.tag)
          .addField("Case", "Tried to Raid | Breaking ban limits")
          .addField("Punishment", punish)
          .addField("demoted", "No")
          if (logs) {
            logs.send({ embed: embed })
          }
        })
      }
    } else {
      db.add(`${member.guild.id}_${user.id}_banlimit`, 1)
       let pog = db.get(`${member.guild.id}_${user.id}_banlimit`)
       let bruh = db.get(`banlimit_${member.guild.id}`)
       let embed = new Discord.MessageEmbed()
          .setTitle("**Anti-Raid**")
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(member.guild.name + " | made by legendjs#0001", member.guild.iconURL())
          .addField("User", user.tag)
          .addField("Case", "banning members...")
          .addField("Punishment", punish)
          .addField("Times", `${pog || 0}/${bruh || 0}`)
          .setColor("GREEN")
          if (logs) {
            logs.send({ embed: embed })
    }
    }
})

client.on("guildMemberRemove", async member => {
  let user = member.user
    let stuff = [`${member.guild.id}_${user.id}_rolecreate`, `${member.guild.id}_${user.id}_roledelete`, `${member.guild.id}_${user.id}_channelcreate`, `${member.guild.id}_${user.id}_channeldelete`, `${member.guild.id}_${user.id}_banlimit`, `${member.guild.id}_${user.id}_kicklimit`]
    stuff.forEach(bruh => db.delete(bruh))
})

client.login(token).catch(err => {
	console.log('[ERROR]: Invalid Token Provided');
});
