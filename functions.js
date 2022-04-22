//////////////////////////////////////////////////////////////////////////////
/*                                 Functions                                */
//////////////////////////////////////////////////////////////////////////////

function deploy() {
    try {
        const { REST } = require("@discordjs/rest");
        const { Routes } = require("discord-api-types/v9");
        const { token, clientId, guildId } = require("./config");
        const fs = require("fs");
        
        const commands = [];
        const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        
        cmdFiles.forEach(file => {
            const cmd = require(`./commands/${file}`);
        
            commands.push(cmd.data.toJSON());
        });
        
        const rest = new REST({ version: "9" }).setToken(token);
        
        rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => {
            console.log(`${(new Date).toLocaleDateString('pl-PL')} ${(new Date).toLocaleTimeString('en-US')}: Successfully deployed the commands!`);
        })
        .catch(console.error);
    } catch (err) {
        console.error(err);
    }
}

function warnsReset() {
    var tgt = new Date(2023, 0, 1);
    var daysOfYear = [];
    for (var d = new Date(2022, 2, 7); d <= tgt; d.setDate(d.getDate() + 7)) {
        daysOfYear.push(new Date(d));

        const x = new Date();
        x.setHours(0, 0, 0, 0);

        if (x.toString() == d.toString()) {
            console.log("All warnings have been reset!")
            fs.writeFileSync("data/warns.json", "[]", "utf8");
        }
    }
}

exports.deploy = deploy;
exports.warnsReset = warnsReset;