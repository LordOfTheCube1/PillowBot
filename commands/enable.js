exports.run = async (client, msg, args) => {
  if(!client.disabled.includes(msg.channel.id)) return msg.channel.send("Not disabled!");
  client.disabled = client.disabled.filter(w => w != msg.channel.id); //inefficient
  return msg.channel.send(`Enabled <#${msg.channel.id}> (${msg.channel.id}).`);
}