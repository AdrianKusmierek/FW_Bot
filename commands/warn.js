const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

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

//////////////////////////////////////////////////////////////////////////////

        var dataPath = require("path").resolve(__dirname, '..') + "/data"
        var myData = fs.readFileSync(`${dataPath}/warns.json`, "utf8");
        var data = JSON.parse(myData);

        var warnObj = {
            username: user.user.tag,
            reason: [reason],
            warns: +1
        };

        if (data.length < 1) {
            data.push(warnObj);
        } else {
            data.forEach(xdata => {
                if (data.some(item => item.username == user.user.tag)) {
                    if (xdata.username == user.user.tag) {
                        xdata.warns++;
                        xdata.reason.push(reason);
                    }
                } else {
                    data.push(warnObj);
                }
            });
        }

        myData = JSON.stringify(data);

        fs.writeFileSync(`${dataPath}/warns.json`, myData, "utf8");
    }
}