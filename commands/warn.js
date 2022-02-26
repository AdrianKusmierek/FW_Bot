const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Command for warning members")
    .addUserOption(user => user
        .setName("user")
        .setDescription("User to warn")
        .setRequired(true)
    )
    .addStringOption(reason => reason
        .setName("reason")
        .setDescription("Reason for the warning")
        .setRequired(true)
    ),

    async execute(interaction) {
        const user = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        const warnMsg = `Hi ${user}!
        You've been warned in Furry World for ${reason}.
        If you think that warning is unrightful please feel free to contact our Staff Team!
        
        Yours,
        Furry World Staff Team`;

        const embed = new MessageEmbed()
        .setTitle("Warning!")
        .setDescription(warnMsg)
        .setColor("#fbffd6");

        interaction.reply({ 
            content: `**User** *${user}* **has been warned!**\n**Reason:** *${reason}*`,
            ephemeral: true
        });

        user.send({ embeds: [embed] });
    }
}