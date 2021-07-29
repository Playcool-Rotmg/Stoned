const { Client, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true

})

config({
    path: __dirname+"/.env"
})

client.on("ready", () => {

    console.log(`bot started,name : ${client.user.username}`);
    client.user.setPresence({ activity: { name: 'Drug Addicts', type: 'WATCHING' }, status: 'online' })
        .then(console.log)
        .catch(console.error);

});

client.on("message", async message => {
    console.log(`${message.author.username} said: ${message.content}`)

    const prefix = "-";
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    console.log(`command is being processed.`);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        const msg = await message.channel.send(`Processing.`);
        console.log(`ping command triggered`);
        msg.edit(`\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\nAPI latency ${Math.round(client.ws.ping)}ms`)
    }

    if (cmd === "say") {
        const authorOfSay = message.author;
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("nothing to say?").then(x => x.delete({ timeout: 5000 }));

        //const msgcolor = message.guild.me.displayHexColor === "#000"?"FFF":message.guild.me.displayHexcolor;
        const msgcolor = "#ffd700";

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed();
            embed.setTitle("Showcase template");
            embed.setColor(msgcolor);
            embed.description = `${args.slice(1).join(" ")}`;
            embed.type = "Rich";
            embed.setTimestamp();
            embed.setImage(authorOfSay.displayAvatarURL());
            embed.setAuthor(client.user.username, client.user.avatarURL());
            embed.setFooter(authorOfSay.username.toString(), authorOfSay.avatarURL());
            embed.setThumbnail(authorOfSay.avatarURL());
            message.channel.send(embed);

        } else {
            message.channel.send(args.join(" "));
        }
    }
    if (cmd === "run") {
        const authorOfSay = message.author;
        if (message.deletable) message.delete();
        /*if (args.length < 1)
            return message.reply("wrong format.").then(x => x.delete({ timeout: 5000 }));
            */
        //const msgcolor = message.guild.me.displayHexColor === "#000"?"FFF":message.guild.me.displayHexcolor;
        const msgcolor = "#ffd700";

        /*if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed();
            embed.setTitle("Showcase template");
            embed.setColor(msgcolor);
            embed.description = `${args.slice(1).join(" ")}`;
            embed.type = "Rich";
            embed.setTimestamp();
            embed.setImage(authorOfSay.displayAvatarURL());
            embed.setAuthor(client.user.username, client.user.avatarURL());
            embed.setFooter(authorOfSay.username.toString(), authorOfSay.avatarURL());
            embed.setThumbnail(authorOfSay.avatarURL());
            message.channel.send(embed);

        } else {
            message.channel.send(args.join(" "));
        }*/
        const embed = new MessageEmbed();
        embed.setTitle(`New Dungeon Raid starting soon`);
        embed.setColor(msgcolor);
        embed.type = "Rich";
        embed.setFooter(authorOfSay.username.toString(), authorOfSay.avatarURL());
        embed.setTimestamp();
        embed.setDescription(`Under construction.`);
        //later add emojis to react to
        /*message.channel.send(embed)
            .then(embedMessage => {
                embedMessage.react("<:key1:803622185439723550>");
                embedMessage.react("<:sam:803639816540651601>");
            })
            .then(console.log)
            .catch(console.error);*/

        /*m.react("")
            .then(console.log)
            .catch(console.error);
    }
    */
    }
});

client.login(process.env.TOKEN);