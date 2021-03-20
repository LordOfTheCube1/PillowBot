const  { MessageAttachment } = require('discord.js');
function makeEmbed(input, title) {

    const embed = new MessageEmbed()
    embed.setColor("#1f7dcf")
    embed.setAuthor("PillowBot (derived from MorningBot)", client.user.avatarURL())
    embed.setDescription(input.replace(/>>/g, "    "))
    if (title) embed.setTitle(title)
    return embed
}
exports.description = "Quotes a user (Usage: `_quote [user] [message]`"
const Canvas = require('canvas')

Canvas.registerFont('./assets/whitneymedium.woff', {
    family: 'Whitney'
})
exports.run = (client, message, args) => {
if(!args[0] || !args[1]) {
  message.channel.send("Invalid Arguments; Usage: `mb!quote {user} {text}`")
  return
}
let user = message.content.includes("<@") && message.content.includes(">") ? message.mentions.users.first() : client.users.cache.find(x=>x.username.toLowerCase() == args[0].toLowerCase())
if(!user) {message.channel.send("Invalid User"); return }
let name = user.username
if(!message.guild.members.cache.map(x=>x.id).includes(user.id)) {
  message.channel.send("This user is not in this server!")
  return
}
args.shift()
let text = args.join(" ")
let color = message.guild.members.cache.get(user.id).displayHexColor
  message.channel.send("Please wait ").then(async initialMsg => {
    const canvas1 = Canvas.createCanvas(250, 250);
    const ctx1 = canvas1.getContext("2d");
    var img1 = await Canvas.loadImage(user.avatarURL({
      format: 'png'
    }))
    ctx1.beginPath();
    ctx1.arc(125, 125, 125, 0, 2 * Math.PI);
    ctx1.clip();
    ctx1.drawImage(img1, 0, 0, 250, 250);
    let pfp = canvas1.toBuffer('image/png')
    ctx1.font = "30px Whitney"
    let fontWidth = ctx1.measureText(text).width + 160
    var width = 700
    if(fontWidth > 700) width += fontWidth - 700
    const canvas = Canvas.createCanvas(width, 120)
    let ctx = canvas.getContext('2d')
    let pfpImg = new Canvas.Image
    pfpImg.src = pfp
    ctx.fillStyle = "black"
    ctx.font = "30px Whitney"
    ctx.fillRect(0,0,700,120)
    ctx.fillStyle = '#36393f'
    ctx.fillRect(0, 0, width, 120)
    ctx.drawImage(pfpImg, 25, 15, 90, 90)
    ctx.fillStyle = color
    ctx.fillText(name, 140, 50)
    ctx.fillStyle = '#dddddd'
    ctx.fillText(text, 140, 90)
    let nameW = ctx.measureText(name)
    ctx.font = "19px Whitney"
    ctx.fillStyle = "#888888"
    ctx.fillText("Today at " + require('moment')().format("h:mm A"), 150 + nameW.width, 50)
    
    let attachment = new MessageAttachment(canvas.toBuffer(), 'img.png')
   message.channel.send(attachment)
  })
}