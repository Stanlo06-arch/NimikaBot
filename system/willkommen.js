const {
  AttachmentBuilder
} = require("discord.js");

const Canvas = require("canvas");
const path = require("path");
const { welcomeChannel } = require("../config/ids");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    try {
      const channel = member.guild.channels.cache.get(welcomeChannel);

      if (!channel) return;

      const canvas = Canvas.createCanvas(1200, 630);
      const ctx = canvas.getContext("2d");

      // Hintergrund
      ctx.fillStyle = "#FFF7FB";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Server Logo
      const serverLogo = await Canvas.loadImage(
        path.join(__dirname, "../assets/NimikaAvatar.png")
      );

      ctx.drawImage(serverLogo, 30, 30, 90, 90);

      // User Avatar
      const userAvatar = await Canvas.loadImage(
        member.user.displayAvatarURL({
          extension: "png",
          size: 512
        })
      );

      ctx.save();
      ctx.beginPath();
      ctx.arc(1080, 90, 45, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(userAvatar, 1035, 45, 90, 90);
      ctx.restore();

      // Servername
      ctx.fillStyle = "#4A4A4A";
      ctx.font = "bold 34px Sans";
      ctx.fillText("NIMIKA'S COZY COMMUNITY", 145, 70);

      // Titel
      ctx.fillStyle = "#E38BA8";
      ctx.font = "bold 42px Sans";
      ctx.fillText(
        "❤️ Willkommen auf meinem Server! ❤️",
        120,
        170
      );

      // User Text
      ctx.fillStyle = "#333333";
      ctx.font = "30px Sans";
      ctx.fillText(
        `Hey ${member.user.username} 🫶`,
        120,
        230
      );

      ctx.font = "24px Sans";

      ctx.fillText(
        "Schön, dass du den Weg auf unseren Server gefunden hast!",
        120,
        280
      );

      ctx.fillText(
        "Wir freuen uns sehr, dich in unserer Community begrüßen zu dürfen.",
        120,
        320
      );

      ctx.fillText(
        "Viel Spaß beim Chatten, Spielen und Entdecken! 🌷",
        120,
        360
      );

      // Banner
      const banner = await Canvas.loadImage(
        path.join(__dirname, "../assets/NimikaBanner.png")
      );

      ctx.drawImage(
        banner,
        100,
        410,
        1000,
        170
      );

      // Footer
      ctx.fillStyle = "#888888";
      ctx.font = "20px Sans";
      ctx.fillText(
        "🌸 Hostet by 𝔖𝔱𝔞𝔫𝔩𝔢𝔶_𝔯𝔪𝔭.06 ♕",
        30,
        610
      );

      const attachment = new AttachmentBuilder(
        canvas.toBuffer("image/png"),
        {
          name: "welcome-card.png"
        }
      );

      await channel.send({
        files: [attachment]
      });

    } catch (err) {
      console.error(err);
    }
  });
};
