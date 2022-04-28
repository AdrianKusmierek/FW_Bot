const { deploy } = require("../functions");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    name: "messageCreate",
    once: false,
    execute(message, client) {
        if (message.content.toLowerCase() == "!deploy" && message.member.permissions.has("ADMINISTRATOR")) {
            deploy();
        }
    }
}