const { Client, Collection, Intents, Permissions } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require("./config.json");
const fs = require("fs");

client.commands = new Collection();
const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

cmdFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.data.name, cmd);
});

//////////////////////////////////////////////////////////////////////////////

client.once('ready', () => {
    console.log(`Logged in as: ${client.user.tag}`);
});

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
    } else {
        if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
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

client.on("messageCreate", message => {
    if (message.content.toLowerCase() == "!deploy") {
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
            message.channel.send("Successfully deployed the commands!")
            .then(msg => {
                (async function() {
                    await new Promise(resolve => setTimeout(resolve, 5000));
    
                    msg.delete();
                    message.delete();
                })();
            });
        })
        .catch(console.error);
    }
});

client.login(token);
