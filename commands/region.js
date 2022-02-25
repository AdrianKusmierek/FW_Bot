const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("region")
        .setDescription("Role menu for choosing your region!"),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Select a Role!")
                    .addOptions([
                        {
                            label: "Africa",
                            description: "Choose this role if you're in Africa!",
                            value: "Africa",
                            emoji: "🌍"
                        },
                        {
                            label: "Asia",
                            description: "Choose this role if you're in Asia!",
                            value: "Asia",
                            emoji: "🌏"
                        },
                        {
                            label: "Europe",
                            description: "Choose this role if you're in Europe!",
                            value: "Europe",
                            emoji: "💶"
                        },
                        {
                            label: "North America",
                            description: "Choose this role if you're North America!",
                            value: "North America",
                            emoji: "🏈"
                        },
                        {
                            label: "Oceania",
                            description: "Choose this role if you're Oceania!",
                            value: "Oceania",
                            emoji: "🌊"
                        },
                        {
                            label: "South America",
                            description: "Choose this role if you're South America!",
                            value: "South America",
                            emoji: "🌎"
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
            .setTitle("Choose your region!")
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