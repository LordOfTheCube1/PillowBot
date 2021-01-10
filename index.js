require('dotenv').config();
const {Client, Collection} = require('discord.js');
const Database = require('@replit/database');
const express = require('express');
const uniqid = require('uniqid');
const app = express();
app.get('/', (req, res) => {
  res.send("HELLO!!1!!!!!!");
});
app.listen(3000); // this is so the bot always stays online

const client = new Client();
client.faq = new Collection();
client.questions = new Database();
client.login(process.env.BOT_TOKEN);
client.prefix = process.env.PREFIX;
client.on('ready', () => {
  client.questions.list().then(async e => {
    for(let i = 0; i < e.length; i++) {
      client.faq.set(e[i], await client.questions.get(e[i]));
    }
  })
  console.info("Databased fully cached.");
});


client.on('message', async msg => {
  if(msg.author.bot) return;
    let args = msg.content.toLowerCase().split(" ");
    const cmd = args.shift().slice(client.prefix.length);

    //=================== Command Handler

if(msg.content.startsWith(client.prefix)) {
  try {
      let file;
      try {
        file = require(`./commands/${cmd}`);
      } catch(e) {
        return;
      }
      file.run(client, msg, args);
    } catch(e) {
        const id = uniqid.process("ERR-");
        console.log(`${id} => Error while running ${cmd} command in ${msg.guild.name} (${msg.guild.id})\n${e}`);
        return msg.channel.send(`There was an error while running the ${cmd} command. Please approach the developer with the following id: \`${id}\` `);
    } 
}
    //=================== Automatic Question Answering
let answered = [];
    msg.content.split(" ").forEach(w => {
      if(client.faq.get(w.toLowerCase()) && !answered.includes(w.toLowerCase())) {
        let thing = client.faq.get(w.toLowerCase());
        if(thing.options) {
          if(!thing.options.some(e => msg.content.toLowerCase().includes(e.toLowerCase()))) return;
          answered.push(w.toLowerCase()); // preventing someone spamming the same question in the same message and it answering more than once
          return msg.reply(thing.response);
        } else {
          return msg.reply(thing.response);
        }
      }
    })
})