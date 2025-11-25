const SOCIAL_MEDIA_KEYWORDS = [
  'redes sociales', 'redes', 'tienes canal'
];

function canHandle(text) {
  const lowerText = text.toLowerCase();
  return SOCIAL_MEDIA_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

function getSocialMediaResponse() {
  return `🌟 ¡Por supuesto! Aquí tienes todas mis redes sociales oficiales: 💫\n\n📱 **Mis Redes Sociales:**\n\n🙂 **GitHub:** \nhttps://github.com/Cristian593/Stitch-Bot\n\n📢 **Canal Oficial de WhatsApp:** \nhttps://whatsapp.com/channel/0029VbANyNuL\n\n📘 **Facebook:** \nhttps://www.facebook.com/profile.php?id=6158060\n\n📸 **Instagram:** \nhttps://www.instagram.com/stitchbot?igsh=MTI4eGY5ZFsZA==\n\n✨ ¡Sígueme para estar al tanto de todas las novedades y actualizaciones! 🚀\n\n💜 *Creado con amor por Cristian* 🌙`;
}

async function handle(inputText, context) {
  const { conn, msg, jid } = context;
  
  try {
    const socialResponse = getSocialMediaResponse();
    await conn.sendMessage(jid, { text: socialResponse }, { quoted: msg });
  } catch (socialError) {
    console.error('Error enviando redes sociales:', socialError.message);
    await conn.sendMessage(jid, { text: '⚠️ Error temporal mostrando mis redes sociales. Intenta de nuevo.' }, { quoted: msg });
  }
}

export default { canHandle, handle, name: 'social', description: 'Plugin para mostrar redes sociales del bot' };