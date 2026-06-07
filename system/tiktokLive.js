const { WebcastPushConnection } = require("tiktok-live-connector");
const { EmbedBuilder } = require("discord.js");

const TIKTOK_USERNAME = "itsnimika";
const LIVE_CHANNEL_ID = "1513122714720665731";

let liveSent = false;

module.exports = (client) => {
  const tiktokLive = new WebcastPushConnection(TIKTOK_USERNAME);

  tiktokLive.connect().catch(console.error);

  tiktokLive.on("streamStart", async () => {
    if (liveSent) return;

    liveSent = true;

    const channel = await client.channels.fetch(LIVE_CHANNEL_ID);

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("#F8C8DC")
      .setAuthor({
        name: "🌸 Nimika's Cozy Community",
        iconURL: client.guilds.cache.first()?.iconURL()
      })
      .setThumbnail(
        client.guilds.cache.first()?.iconURL()
      )
      .setTitle("🔴 ITSNIMIKA IST JETZT LIVE!")
      .setDescription(
`🔔 @everyone

💖 Schau jetzt auf TikTok vorbei!

🎥 @itsnimika

🔗 https://www.tiktok.com/@itsnimika`
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

   await channel.send({
  content: "@everyone",
  embeds: [embed],
  allowedMentions: {
    parse: ["everyone"]
  }
});

    console.log("🔴 TikTok Live erkannt");
  });

  tiktokLive.on("streamEnd", () => {
    liveSent = false;
    console.log("⚫ TikTok Stream beendet");
  });
};
