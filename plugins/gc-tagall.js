
import { getGroupDataForPlugin } from '../lib/funcion/pluginHelper.js';

const cooldowns = new Map();

const handler = async (m, { conn, args, isOwner }) => {
  try {
    if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos');

    const { participants, isAdmin } = await getGroupDataForPlugin(conn, m.chat, m.sender);

    if (!isAdmin && !isOwner) {
      return m.reply('⚠️ Este comando solo puede ser usado por administradores del grupo.');
    }

    const chatId = m.chat;
    const cooldownTime = 1 * 30 * 1000;
    const now = Date.now();

    if (cooldowns.has(chatId)) {
      const expire = cooldowns.get(chatId) + cooldownTime;
      if (now < expire) {
        const left = expire - now;
        return m.reply(`⏰ Debes esperar ${Math.floor(left / 30000)}m ${Math.floor((left % 30000) / 1000)}s antes de usar este comando nuevamente.`);
      }
    }
    cooldowns.set(chatId, now);

    const resolveLid = jid => {
      if (!jid?.includes('@lid')) return conn.decodeJid(jid);
      const p = participants.find(x => x.lid === jid);
      return p ? conn.decodeJid(p.id) : null;
    };

    const mentionSet = new Set();
    participants.forEach(p => mentionSet.add(conn.decodeJid(p.id)));

    let messageText = args.join(' ') || ' A T E N C I Ó N';

    if (m.mentionedJid?.length) {
      for (const lid of m.mentionedJid) {
        const real = resolveLid(lid);
        if (!real) continue;
        mentionSet.add(real);
        messageText = messageText.replace(/@\S+/, `@${real.split('@')[0]}`);
      }
    }

    let teks = `♥️  *T O D O S*\n`;
    let readmore = String.fromCharCode(8206).repeat(4001)
    teks += `${messageText}\n\n${readmore}`;

    for (const jid of mentionSet) {
      teks += `◦  @${jid.split('@')[0]}\n`;
    }

    teks += `\n`;
    teks += `╰╴╴╴╴ *S T I T C H*  ╴╴╴╯`;

    await conn.sendMessage(chatId, { text: teks, mentions: [...mentionSet] });
  } catch (e) {
    await m.reply('❌ Error al ejecutar el comando.');
  }
};

handler.help = ['tagall <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i;
handler.group = true;

export default handler;
