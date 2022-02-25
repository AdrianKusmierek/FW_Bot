const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("species")
        .setDescription("Role menu for choosing sona species!"),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Select a Role!")
                    .addOptions([
                        {
                            label: "Avali",
                            description: "Choose this role if you're a avali!",
                            value: "Avali",
                            emoji: "🐤"
                        },
                        {
                            label: "Dog",
                            description: "Choose this role if you're a dog!",
                            value: "Dog",
                            emoji: "🐶"
                        },
                        {
                            label: "Dragon",
                            description: "Choose this role if you're a dragon!",
                            value: "Dragon",
                            emoji: "🐲"
                        },
                        {
                            label: "Feline",
                            description: "Choose this role if you're a feline!",
                            value: "Feline",
                            emoji: "🐱"
                        },
                        {
                            label: "Fox",
                            description: "Choose this role if you're a fox!",
                            value: "Fox",
                            emoji: "🦊"
                        },
                        {
                            label: "Husky",
                            description: "Choose this role if you're a husky!",
                            value: "Husky",
                            emoji: "🐕‍🦺"
                        },
                        {
                            label: "Protogen",
                            description: "Choose this role if you're a protogen!",
                            value: "Protogen",
                            emoji: "🐕<:BOOP:887078030076428318>"
                        },
                        {
                            label: "Wolf",
                            description: "Choose this role if you're a wolf!",
                            value: "Wolf",
                            emoji: "🐺"
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
            .setTitle("Choose your species!")
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

                    // interaction.member.roles.remove(rmRole.id);
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