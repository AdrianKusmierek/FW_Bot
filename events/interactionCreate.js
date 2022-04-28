const { commands } = require("../app");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = commands.get(interaction.commandName);
        const { disabled, init, execute } = command;
        const cmdName = command.data.name;

        if (!command) return;

        async function commandExecute() {
            try {
                if (disabled) return;
                if (init) command.init();
                await execute(interaction);
    
            } catch (error) {
                console.error(error);
    
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    
            }
        }

        if (cmdName == "author" || interaction.member.roles.cache.has("898669078280011827")) {
            commandExecute();
        } else {
            interaction.reply("Insufficent Permissions");
        }
    }
}