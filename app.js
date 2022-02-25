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

client.once('ready', () => {
    console.log(`Logged in as: ${client.user.tag}`);

});

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

client.login(token);