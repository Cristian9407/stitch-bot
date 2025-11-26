const handler = async (m, { conn }) => {
  const texto = `
🌙 *Hola, soy Stitch Bot* 🌙

👑 *Creador:*
• Cristian C
• wa.me/593985807958

🛠️ *Mod Stitch:*
• wa.me/593990110616

🛠️ *Mod Walle:*
• wa.me/593960175832

📢 *Canal oficial:*
https://whatsapp.com/channel/0029VaDSuZcATRSmU4LvDm0Q

✨ ¡Gracias por usar Stitch Bot!
`.trim();

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|propietario)$/i;
export default handler;
