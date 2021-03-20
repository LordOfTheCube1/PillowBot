const fetch = require("node-fetch");
const Discord = require("discord.js");

exports.run = async(client, msg, args) => {
  if (!args[0]) return msg.channel.send("bruh include username `_bedwars <ign>`")
  let username = args[0]
  try {
  const resp = await fetch(`https://api.slothpixel.me/api/players/${username}`);
  const data = await resp.json();
  const embed = new Discord.MessageEmbed();
  embed.setTitle(`BedWars stats for ${data.username}`);
  embed.setDescription(`**Level/Stars**: ${data.stats.BedWars.level}
      
**Wins:** ${data.stats.BedWars.wins}

**Kills:** ${data.stats.BedWars.kills}

**Final Kills:** ${data.stats.BedWars.final_kills}

**Beds Broken:** ${data.stats.BedWars.beds_broken}

**KDR:** ${data.stats.BedWars.k_d}
**Win/Loss Ratio:** ${data.stats.BedWars.w_l}
**Final KDR:** ${data.stats.BedWars.final_k_d}`);
embed.setThumbnail(`https://mc-heads.net/avatar/${data.uuid}`);
  return msg.channel.send(embed);
  } catch (e) {
    return msg.channel.send("error! make sure you typed username right");
  }
}