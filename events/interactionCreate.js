const { commands } = require("../app");
const { Permissions } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = commands.get(interaction.commandName);

        if (!command) return;

        async function commandExecute() {
            try {
                await command.execute(interaction);
    
            } catch (error) {
                console.error(error);
    
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    
            }
        }

        if (command == "author") {
            commandExecute();

        } else if (command == "mute" && interaction.member.permissions.has(Permissions.FLAGS.TIMEOUT_MEMBERS)) {

            if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                commandExecute();
            }
        } else {

            if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                commandExecute();
            }
        }
    }
}