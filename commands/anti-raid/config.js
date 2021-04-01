const Discord = require("discord.js")
module.exports = {
	name: 'config',
	run: async (client, message, args, db) => {
		let ops = [
			'channelCreateLimit',
			'channelDeleteLimit',
			'roleCreateLimit',
			'roleDeleteLimit',
			'banLimit',
			'kickLimit',
			'logs',
			'show',
			'punishment'
		];
		let disabled = ":x: Disabled"
		function check(msg, arr) {
			return arr.some(op => op.toLowerCase() === msg.toLowerCase());
		}
		let bruh = new Discord.MessageEmbed()
		.setTitle('**Anti-Raid | Config**')
		.setDescription(`
**The Options are listed below:**
config ${ops.join("\n config ")}
`)
.setColor("#FF0000")
.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter(message.guild.name + " | made by LΣGΣПD#0001 | A Whole remake of the bot made by Darkboy#9966", message.guild.iconURL())
		if (!args[0]) return message.channel.send({ embed: bruh });
		if (check(args[0], ops) === false)
			return message.channel.send(
				':x: | **The only options are: `channelCreateLimit`, `channelDeleteLimit`, `roleCreateLimit`, `roleDeleteLimit`, `banLimit`, `kickLimit`, `logs`, `show` & `punishment`**'
			);
			switch (args[0].toLowerCase()) {
			  case "show":
let rcl = db.get(`rolecreate_${message.guild.id}`)
let rdl = db.get(`roledelete_${message.guild.id}`)
let ccl = db.get(`channelcreate_${message.guild.id}`)
let cdl = db.get(`channeldelete_${message.guild.id}`)
let bl = db.get(`banlimit_${message.guild.id}`)
let kl = db.get(`kicklimit_${message.guild.id}`)
let logs = db.get(`logs_${message.guild.id}`)
let punish = db.get(`punish_${message.guild.id}`)
if (rcl === null) rcl = disabled
if (rdl === null) rdl = disabled
if (ccl === null) ccl = disabled
if (cdl === null) cdl = disabled
if (bl === null) bl = disabled
if (kl === null) kl = disabled
if (logs === null) logs = disabled
if (logs !== null && logs !== disabled) {
  logs = client.channels.cache.get(logs)
  if (!logs) logs = disabled
}
let show = new Discord.MessageEmbed()
.setTitle("**Anti-Raid | Config**")
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
.setFooter(message.guild.name + " | made by LΣGΣПD#0001 A Whole remake of the bot made by Darkboy#9966", message.guild.iconURL())
.addField("Channel Create Limit", ccl)
.addField("Channel Delete Limit", cdl)
.addField("Role Create Limit", rcl)
.addField("Role Delete Limit", rdl)
.addField("Ban Limits", bl)
.addField("Kick Limits", kl)
.addField("Logs", logs.toString())
.addField("Punishment", punish)
.setColor("GREEN")
return message.channel.send({ embed: show })
			    break;
			  case "channelcreatelimit":
if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
db.set(`channelcreate_${message.guild.id}`, Number(args[1]))
return message.channel.send("**The channel Create limit has been set to " + Number(args[1]) + "**")
			    break;
			  case "channeldeletelimit":
if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
db.set(`channeldelete_${message.guild.id}`, Number(args[1]))
return message.channel.send("**The channel Delete limit has been set to " + Number(args[1]) + "**")
			    break;
			  case "rolecreatelimit":
if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
db.set(`rolecreate_${message.guild.id}`, Number(args[1]))
return message.channel.send("**The role Create limit has been set to " + Number(args[1]) + "**")
			    break;
			  case "roledeletelimit":
if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
db.set(`roledelete_${message.guild.id}`, Number(args[1]))
return message.channel.send("**The role Delete limit has been set to " + Number(args[1]) + "**")
			    break;
			  case "banlimit":
if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
db.set(`banlimit_${message.guild.id}`, Number(args[1]))
return message.channel.send("**The ban limit has been set to " + Number(args[1]) + "**")
			    break;
			  case "kicklimit":
if (!args[1]) return message.channel.send(":x: | **Provide The limit**")
if (isNaN(args[1])) return message.channel.send(":x: | **The limit has to be a number**")
if (Number(args[1]) < 1) return message.channel.send(":x: | **The limit cannot be zero or negative number**")
db.set(`kicklimit_${message.guild.id}`, Number(args[1]))
return message.channel.send("**The kick limit has been set to " + Number(args[1]) + "**")
			    break;
			  case "punishment":
if (!args[1]) return message.channel.send(":x: | **Provide The punishment**")
if (check(args[1], ["ban", "kick", "demote"]) === false) return message.channel.send(":x: | **The punishment can only be kick, ban or demote**")
db.set(`punish_${message.guild.id}`, args[1].toLowerCase())
return message.channel.send("**The punishment has been set to " + args[1] + "**")
			    break;
			  case "logs":
let channel = message.mentions.channels.first()
if (!channel) return message.channel.send(":x: | **Mention The channel**")
if (channel.guild.id !== message.guild.id) return message.channel.send(":x: | **That channel is not from this server**")
db.set(`logs_${message.guild.id}`, channel.id)
channel.send("**Anti Raid logs Channel**")
return message.channel.send("**The logs channel has been set to " + args[1] + "**")
			    break;
			}
	}
};
