require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Partials
} = require("discord.js");

// ================== CONFIG ==================
const TOKEN=process.env.TOKEN;

// NÁZVY – musí existovat na serveru
const AUTO_ROLE_NAME = "Client";
const WELCOME_CHANNEL_NAME = "welcome";
const TICKET_CHANNEL_NAME = "create-ticket";
// ============================================

// Vytvoření klienta
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

// Ready
client.once("ready", () => {
  console.log(`✅ Welcome bot online as ${client.user.tag}`);
});

// Když přijde nový člen
client.on("guildMemberAdd", async (member) => {
  console.log(`🟢 New member joined: ${member.user.tag}`);

  // ===== AUTO ROLE =====
  try {
    const role = member.guild.roles.cache.find(
      (r) => r.name === AUTO_ROLE_NAME
    );

    if (role) {
      await member.roles.add(role);
      console.log("✅ Role added:", AUTO_ROLE_NAME);
    } else {
      console.log("❌ Role not found:", AUTO_ROLE_NAME);
    }
  } catch (err) {
    console.log("❌ Error adding role:", err.message);
  }

  // ===== WELCOME CHANNEL =====
  try {
    const channel = member.guild.channels.cache.find(
      (c) => c.name === WELCOME_CHANNEL_NAME
    );

    if (channel) {
      await channel.send(
        `👋 **Welcome to the server, ${member}!**

My name is **Patrik** and I specialize in:
💻 Websites  
🤖 Discord bots  
🎮 Mini games  

🎫 **Need a custom project or help?**
➡️ Go to **#${TICKET_CHANNEL_NAME}**  
➡️ Click the **Create Ticket** button  

I’ll be happy to help you 🚀`
      );
      console.log("✅ Welcome message sent");
    } else {
      console.log("❌ Welcome channel not found:", WELCOME_CHANNEL_NAME);
    }
  } catch (err) {
    console.log("❌ Error sending welcome message:", err.message);
  }

  // ===== DM MESSAGE =====
  try {
    await member.send(
      `👋 Hi ${member.user.username}!

Welcome to the server!

My name is **Patrik** and I specialize in:
💻 Websites  
🤖 Discord bots  
🎮 Mini games  

🎫 If you need a custom project or any help:
➡️ Go to **#${TICKET_CHANNEL_NAME}**
➡️ Click the **Create Ticket** button  

I’ll be happy to help you 🚀  
Patrik`
    );
    console.log("✅ DM sent");
  } catch (err) {
    console.log("❌ DM could not be sent (DMs closed)");
  }
});

// Login
client.login(TOKEN);
