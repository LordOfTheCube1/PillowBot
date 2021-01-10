class Response {
  constructor(options, response) {
    this.options = options;
    this.response = response;
  }
}

exports.run = async(client, msg, args) => {
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return;
  if(args[0] == 'add') {
    if(!args[1]) return msg.channel.send("You need to actually give me something to add lol.");
    args.shift();
    if(!msg.content.includes('-o')) {
      let trigger = args.shift();
      let response = args.join(" ");
      if(response.length < 1) return msg.channel.send("There needs to be a response lmao");
      await client.questions.set(trigger, new Response(null, response));
      client.faq.set(trigger, new Response(null, response));
      return msg.channel.send(`**FAQ ADDED**\nWhenever someone says \`${trigger}\`, I'll respond with "${response}" `);
    }
    let trigger = args.shift();
    if(!args[0] == "-o") return msg.channel.send("Usage: _faq add <trigger> -o <options (no space, seperated by commas)> <response>");
    args.shift();
    let options = args.shift().split(",");
    let response = args.join(" ");
    await client.questions.set(trigger, new Response(options, response));
    client.faq.set(trigger, new Response(options, response));
    return msg.channel.send(`**FAQ ADDED**\nWhenever someone says \`${trigger}\` in the same message as \`${options}\`, I'll respond with "${response}" `);
    // _faq add white -o screen,why Turn off all fake hacks
  } else if (args[0] == 'delete' || args[0] == 'remove' || args[0] == 'rm' || args[0] == 'del') {
    if(!args[1]) return msg.channel.send("You need to actually give something to delete lol.");
    args.shift();
    if(!client.faq.get(args[0])) return msg.channel.send("I couldn't find that faq.");
    await client.questions.delete(args[0]);
    const deleted = client.faq.delete(args[0]);
    return msg.channel.send(`**FAQ DELETED**\nThe word \`${args[0]}\` will no longer cause me to reply with anything `);
  } else if (args[0] == 'list') {
    let message = "";
    if(args[1] == 'full') {
      client.questions.list().then(e => {
        for(let i = 1; i < e.length; i++) {
          let q = e[i];
          message += `**${q}**\n_${client.faq.get(q).options ? client.faq.get(q).options : "No options"}_\n${client.faq.get(q).response}\n`;
        }
       
        return msg.channel.send(message, {
          disableMentions: "everyone"
        });
      });
      
    } else {
      client.questions.list().then(e => {
        for(let i = 1; i < e.length; i++) {
          let q = e[i];
          message+=`**${q}**\n${client.faq.get(q).options ? client.faq.get(q).options : " "}\n`;
        }
        return msg.channel.send(message, {
          disableMentions: "everyone"
        });
      });
      
    }
      
  } else {
    return;
  }
}