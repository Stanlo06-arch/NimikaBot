const { AttachmentBuilder } = require("discord.js");
const Canvas = require("canvas");
const { welcomeChannel } = require("../config/ids");

module.exports = (client) => {
client.on("guildMemberAdd", async (member) => {
const channel = member.guild.channels.cache.get(welcomeChannel);
  
if (!channel) return;

const canvas = Canvas.createCanvas(1200, 630);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#FFF7FB";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#000000";
ctx.font = "40px Sans";
ctx.fillText("🌸 Willkommen auf meinem Server! ❤️", 50, 100);

const attachment = new AttachmentBuilder(
  canvas.toBuffer("image/png"),
  { name: "welcome.png" }
);

await channel.send({ files: [attachment] });

});
};
