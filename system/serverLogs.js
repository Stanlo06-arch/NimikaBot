const { EmbedBuilder } = require("discord.js");

const LOG_CHANNEL_ID = "1513199769961627769";

module.exports = (client) => {
  client.once("ready", async () => {
    const channel = await client.channels.fetch(LOG_CHANNEL_ID);

    if (!channel) return;

    const messages = await channel.messages.fetch({ limit: 20 });

    const oldLogs = messages.filter(
      (msg) =>
        msg.author.id === client.user.id &&
        msg.embeds.length > 0 &&
        msg.embeds[0].title === "📊 SERVER LOGS"
    );

    for (const [, msg] of oldLogs) {
      await msg.delete().catch(() => {});
    }

    const embed = new EmbedBuilder()
      .setColor("#F8C8DC")
      .setAuthor({
        name: "🌸 Nimika's Cozy Community",
        iconURL: client.guilds.cache.first()?.iconURL()
      })
      .setThumbnail(
        client.guilds.cache.first()?.iconURL()
      )
      .setTitle("📊 SERVER LOGS")
      .setDescription(
`🟢 **BOT STATUS**

📡 Ping: ${client.ws.ping}ms
👥 Server: ${client.guilds.cache.size}

🕒 Uptime: Wird geladen...

✅ Status: Online`
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1510626895627288676/1521547336529219715/file_00000000d71c71f496a0ef5675ce39e3.png?ex=6a453ae2&is=6a43e962&hm=b7eed4cf1778e7a65b8c8bd7a4ab3092d6939cbf663d29285af96cafb0a7aa00&"
      )
      .setFooter({
        text: "Hostet by 𝔖𝔱𝔞𝔫𝔩𝔢𝔶_𝔯𝔪𝔭.06 ♕",
        iconURL:
          "https://cdn.discordapp.com/attachments/1510626895627288676/1513151420835168347/123.png"
      })
      .setTimestamp();

    const logMessage = await channel.send({
      embeds: [embed]
    });

    setInterval(async () => {
      const uptime = Math.floor(client.uptime / 1000);

      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = uptime % 60;

      const updatedEmbed = new EmbedBuilder()
        .setColor("#F8C8DC")
        .setAuthor({
          name: "🌸 Nimika's Cozy Community",
          iconURL: client.guilds.cache.first()?.iconURL()
        })
        .setThumbnail(
          client.guilds.cache.first()?.iconURL()
        )
        .setTitle("📊 SERVER LOGS")
        .setDescription(
`🟢 **BOT STATUS**

📡 Ping: ${client.ws.ping}ms
👥 Server: ${client.guilds.cache.size}

🕒 Uptime: ${hours}h ${minutes}m ${seconds}s

✅ Status: Online`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/1510626895627288676/1513141910791913533/NimikaBanner.png"
        )
        .setFooter({
          text: "Hostet by 𝔖𝔱𝔞𝔫𝔩𝔢𝔶_𝔯𝔪𝔭.06 ♕",
          iconURL:
            "https://cdn.discordapp.com/attachments/1510626895627288676/1513151420835168347/123.png"
        })
        .setTimestamp();

      await logMessage.edit({
        embeds: [updatedEmbed]
      });
    }, 30000);

    console.log("📊 Server Logs gestartet");
  });
};
