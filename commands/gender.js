const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pronouns")
        .setDescription("Role menu for choosing your pronouns!"),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Select a Role!")
                    .addOptions([
                        {
                            label: "He/Him",
                            description: "Choose this role for the He/Him pronouns!",
                            value: "He/Him",
                            emoji: "❤️"
                        },
                        {
                            label: "She/Her",
                            description: "Choose this role for the She/Her pronouns!",
                            value: "She/Her",
                            emoji: "💚"
                        },
                        {
                            label: "They/Them",
                            description: "Choose this role for the They/Them pronouns!",
                            value: "They/Them",
                            emoji: "💜"
                        },
                        {
                            label: "Reset Roles",
                            description: "Choose this to reset the roles!",
                            value: "remove",
                            emoji: "❌"
                        }
                    ])
            );

        const embed = new MessageEmbed()
            .setTitle("Choose your pronouns!")
            .setColor("#fbffd6");

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU",
        });

        collector.on("collect", async(collected) => {
            let value = collected.values[0];
            let role = interaction.guild.roles.cache.find(x => x.name == value);

            if (value == "remove") {
                for (let i = 0; i <= row.components[0].options.length - 2; i++) {                    
                    var rmRole = interaction.guild.roles.cache.find(x => x.name == row.components[0].options[i].value);

                    for (const x in rmRole) {
                        if (x == "id") {
                            interaction.member.roles.remove(rmRole[x]);
                        }
                    }
                }


            } else {
                interaction.member.roles.add(role);

            }

            collected.deferUpdate();
        });

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}

//Coded by A.S. Kuśmierek