//////////////////////////////////////////////////////////////////////////////
/*                         Primary Modules and Files                        */
//////////////////////////////////////////////////////////////////////////////

const { Client, Collection, Intents, Permissions } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require("./config.json");
const fs = require("fs");

//////////////////////////////////////////////////////////////////////////////
/*                          Getting the Command Files                       */
//////////////////////////////////////////////////////////////////////////////

client.commands = new Collection();
const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

cmdFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.data.name, cmd);
});

//////////////////////////////////////////////////////////////////////////////
/*                                 Functions                                */
//////////////////////////////////////////////////////////////////////////////

function deploy() {
    try {
        const { REST } = require("@discordjs/rest");
        const { Routes } = require("discord-api-types/v9");
        const { token, clientId, guildId } = require("./config");
        const fs = require("fs");
        
        const commands = [];
        const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        
        cmdFiles.forEach(file => {
            const cmd = require(`./commands/${file}`);
        
            commands.push(cmd.data.toJSON());
        });
        
        const rest = new REST({ version: "9" }).setToken(token);
        
        rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => {
            console.log(`${(new Date).toLocaleDateString('pl-PL')} ${(new Date).toLocaleTimeString('en-US')}: Successfully deployed the commands!`);
        })
        .catch(console.error);
    } catch (err) {
        console.error(err);
    }
}

//////////////////////////////////////////////////////////////////////////////
/*                          Basic Startup Procedure                         */
//////////////////////////////////////////////////////////////////////////////

client.once("ready", () => {
    console.log(`Logged in as: ${client.user.tag}`);

    deploy();
});

//////////////////////////////////////////////////////////////////////////////
/*                      Command & Permission Handling                       */
//////////////////////////////////////////////////////////////////////////////

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (command == "author") {
        try {
            await command.execute(interaction);
    
        } catch (error) {
            console.error(error);
    
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    
        }
    } else if (command == "mute" && interaction.member.permissions.has(Permissions.FLAGS.TIMEOUT_MEMBERS)) {
        if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            try {
                await command.execute(interaction);
        
            } catch (error) {
                console.error(error);
        
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        
            }
        }
    } else {
        if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            try {
                await command.execute(interaction);
        
            } catch (error) {
                console.error(error);
        
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        
            }
        }
    }
});

//////////////////////////////////////////////////////////////////////////////
/*                         Manual Command Deployment                        */
//////////////////////////////////////////////////////////////////////////////

client.on("messageCreate", message => {
    if (message.content.toLowerCase() == "!deploy" && message.member.permissions.has("ADMINISTRATOR")) {
        deploy();
    }
});

//////////////////////////////////////////////////////////////////////////////
/*                   Weekly Wipe of the Warns.json File                     */
//////////////////////////////////////////////////////////////////////////////

setInterval(function() {
    var tgt = new Date(2023, 0, 1);
    var daysOfYear = [];
    for (var d = new Date(2022, 2, 7); d <= tgt; d.setDate(d.getDate() + 7)) {
        daysOfYear.push(new Date(d));

        const x = new Date();
        x.setHours(0, 0, 0, 0);

        if (x.toString() == d.toString()) {
            console.log("All warnings have been reset!")
            fs.writeFileSync("data/warns.json", "[]", "utf8");
        }
    }
}, 21600000);

//////////////////////////////////////////////////////////////////////////////
/*                           Logging Into the Bot                           */
//////////////////////////////////////////////////////////////////////////////

client.login(token);