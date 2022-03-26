const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Check the warning of the provided user")
    .addUserOption(user => user
        .setName("member")
        .setDescription("target member")
        .setRequired(true)
    ),

    async execute(interaction) {
        const user = interaction.options.getMember("member");

        var dataPath = require('path').resolve(__dirname, '..') + "/data";
        var myData = fs.readFileSync(`${dataPath}/warns.json`, "utf8");
        var data = JSON.parse(myData);

        var out = "";
        var out_t = "";

        data.forEach(xdata => {
            if (data.some(item => item.username == user.user.id)) {
                if (xdata.username == user.user.id) {
                    out_t = xdata.warns;

                    xdata.reason.forEach(item => {
                        out += `${item}\n`
                    });
                }
            } else {
                out_t = 0;
                out = "This user has no warnings!";
            }
        });

        const embed = new MessageEmbed()
        .setTitle(`${user.user.username}'s Warnings`)
        .setDescription(`**Total Warnings:**\n${out_t}\n\n**Warnings:**\n${out}`)
        .setColor("#fbffd6");

        await interaction.reply({ embeds: [embed] });
    }
}