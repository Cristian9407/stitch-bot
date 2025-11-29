import { watchFile, unwatchFile } from 'fs'
import { isFunctionEnabled } from '../lib/owner-funciones.js'

if (!global.__modogruposBlock) global.__modogruposBlock = new Set()

let fileWatcher = null

function startWatcher() {
  if (fileWatcher) unwatchFile('./database/funciones-owner.json', fileWatcher)
  
  fileWatcher = () => {
    global.__modogruposBlock.clear()
  }
  
  watchFile('./database/funciones-owner.json', fileWatcher)
}

startWatcher()

function normalizeOwners(list) {
  if (!list) return []
  if (typeof list === 'string') return [list.replace(/\D/g, '')]
  if (Array.isArray(list)) {
    return list
      .flatMap(x => Array.isArray(x) ? (x[0] ? String(x[0]).replace(/\D/g, '') : '') : String(x).replace(/\D/g, ''))
      .filter(Boolean)
  }
  return []
}

export const isGlobalBefore = true

export async function before(m, { conn, isOwner, isROwner }) {
  try {
    if (m.fromMe) return false
    if (m.messageStubType) return false
    if (!m.sender) return false
    if (!m.text || m.text.trim() === '') return false

    const botJid = conn.user?.jid || conn.user?.id
    if (m.sender === botJid) return false

    const modogruposEnabled = isFunctionEnabled('modogrupos')
    
    if (!modogruposEnabled) {
      global.__modogruposBlock.delete(m.chat)
      return false
    }

    const isGroup = m.isGroup || (m.chat && m.chat.endsWith('@g.us'))
    
    if (isGroup) {
      global.__modogruposBlock.delete(m.chat)
      return false
    }

    const sender = (m.sender || '').split('@')[0].replace(/\D/g, '')
    const allOwners = [
      ...normalizeOwners(global.owner),
      ...normalizeOwners(global.roots),
      ...normalizeOwners(global.ownerJid),
      ...normalizeOwners(global.lidOwners)
    ]

    const isAnyOwner = isOwner || isROwner || (sender && allOwners.includes(sender))
    
    if (isAnyOwner) {
      global.__modogruposBlock.delete(m.chat)
      return false
    }

    global.__modogruposBlock.add(m.chat)
    return true
    
  } catch (e) {
    return false
  }
}        }
      }, 500);
      
      return true;
    }

    const warnings = {
      1: '⚠️ *ADVERTENCIA 1/3*\n\n*El bot no responde chats privados.*\n\n🔹 Para usar el bot, agrégalo a un grupo.\n🔹 Si insistes, serás bloqueado después de 3 advertencias.',
      2: '⚠️ *ADVERTENCIA 2/3*\n\n*Segunda advertencia: El bot NO funciona en privado.*\n\n🔹 Agrégame a un grupo para usarme.\n🔸 *Una advertencia más y serás bloqueado.*'
    };

    if (warnings[userData.warnings]) {
      setTimeout(async () => {
        try {
          await conn.sendMessage(m.chat, { 
            text: warnings[userData.warnings] 
          }, { quoted: m });
        } catch (e) {
          console.error('Error enviando advertencia:', e.message);
        }
      }, 500);
    }

    console.log(`⚠️ Advertencia ${userData.warnings}/3 a ${sender}`);
    
    if (global.modogruposWarnings.size > 500) {
      const entries = Array.from(global.modogruposWarnings.entries());
      entries.sort((a, b) => a[1].lastWarning - b[1].lastWarning);
      for (let i = 0; i < 250; i++) {
        global.modogruposWarnings.delete(entries[i][0]);
      }
    }

    return true;

  } catch (e) {
    console.error('❌ Error en modogrupos:', e.message);
    return false;
  }
}
