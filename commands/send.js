const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("send")
        .setDescription("Sends the dropdown menu to the specified channel to choose roles.")
        .addChannelOption(x => x
            .setName("channel")
            .setDescription("desired channel")
            .setRequired(true)   
        )
        .addStringOption(x => x
            .setName("message")
            .setDescription("desired message")
            .setRequired(true)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const message = interaction.options.getString("message");

        if (!channel || channel.type !== "GUILD_TEXT") {
            return "Please tag a text channel";
        }

        channel.send(message);

        if (interaction) {
            interaction.reply({
                content: "Send message!",
                ephemeral: true
            });
        }
    }
}