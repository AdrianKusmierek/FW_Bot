//////////////////////////////////////////////////////////////////////////////
/*                         Primary Modules and Files                        */
//////////////////////////////////////////////////////////////////////////////

const { Client, Collection, Intents} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require("./config.json");
const fs = require("fs");
const { warnsReset } = require("./functions");

//////////////////////////////////////////////////////////////////////////////
/*                          Command & Event Handling                        */
//////////////////////////////////////////////////////////////////////////////

const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

client.commands = new Collection();
module.exports.commands = client.commands;

cmdFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.data.name, cmd);
});
eventFiles.forEach(file => {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

//////////////////////////////////////////////////////////////////////////////
/*                   Weekly Wipe of the warns.json File                     */
//////////////////////////////////////////////////////////////////////////////

warnsReset();

setInterval(function() {
    warnsReset();
}, 4.32e4);

//////////////////////////////////////////////////////////////////////////////
/*                           Logging Into the Bot                           */
//////////////////////////////////////////////////////////////////////////////

client.login(token);