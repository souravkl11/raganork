/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {
    Module
} = require('../main');
Module({
    pattern: 'react ?(.*)',
    fromMe: true,
    use: 'whatsapp'
}, (async (m, t) => {
    let msg = {
        remoteJid: m.reply_message.jid,
        id: m.reply_message.id
    }
    const reactionMessage = {
        react: {
            text: t[1],
            key: msg
        }
    }

    await m.client.sendMessage(m.jid, reactionMessage);
}));
Module({
    pattern: 'edit ?(.*)',
    fromMe: true,
    use: 'whatsapp'
}, (async (m, t) => {
    if (t[1] && m.reply_message?.text && m.quoted.key.fromMe){
    await m.edit(t[1],m.jid,m.quoted.key);
}
}));
Module({
    pattern: 'retry ?(.*)',
    fromMe: false,
    desc: 'Retries replied command to run the command again',
    use: 'misc'
}, (async (m, t) => {
    if (!m.reply_message) return await m.sendReply('_Reply to a command message_')
    await m.client.ev.emit('messages.upsert',{messages: [m.quoted],type: 'notify'})
}));
Module({
    pattern: 'vv ?(.*)',
    fromMe: true,
    desc: "Anti view once",
    use: 'utility'
}, (async (m, t) => {
    if (!m.reply_message || (!m.quoted?.message.hasOwnProperty('viewOnceMessage') &&  !m.quoted?.message.hasOwnProperty('viewOnceMessageV2'))) return await m.sendReply("_Not a view once msg!_") 
    m.quoted.message = m.quoted.message.viewOnceMessage?.message || m.quoted.message.viewOnceMessageV2?.message;
    m.quoted.message[Object.keys(m.quoted.message)[0]].viewOnce = false
    await m.forwardMessage(m.jid,m.quoted)
    }));
