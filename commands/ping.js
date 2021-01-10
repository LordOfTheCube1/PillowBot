exports.run = async (client, msg, args) => {
  return msg.channel.send('My websocket ping is ' + client.ws.ping + 'ms');
}