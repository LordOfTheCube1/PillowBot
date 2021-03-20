const fetch = require("node-fetch");

exports.run = async(client, msg, args) => {
  const resp = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCgJFj-dRnKCRTOQLIY-tdgA&key=${process.env.YOUTUBE_API_KEY}`);
  const res = await resp.json()
  const subcount = res.items[0].statistics.subscriberCount;
  return msg.channel.send(`caterpillow currently has ${subcount} subscribers`);
}