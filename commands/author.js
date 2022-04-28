const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("author")
        .setDescription("Displays the name of the author of the project"),

    async execute(interaction) {
        await interaction.reply("Coded by A. S. \"Huskyy\" Kuśmierek");
    }
}