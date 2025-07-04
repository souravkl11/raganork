/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {
    Module
} = require('../main');
const sql = require('./sql/greeting');
const Language = require('./misc/lang');
const Lang = Language.getString('greetings');

Module({
    pattern: '♥️          *══❥ⵗⵗ̥̥̊̊ⵗ̥̥̥̥̊̊̊ⵗ̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̥̥̥̥̥̊̊̊ⵗ̥̥̥̥̥̥̥̥̥̥̊̊ⵗ̥̥̥̥̥̥̥̥̥̥̥ⵗ̥̥̥̥̥̥̥̥̥̥̊̊ⵗ̥̥̥̥̥̥̥̥̥̊̊̊ⵗ̥̥̥̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̊̊̊ⵗ̥̥̊̊══❥.           ♥️* 

        
     ➪ ♨️ *🆂︎ᴀᴠᴇ 🅼︎ʏ 🅽︎ᴜᴍʙᴇʀ 🅵︎ᴏʀ 🆂︎ᴛᴀᴛᴜ𝚜 🆅︎ɪᴇᴡ𝚜 ♥️👈🏻*

 ✨𝙉𝓪𝗺ĕ
*☞ͥ͟⋆ͣ͟⋆ͫ🔥᭄ARKADIP 🌻✨💞❥︎  💖*
                   🇫 🇷 🇴 🇲
             *☘️♥  Medinipur  ♥︎☘️*


*♨️𝚖𝚜𝚐 𝚖𝚎 + 91 9635126740 📲*

*👉🏻 ❥︎🅢︎ᴇɴᴅ ❥︎🅨︎ᴏᴜʀ ❥︎🅝︎ᴀᴍᴇ ❥︎ 👈*

       *𝗦ᴀᴠᴇ 𝗞ᴀʀ 𝗞ᴇ 𝗗ᴏɴᴇ 𝗟ɪᴋʜ𝚘',
    use: 'group',
    fromMe: true,
    desc: Lang.WELCOME_DESC
}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.sendReply(Lang.NOT_SET_WELCOME);
    } else {
        await message.sendReply(Lang.WELCOME_ALREADY_SETTED + hg.message);
    }
}));
Module({
    pattern: 'welcome (.*)',
    fromMe: true,
    use: 'group',
    dontAddCommandList: true
}, (async (message, match) => {
    if (match[1] === 'delete') {
        await message.send(Lang.WELCOME_DELETED);
        return await sql.deleteMessage(message.jid, 'welcome');
    }
    await sql.setMessage(message.jid, 'welcome', match[1].replace(/&/g, '\n'));
    return await message.sendReply(Lang.WELCOME_SETTED)
}));
Module({
    pattern: 'goodbye$',
    fromMe: true,
    desc: Lang.GOODBYE_DESC,
    use: 'group'
}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.sendReply(Lang.NOT_SET_GOODBYE)
    } else {
        await message.send(Lang.GOODBYE_ALREADY_SETTED + hg.message);
    }
}));
Module({
    pattern: 'goodbye (.*)',
    fromMe: true,
    dontAddCommandList: true,
    use: 'group'
}, (async (message, match) => {
    if (match[1] === 'delete') {
        await message.sendReply(Lang.GOODBYE_DELETED);
        return await sql.deleteMessage(message.jid, 'goodbye');
    }
    await sql.setMessage(message.jid, 'goodbye', match[1].replace(/#/g, '\n'));
    return await message.send(Lang.GOODBYE_SETTED)
}));
