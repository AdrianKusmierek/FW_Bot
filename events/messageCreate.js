const { deploy } = require("../functions");

module.exports = {
    name: "messageCreate",
    once: false,
    execute(message) {
        if (message.content.toLowerCase() == "!deploy" && message.member.permissions.has("ADMINISTRATOR")) {
            deploy();
        }
    }
}