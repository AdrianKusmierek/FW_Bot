const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sexuality")
        .setDescription("Role menu for choosing your sexuality!"),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Select a Role!")
                    .addOptions([
                        {
                            label: "Gay",
                            description: "Choose this role if you're gay!",
                            value: "Gay",
                            emoji: "🌈"
                        },
                        {
                            label: "Lesbian",
                            description: "Choose this role if you're lesbian!",
                            value: "Lesbian",
                            emoji: "2️⃣"
                        },
                        {
                            label: "Bisexual",
                            description: "Choose this role if you're bisexual!",
                            value: "Bisexual",
                            emoji: "3️⃣"
                        },
                        {
                            label: "Pansexual",
                            description: "Choose this role if you're pansexual!",
                            value: "Pansexual",
                            emoji: "4️⃣"
                        },
                        {
                            label: "Asexual",
                            description: "Choose this role if you're asexual!",
                            value: "Asexual",
                            emoji: "5️⃣"
                        },
                        {
                            label: "Heterosexual",
                            description: "Choose this role if you're heterosexual!",
                            value: "Heterosexual",
                            emoji: "6️⃣"
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
            .setTitle("Choose your sexuality!")
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