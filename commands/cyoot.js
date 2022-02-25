const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cyoot")
        .setDescription("Role menu for choosing whether you're cute or not!"),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Select a Role!")
                    .addOptions([
                        {
                            label: "Cyoot",
                            description: "Choose this role if you're cute!",
                            value: "cyoot",
                            emoji: "<:collar:872814610321911848>"
                        },
                        {
                            label: "Not Cyoot",
                            description: "Choose this role if you're not cute!",
                            value: "not cyoot",
                            emoji: "<:OwO:874669957638680616>"
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
            .setTitle("Choose if you're cute!")
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