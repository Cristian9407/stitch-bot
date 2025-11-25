const handler = async (m, { conn }) => {
  if (m.isBaileys) return;
  if (/^[!./#]/.test(m.text)) return;
  if (m.quoted) return;

  const texto = `
🌟 *¡HOLA, AMIG@!* 🌟

*Soy StitchBot V6,* tu asistente virtual 🤖  
_¡List@ para ayudarte en todo momento!_ ✨

👉 *¿En qué puedo ayudarte HOY?*  
Solo toca el botón para empezar. ⬇️
`;

  const botones = [
    ['📋 *Abrir Menú*', '.menu']
  ];

  await conn.sendButton(
    m.chat,
    texto.trim(),
    '💫 StitchBot V6 - Siempre a tu lado 💫',
    null,
    botones,
    null,
    null,
    m
  );
};

handler.customPrefix = /^(stitch|bot)$/i;
handler.command = /^$/;
handler.fail = null;

export default handler;