exports.run = async (client, msg, args) => {
  if(client.disabled.includes(msg.channel.id)) return msg.channel.send("Already disabled!");
  client.disabled.push(msg.channel.id);
  return msg.channel.send(`Disabled <#${msg.channel.id}> (${msg.channel.id}) until bot restart. `);
}