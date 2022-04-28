const { commands } = require("../app");
const { Permissions } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = commands.get(interaction.commandName);

        if (!command) return;

        async function commandExecute() {
            try {
                if (command.init) command.init();
                await command.execute(interaction);
    
            } catch (error) {
                console.error(error);
    
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    
            }
        }

        if (command.data.name == "author" || interaction.member.roles.cache.has("898669078280011827")) {
            commandExecute();
        } else {
            interaction.reply("Insufficent Permissions");
        }
    }
}