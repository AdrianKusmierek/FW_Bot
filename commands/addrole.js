const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");
const { client } = require("../app");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addrole")
        .setDescription("yeet")
        .addChannelOption(x => x
            .setName("channel")
            .setDescription("desired channel")
            .setRequired(true)   
        )
        .addStringOption(x => x
            .setName("messageid")
            .setDescription("desired message's id")
            .setRequired(true)
        )
        .addRoleOption(x => x
            .setName("role")
            .setDescription("desired role")
            .setRequired(true)
        )
        .addStringOption(x => x
            .setName("emoji")
            .setDescription("desired emoji for the role")
            .setRequired(true)
        ),

    init: () => {
        client.on("interactionCreate", interaction => {
            if (!interaction.isSelectMenu()) return;

            const { customId, values, member } = interaction;

            if (customId === "auto_roles") {
                const component = interaction.component;
                const removed = component.options.filter(x => {
                    return !values.includes(x.value);
                });

                for (const id in removed) {
                    member.roles.remove(id.value);
                }
                
                for (const id in values) {
                    member.roles.add(id);
                }

                interaction.reply({
                    content: "roles updated",
                    ephemeral: true
                });
            }
        });
    },

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const messageId = interaction.options.getString("messageid");
        const role = interaction.options.getRole("role");
        const emoji = interaction.options.getString("emoji");

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        });

        if (!targetMessage) {
            interaction.reply("Unknown Message ID");
        }

        let row = targetMessage.components[0];
        if (!row) {
            row = new MessageActionRow()
        }

        const option = [{
                label: role.name,
                value: role.id,
                emoji: emoji
            }];

        let menu = row.components[0];
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    interaction.repl({
                        custom: true,
                        content: `<@&${o.value}> is already a part of this menu`,
                        ephemeral: true,
                        allowedMentions: {
                            roles: []
                        }
                    });
                }
            }

            menu.addOptions(option);
            menu.setMaxValues(menu.options.length);
        } else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId("auto_roles")
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder("select your roles")
                    .addOptions(option)
            );
        }

        targetMessage.edit({
            components: [row]
        });

        interaction.reply({
            custom: true,
            content: `Added <@&${role.id}> to the auto_roles menu`,
            ephemeral: true,
            allowedMentions: {
                roles: []
            }
        });
    }
}