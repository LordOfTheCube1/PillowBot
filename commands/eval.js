const beautify = require('beautify');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
    let message = msg
    // if (msg.author.id != "439172671922503699" || msg.author.id !="435206857276260353") {
    //     const notOwner = await msg.channel.send('Not owner lol L');
    //     return notOwner.delete({
    //         timeout: 15000,
    //         reason: 'User of evaluation command not owner'
    //     });
        
    // }
    const whitelisted = ["435206857276260353", "439172671922503699"]
    if (whitelisted.includes(msg.author.id) === false) return;
    if (!args[0]) {
        const runNothing = await msg.channel.send('yes because running nothing is possible');
        return runNothing.delete({
            timeout: 20000,
            reason: 'No code provided in evaluation command'
        });
    }
    let toEval = args.join(" ");
    try {
        if (toEval.toLowerCase().includes('token')) {
            return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                .setFooter("Contains keyword 'token'.")
                .setColor(0xFF0000));
        }
        if (toEval.toLowerCase().includes('config')) {
            return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                .setFooter("Contains keyword 'config'")
                .setColor(0xFF0000));
        }
        if (toEval.toLowerCase().includes('.env')) {
            return msg.channel.send(new MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                .setFooter("Contains keyword '.env'")
                .setColor(0xFF0000));
        }
        var evaluated = eval(toEval);
        const type = (typeof evaluated)

        if (JSON.stringify(evaluated, null, 4).length <= 500 && type == "object") {
            evaluated = "```json\n" + JSON.stringify(evaluated, null, 4) + "```"


        }
        let embed = new MessageEmbed()
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTitle('Eval')
            .addField('Ran:', `\`\`\`js\n${beautify(args.join(" "), {format: 'js'})}\n\`\`\``)
            .addField('Returned:', evaluated)
            .addField("Type of:", type);
        msg.channel.send(embed);


    } catch (e) {

        let embed = new MessageEmbed()
            .setColor(0xFF0000)
            .setTitle('\:x: Error!')
            .setTimestamp()
            .setDescription(e)
            .setFooter(client.user.username, client.user.displayAvatarURL);
        return msg.channel.send(embed);


    }
}