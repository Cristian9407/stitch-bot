const handler = async (m, { conn }) => {
  const name = await conn.getName(m.sender);
  const donar = `
┏━━━━━━━━━━━━━━━━━┓
┃ 🌙 *StitchBot V6* -             ┃
┗━━━━━━━━━━━━━━━━━┛

¡Hola, *${name}*!  
Gracias por usar *StitchBot V6*.

Este bot está inspirado en el gran trabajo de *Cristian C* y su bot *Stitch-Bot*.  
Gracias a su aporte, fue posible crear nuevas herramientas y funciones útiles para ti.

✨ *Si quieres hacer una donación*  
Puedes hacerlo desde el siguiente enlace:
👉 _https://www.paypal.me/CriSy94_

Cualquier donación es muy apreciada ❤️

¡Gracias por tu confianza y apoyo!

⚙️ *Versión*: StitchBot V6  
❤️ *Creado con cariño para ti*  
`.trim();

  await conn.sendMessage(m.chat, { text: donar }, { quoted: m });
};

handler.command = /^dona(te|si)?|donar|apoyar$/i;
handler.help = ['donar', 'apoyar'];
handler.tags = ['info'];
export default handler;
