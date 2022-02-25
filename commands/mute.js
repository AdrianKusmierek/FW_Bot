/*
To be made

https://discord.com/developers/docs/resources/guild#modify-guild-member
*/

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Time for mute in minutes")
    .addUserOption(x => 
        x
        .setName("user")
        .setDescription("Select a user")
    )
    .addIntegerOption(x =>
        x
        .setName("time")
        .setDescription("Select amount of time for the mute")
    ),

    async execute(interaction) {
        var myVar = interaction.options._hoistedOptions;

        for (let i = 0; myVar.length - 1; i++) {
            for (const x in myVar[i]) {
                if (x == "value") {
                    let z = myVar[i][x];
                    let tgt;
                    let time;

                    if (z.length > 3) {
                        tgt = interaction.guild.members.cache.find(x => x.id == z);
                    } else {
                        time = z;
                    }

                    // console.log(tgt.communication_disabled_until);

                    let temp = tgt;
                    for (const y in temp) {
                        if (y == "communicationDisabledUntilTimestamp") {
                            console.log(temp[y]);
                        }
                    }
                }
            }
        }
    }
}

//Coded by A.S. Kuśmierek