//////////////////////////////////////////////////////////////////////////////
/*                               Main Variables                             */
//////////////////////////////////////////////////////////////////////////////

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

//////////////////////////////////////////////////////////////////////////////
/*                               Main Function                              */
//////////////////////////////////////////////////////////////////////////////

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
        You've been warned in Furry World by <@${interaction.member.user.id}> for ${reason}.
        If you think that warning is unrightful please feel free to contact our Staff Team!
        
        Yours,
        Furry World Staff Team`;

        const embed = new MessageEmbed()
        .setTitle("Warning!")
        .setDescription(warnMsg)
        .setColor("#fbffd6");

        await interaction.reply({ 
            content: `**User** ${user} **has been warned!**\n**Reason:** ${reason}`,
            ephemeral: true
        });

        user.send({ embeds: [embed] });

        //////////////////////////////////////////////////////////////////////////////
        /*                               Warn Function                              */
        //////////////////////////////////////////////////////////////////////////////

        var dataPath = require("path").resolve(__dirname, '..') + "/data"
        var myData = fs.readFileSync(`${dataPath}/warns.json`, "utf8");
        var data = JSON.parse(myData);

        var warnObj = {
            username: user.user.id,
            reason: [reason],
            warns: +1
        };

        if (data.length < 1) {
            data.push(warnObj);
        } else {
            //////////////////////////////////////////////////////////////////////////////
            /*                               Writing to File                            */
            //////////////////////////////////////////////////////////////////////////////

            data.forEach(xdata => {
                if (data.some(item => item.username == user.user.id)) {
                    if (xdata.username == user.user.id) {
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

        //////////////////////////////////////////////////////////////////////////////
        /*                                 Logging                                  */
        //////////////////////////////////////////////////////////////////////////////
        
        const logChannel = interaction.guild.channels.cache.get("969295508499746868");

        const logEmbed = new MessageEmbed()
        .setTitle(`Warned ${user.user.tag}`)
        .setDescription(`**Reason:** ${reason}\n**Warned by:** <@${interaction.member.user.id}>`)
        .setColor("#fbffd6");

        logChannel.send({ embeds: [logEmbed] });
    }
}