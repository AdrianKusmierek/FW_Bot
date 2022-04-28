const { deploy } = require("../functions");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Logged in as: ${client.user.tag}`);
        
        deploy();

        client.user.setActivity("myself burn~", { type: "WATCHING" });
    }
}