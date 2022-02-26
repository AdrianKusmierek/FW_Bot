const { SlashCommandBuilder } = require("@discordjs/builders");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Command for muting members")
    .addUserOption(user => user
        .setName("member")
        .setDescription("Choose the member to mute")
        .setRequired(true)
    )
    .addStringOption(time => time
        .setName("time")
        .setDescription("Mute time")
        .setRequired(true)
    )
    .addStringOption(reason => reason
        .setName("reason")
        .setDescription("Reason for the mute")
    ),

    async execute(interaction) {
        const tgt = interaction.options.getMember("member");
        const reason = interaction.options.getString("reason");

        const time = ms(interaction.options.getString("time"));
        if (!time) interaction.reply({
            content: "Please provice a valid time! e.g. 300s, 3m, 12h",
            ephemeral: true
        });

        const response = await tgt.timeout(time, reason);
        if (!response) interaction.reply({
            content: "Unable to timeout this member!",
            ephemeral: true
        });

        interaction.reply({
            content: `**Timed out out** *${tgt}*\n**Duration:** *${ms(time, { long: true })}*\n**Reason:** *${reason}*`,
        });
    }
}
