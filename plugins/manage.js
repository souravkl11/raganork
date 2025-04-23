/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
function containsDisallowedWords(str,disallowedWords) {
    str = str.toLowerCase()
    for (let word of disallowedWords){
      if (str.match(word)){
        let otherWords = str.replace(word,'±').split('±')
        for (let _word of otherWords){
          str = str.replace(_word,'')
        }
        let filteredWord = str;
        return filteredWord;
      } 
    }
  }
function checkLinks(links, allowedWords) {
    let testArray = []
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      let isAllowed = true;
      for (let j = 0; j < allowedWords.length; j++) {
        const allowedWord = allowedWords[j];
        if (link.includes(allowedWord)) {
          isAllowed = true; // Word is allowed
          break;
        }
        isAllowed = false; // Word is not allowed
      }
      
        testArray.push(isAllowed)
      }
    return testArray.includes(false)
  }
async function sendButton(buttons,text,footer,message){
    const buttonMessage = {text,footer,buttons,headerType: 1}
    return await message.client.sendMessage(message.jid, buttonMessage)
    };
    const isVPS = !(__dirname.startsWith("/rgnk") || __dirname.startsWith("/skl"));
    const isHeroku = __dirname.startsWith("/skl");
    const {
        Module
    } = require('../main');
    const {
        update
    } = require('./misc/koyeb');
    const pm2 = require('pm2')
    const {
        isAdmin,
        antilink,
        antiword,
        antibot,
        antispam,
        antipromote,
        antidemote,
        pdm,
    } = require('./misc/misc');
    const {
        skbuffer 
    } = require('raganork-bot');
    const { 
        chatBot
    } = require('./misc/misc');
    const Config = require('../config');
    const config = require('../config');
    const {getCommands} = require('./commands');
    const {HEROKU, settingsMenu,ADMIN_ACCESS} = require('../config');
    const Heroku = require('heroku-client');
    const fs = require('fs');
    const got = require('got');
    const {
        getString
    } = require('./misc/lang');
    const Lang = getString('heroku');
    const heroku = new Heroku({
        token: Config.HEROKU.API_KEY
    });
    let baseURI = '/apps/' + Config.HEROKU.APP_NAME;
    var handler = Config.HANDLERS !== 'false'?Config.HANDLERS.split("")[0]:""
        async function fixHerokuAppName(message = false){
            if (!HEROKU.API_KEY && message) return await message.sendReply(`_You have not provided HEROKU_API_KEY\n\nPlease fill this var, get api key from heroku account settings_`)
            let apps = await heroku.get('/apps')
            let app_names = apps.map(e=>e.name)
            if (!HEROKU.APP_NAME || !app_names.includes(Config.HEROKU.APP_NAME)){
            function findGreatestNumber(e){let t=e[0];for(let n=1;n<e.length;n++)e[n]>t&&(t=e[n]);return t}
            let times = apps.map(e=>new Date(e.updated_at).getTime())
            let latest = findGreatestNumber(times)
            let index = times.indexOf(latest)
            let app_name = apps[index].name
            Config.HEROKU.APP_NAME = app_name
            process.env.HEROKU_APP_NAME = app_name
            baseURI = '/apps/' + app_name;
            if (message) await message.sendReply(`_You provided an incorrect heroku app name, and I have corrected your app name to "${app_name}"_\n\n_Please retry this command after restart!_`)    
            Config.HEROKU.APP_NAME = app_name
                return await setVar("HEROKU_APP_NAME",app_name,message)
            }
        }
        async function setVar(key,value,message = false){
        key = key.toUpperCase().trim()
        value = value.trim()
        let setvarAction = isHeroku ? "restarting" : isVPS ? "rebooting" : "redeploying";
        var set_ = `_Successfully set ${key} to ${value}, {}.._`;
        set_ = key == "ANTI_BOT" ? `AntiBot activated, bots will be automatically kicked, {}` : key == "ANTI_SPAM" ? `AntiSpam activated, spammers will be automatically kicked, {}` :key == "CHATBOT" ? `AI Chatbot turned ${value}, {}` : key == "MODE" ? `Mode switched to ${value}, {}`:set_;
        set_ = set_.format(setvarAction)
        let m = message;
        if (isHeroku) {
            await fixHerokuAppName(message)
            await heroku.patch(baseURI + '/config-vars', {
                body: {
                    [key]: value
                }
            }).then(async (app) => {
                if (message){
                return await message.sendReply(set_)
                }
            });
        }
        if (isVPS){
        try { 
        var envFile = fs.readFileSync(`./config.env`,'utf-8')
        const lines = envFile.trim().split('\n');
        let found = false;
        for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith(`${key}=`)) {
            // If the line matches the variable name, replace the value
            lines[i] = `${key}="${value}"`;
            found = true;
            break;
        }
        }
        if (!found) {
        lines.push(`${key}="${value}"`);
        }
fs.writeFileSync('./config.env', lines.join('\n'));
        if (message){
        await m.sendReply(set_)
        }
        if (key == "SESSION"){
        await require('fs-extra').removeSync('./baileys_auth_info'); 
        }
        process.exit(0)    
    } catch(e){
        if (message) return await m.sendReply("_Are you a VPS user? Check out wiki for more._\n"+e.message);
        }
        } 
        if (__dirname.startsWith("/rgnk")) {
            let set_res = await update(key,value)
            if (set_res && message) return await m.sendReply(set_)
            else throw "Error!"
        }   
    }
    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
        }
    Module({
        pattern: 'restart$',
        fromMe: true,
        dontAddCommandList: true,
        use: 'owner'
    }, (async (message, match) => {
        if (!isHeroku) return await message.sendReply("_This is a heroku command, but this bot is not running on heroku!_");
        await fixHerokuAppName(message)
        await message.sendReply(Lang.RESTART_MSG)
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await message.send(error.message)
        });
    }));
    Module({
        pattern: 'platform',
        fromMe: true,
        use: 'settings'
    }, (async (message, match) => {
      return await message.sendReply(`_Bot is running on ${config.PLATFORM}_`)
    }));
    Module({
        pattern: 'language ?(.*)',
        fromMe: true,
        desc: "Change bot's language for some commands",
        use: 'settings'
    }, (async (message, match) => {
      if (!match[1] || !["english","manglish","turkish"].includes(match[1].toLowerCase())) return await message.sendReply("_Invalid language! Available languages are English, Manglish and Turkish_");  
      return await setVar("LANGUAGE",match[1].toLowerCase(),message)
    }));
    Module({
        pattern: 'shutdown$',
        fromMe: true,
        dontAddCommandList: true,
        use: 'owner'
    }, (async (message, match) => {
        if (isVPS){
            return await pm2.stop("Raganork");
        } else if (isHeroku){
            await fixHerokuAppName(message)
            await heroku.get(baseURI + '/formation').then(async (formation) => {
            forID = formation[0].id;
            await message.sendReply(Lang.SHUTDOWN_MSG)
            await heroku.patch(baseURI + '/formation/' + forID, {
                body: {
                    quantity: 0
                }
            });
        }).catch(async (err) => {
            await message.send(error.message)
        });
    } else return await message.sendReply("_This is a heroku command, but this bot is not running on heroku!_");
    }));
    Module({
        pattern: 'dyno$',
        fromMe: true,
        dontAddCommandList: true,
        use: 'owner'
    }, (async (message, match) => {
        if (!isHeroku) return await message.sendReply("_This is a heroku command, but this bot is not running on heroku!_");
        await fixHerokuAppName(message)
        heroku.get('/account').then(async (account) => {
            url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
            headers = {
                "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
                "Authorization": "Bearer " + Config.HEROKU.API_KEY,
                "Accept": "application/vnd.heroku+json; version=3.account-quotas",
            }
            await got(url, {
                headers: headers
            }).then(async (res) => {
                const resp = JSON.parse(res.body);
                total_quota = Math.floor(resp.account_quota);
                quota_used = Math.floor(resp.quota_used);
                percentage = Math.round((quota_used / total_quota) * 100);
                remaining = total_quota - quota_used;
                await message.sendReply(
                    "_Total: *{}*_\n".format(secondsToDhms(total_quota).trim()) +
                    "_Used: *{}*_\n".format(secondsToDhms(quota_used)) +
                    "_Percent: *{}*_\n".format(percentage) +
                    "_Remaining: *{}*_\n".format(secondsToDhms(remaining).trim()))
    
            }).catch(async (err) => {
                await message.send(error.message)
            });
        });
    }));
    Module({
        pattern: 'setvar ?(.*)',
        fromMe: true,
        desc: Lang.SETVAR_DESC,
        use: 'owner'
    }, (async (message, match) => {
        match=match[1]
        var m = message;
        if (!match) return await m.sendReply("_Need params!_\n_Eg: .setvar MODE:public_")
        let [key, ...valueArr] = match.split(':');
        let value = valueArr.join(':');
        config[key] = value
        return await setVar(key,value,message)
        
    }));
    
    Module({
        pattern: 'delvar ?(.*)',
        fromMe: true,
        desc: Lang.DELVAR_DESC,
        use: 'owner'
    }, (async (message, match) => {
        if (!isHeroku) return await message.sendReply("_This is a heroku command, but this bot is not running on heroku!_");
        await fixHerokuAppName(message)
        if (match[1] === '') return await message.sendReply(Lang.NOT_FOUND)
        await heroku.get(baseURI + '/config-vars').then(async (vars) => {
            key = match[1].trim();
            for (vr in vars) {
                if (key == vr) {
                    await heroku.patch(baseURI + '/config-vars', {
                        body: {
                            [key]: null
                        }
                    });
                    return await message.sendReply(Lang.DEL_SUCCESS.format(key))
                }
            }
            await await message.sendReply(Lang.NOT_FOUND)
        }).catch(async (error) => {
            await message.sendReply(error.message)
        });
    
    }));
    Module({
        pattern: 'getvar ?(.*)',
        fromMe: true,
        desc: Lang.GETVAR_DESC,
        use: 'owner'
    }, (async (message, match) => {
        if (match[1] === '') return await message.sendReply(Lang.NOT_FOUND)
        return await message.sendReply(process.env[match[1].trim()]?.toString() || "Not found")
   }));
    Module({
            pattern: "allvar",
            fromMe: true,
            desc: Lang.ALLVAR_DESC,
            use: 'owner'
        },
        async (message, match) => {
            if (isVPS) {
                return await message.sendReply(fs.readFileSync(`./config.env`).toString('utf-8'));
            }
            if (!isHeroku) return await message.sendReply("_This is a heroku command, but this bot is not running on heroku!_");
            await fixHerokuAppName(message)
            let msg = Lang.ALL_VARS + "\n\n\n```"
            await heroku
                .get(baseURI + "/config-vars")
                .then(async (keys) => {
                    for (let key in keys) {
                        msg += `${key} : ${keys[key]}\n\n`
                    }
                    return await await message.sendReply(msg += '```')
                })
                .catch(async (error) => {
                    await message.send(error.message)
                })
        }
    );
    Module({
        pattern: 'chatbot ?(.*)',
        fromMe: true,
        desc: "Activates chatbot",
        use: 'config'
    }, (async (message, match) => {
        if (match[1]?.toLowerCase() === 'on'){
            return await setVar("CHATBOT",'on',message)
        }
        if (match[1]?.toLowerCase() === 'off'){
            return await setVar("CHATBOT",'off',message)
        }
        return await message.sendReply("_AI ChatBot mode_\n\n"+"_Current status: *"+config.CHATBOT+"*\n\n_Use: .chatbot on/off_")    
    }));
    Module({
        pattern: 'settings ?(.*)',
        fromMe: true,
        desc: "Bot settings to enable extra options related to WhatsApp bot functionality.",
        use: 'owner'
    }, (async (message, match) => {
        let configs = settingsMenu
        if (match[1]){
            if (configs.map(e=>e.title).includes(match[1])){
                let buttons = {
                    type: 'quick_reply',
                    head: {
                      title: match[1],
                      subtitle:"",
                      footer: `Select an action, on or off?`
                    },
                    body: [{
                        name: "quick_reply",
                        buttonParamsJson: `{"display_text":"ON","id":"${handler}setvar ${configs.filter(e=>e.title == match[1])[0].env_var}:true"}`
                      }, {
                        name: "quick_reply",
                        buttonParamsJson: `{"display_text":"OFF","id":"${handler}setvar ${configs.filter(e=>e.title == match[1])[0].env_var}:false"}`
                      }]
                  }
                  return await message.sendInteractiveMessage(message.jid, buttons,{quoted: message.data})                  
            }
        }
        let list = {
            type: 'single_select',
            head: {
              title: "*Settings configuration menu*",
              subtitle:"",
              footer: ''
            },
            body : {
            title:"Select an option",
            sections:[
            {
            title:"Select an option",
            highlight_label:"",
            rows:[]
            }
            ]
            }
          }
          configs.map((e)=>{
            list.body.sections[0].rows.push({
                title: e.title,
                description:'',
                id: handler+"settings " + e.title
            })
        })
          return await message.sendInteractiveMessage(message.jid, list,{quoted: message.data})
          }));
    Module({
        pattern: 'mode ?(.*)',
        fromMe: true,
        desc: "Change bot mode to public & private",
        use: 'settings'
    }, (async (message, match) => {
        if (match[1]?.toLowerCase() == "public" || match[1]?.toLowerCase() == "private"){
            return await setVar("MODE",match[1],message)
        } else {
            return await message.sendReply(`_*Mode manager*_\n_Current mode: ${config.MODE}_\n_Use .mode public/private_`)
        }
    }));
    Module({
        pattern: 'setsudo ?(.*)',
        fromMe: true,
        use: 'owner'
    }, (async (message, mm) => {
   var m = message;
        var newSudo = ( m.reply_message ? m.reply_message.jid : '' || m.mention[0] || mm[1]).split("@")[0]
if (!newSudo) return await m.sendReply("*Need reply/mention/number*")
const oldSudo = config.SUDO?.split(",")
    var newSudo = ( m.reply_message ? m.reply_message.jid : '' || m.mention[0] || mm[1]).split("@")[0]
    if (!newSudo) return await m.sendReply("*Need reply/mention/number*")
    newSudo = newSudo.replace(/[^0-9]/g, '');
    if (!oldSudo.includes(newSudo)) {
    oldSudo.push(newSudo)
    var setSudo = oldSudo
    setSudo = setSudo.map(x => {
        if (typeof x === 'number') {
          return x.toString();
        } else {
          return x.replace(/[^0-9]/g, '');
        }
      }).join(',')
    await m.client.sendMessage(m.jid,{text:'_Added @'+newSudo+' as sudo_',mentions:[newSudo+"@s.whatsapp.net"]})
    await setVar("SUDO",setSudo,m)
    } else return await m.sendReply("_User is already a sudo_")
}));
    Module({
        pattern: 'getsudo ?(.*)',
        fromMe: true,
        use: 'owner'
    }, (async (message, match) => {
    return await message.sendReply(config.SUDO);
    }));
    Module({pattern: 'delsudo ?(.*)', fromMe: true, desc: "Deletes sudo"}, (async (m,mm) => { 
    const oldSudo = config.SUDO?.split(",")
    var newSudo = ( m.reply_message ? m.reply_message.jid : '' || m.mention[0] || mm[1]).split("@")[0]
    if (!newSudo) return await m.sendReply("*Need reply/mention/number*")
    if (oldSudo.includes(newSudo)) {
    oldSudo.push(newSudo)
    var setSudo = oldSudo
    setSudo = setSudo.filter(x=>x!==newSudo.replace(/[^0-9]/g, '')).join(',')
    await m.client.sendMessage(m.jid,{text:'_Removed @'+newSudo+' from sudo!_',mentions:[newSudo+"@s.whatsapp.net"]})
    await setVar("SUDO",setSudo,m)
    } else return await m.sendReply("_User is already not a sudo_")
}));
    Module({
        pattern: 'toggle ?(.*)',
        fromMe: true,
        desc: "To toggle commands on/off (enable/disable)",
        usage: '.toggle img',
        use: 'group'
    }, (async (message, match) => {
        var disabled = process.env.DISABLED_COMMANDS?.split(',') || []
        match = match[1]
        const commands = getCommands()
        if (match){
            if (!commands.includes(match.trim())) return await message.sendReply(`_${handler}${match.trim()} is not a valid command!_`)
            if (!disabled.includes(match)){
            disabled.push(match.trim())
            await message.sendReply(`_Successfully turned off \`${handler}${match}\` command_\n_Use ${handler}toggle ${match} to enable this command back_`)
            return await setVar("DISABLED_COMMANDS",disabled.join(','),false)
                } else {
                    await message.sendReply(`_Successfully turned on \`${handler}${match}\` command_`)
                    return await setVar("DISABLED_COMMANDS",disabled.filter(x=>x!=match).join(',')||"null",false)
                    }
        } else return await message.sendReply(`_Example: ${handler}toggle img_\n\n_(This will disable .img command)_`)
    }));
    Module({
        pattern: 'antibot ?(.*)',
        fromMe: false,
        desc: "Detects other bot's messages and kicks.",
        use: 'group'
    }, (async (message, match) => {
        let adminAccesValidated = ADMIN_ACCESS ? await isAdmin(message,message.sender) : false;
        if (message.fromOwner || adminAccesValidated) {
        match[1]=match[1]?match[1].toLowerCase():""
        var db = await antibot.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        if (match[1] === "on"){
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            await antibot.set(message.jid) 
        }
        if (match[1] === "off"){
            await antibot.delete(message.jid)  
        }
        if (match[1]!=="on" && match[1]!=="off"){
        var status = jids.includes(message.jid) ? 'on' : 'off';
        var {subject} = await message.client.groupMetadata(message.jid)
        return await message.sendReply(`_Antibot menu of ${subject}_`+"\n\n_Antibot is currently turned *"+status+"*_\n\n_Use .antibot on/off_")
        }
        await message.sendReply(match[1] === "on" ? "_Antibot activated!_" : "_Antibot turned off!_");
    }}));
    Module({
        pattern: 'antispam ?(.*)',
        fromMe: false,
        desc: "Detects spam messages and kicks user.",
        use: 'group'
    }, (async (message, match) => {
        let adminAccesValidated = ADMIN_ACCESS ? await isAdmin(message,message.sender) : false;
        if (message.fromOwner || adminAccesValidated) {
        match[1]=match[1]?match[1].toLowerCase():""
        var db = await antispam.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        if (match[1] === "on"){
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            await antispam.set(message.jid) 
        }
        if (match[1] === "off"){
            await antispam.delete(message.jid)  
        }
        if (match[1]!=="on" && match[1]!=="off"){
        var status = jids.includes(message.jid) ? 'on' : 'off';
        var {subject} = await message.client.groupMetadata(message.jid)
        return await message.sendReply(`_Anti spam menu of ${subject}_`+"\n\n_Antispam is currently turned *"+status+"*_\n\n_Use .antispam on/off_")
        }
        await message.sendReply(match[1] === "on" ? "_Antispam activated!_" : "_Antispam turned off!_");
    }}));
    Module({
        pattern: 'pdm ?(.*)',
        fromMe: false,
        desc: "Detects promote/demote and sends alert.",
        use: 'group'
    }, (async (message, match) => {
        let adminAccesValidated = ADMIN_ACCESS ? await isAdmin(message,message.sender) : false;
        if (message.fromOwner || adminAccesValidated) {
        match[1]=match[1]?match[1].toLowerCase():""
        var db = await pdm.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        if (match[1] === "on"){
            await pdm.set(message.jid) 
        }
        if (match[1] === "off"){
            await pdm.delete(message.jid)  
        }
        if (match[1]!=="on" && match[1]!=="off"){
        var status = jids.includes(message.jid) ? 'on' : 'off';
        var {subject} = await message.client.groupMetadata(message.jid)
        return await message.sendReply(`_Promote|demote alert message menu of ${subject}_`+"\n\n_PDM alert is currently turned *"+status+"*_\n\n_Use .pdm on/off_")
        }
        await message.sendReply(match[1] === "on" ? "_Pdm activated!_" : "_Pdm turned off!_");
    }}));
    Module({
        pattern: 'antidemote ?(.*)',
        fromMe: true,
        desc: "Detects demote and automatically promotes demoted one and demotes person who demoted.",
        use: 'group'
    }, (async (message, match) => {
        match[1]=match[1]?match[1].toLowerCase():""
        var db = await antidemote.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        if (match[1] === "on"){
            await antidemote.set(message.jid) 
        }
        if (match[1] === "off"){
            await antidemote.delete(message.jid)  
        }
        if (match[1]!=="on" && match[1]!=="off"){
        var status = jids.includes(message.jid) ? 'on' : 'off';
        var {subject} = await message.client.groupMetadata(message.jid)
        return await message.sendReply(`_Anti demote menu of ${subject}_`+"\n\n_This feature is currently turned *"+status+"*_\n\n_Use .antidemote on/off_")
        }
        await message.sendReply(match[1] === "on" ? "_Antidemote activated!_" : "_Antidemote turned off!_");
    }));
    Module({
        pattern: 'antipromote ?(.*)',
        fromMe: true,
        desc: "Detects promote and automatically demotes promoted one and demotes person who promoted.",
        use: 'group'
    }, (async (message, match) => {
        match[1]=match[1]?match[1].toLowerCase():""
        var db = await antipromote.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        if (match[1] === "on"){
            await antipromote.set(message.jid) 
        }
        if (match[1] === "off"){
            await antipromote.delete(message.jid)  
        }
        if (match[1]!=="on" && match[1]!=="off"){
        var status = jids.includes(message.jid) ? 'on' : 'off';
        var {subject} = await message.client.groupMetadata(message.jid)
        return await message.sendReply(`_Anti promote menu of ${subject}_`+"\n\n_This feature is currently turned *"+status+"*_\n\n_Use .antipromote on/off_")
        }
        await message.sendReply(match[1] === "on" ? "_Antipromote activated!_" : "_Antipromote turned off!_");
    }));
    Module({
        pattern: 'antilink ?(.*)',
        fromMe: false,
        desc: "Activates antilink, kicks if user sends link",
        use: 'group'
    }, (async (message, match) => {
        let adminAccesValidated = ADMIN_ACCESS ? await isAdmin(message,message.sender) : false;
        if (message.fromOwner || adminAccesValidated) {
        match[1]=match[1]?match[1].toLowerCase():""
        var db = await antilink.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        var antilinkWarn = process.env.ANTILINK_WARN?.split(',') || []
        if (match[1].includes("warn")){
            if (match[1].endsWith("on")) {
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            if (!antilinkWarn.includes(message.jid)){
                antilinkWarn.push(message.jid)
                await setVar("ANTILINK_WARN",antilinkWarn.join(','),false)
                    }
                    return await message.sendReply(`_Antilink warn has been activated in this group!_`); 
                }
            if (match[1].endsWith("off")) {
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            if (antilinkWarn.includes(message.jid)){
                await message.sendReply(`_Antilink warn deactivated!_`)
                await setVar("ANTILINK_WARN",antilinkWarn.filter(x=>x!=message.jid).join(',')||"null",false)
                }
                    return await message.sendReply(`_Antilink warn de-activated!_`); 
                }
            
            } 
        if (match[1] === "on"){
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            await antilink.set(message.jid) 
        }
        if (match[1] === "off"){
            await antilink.delete(message.jid)  
        }
        if (match[1]!=="on" && match[1]!=="off"){
        var status = jids.includes(message.jid) || antilinkWarn.includes(message.jid) ? 'on' : 'off';
        var {subject} = await message.client.groupMetadata(message.jid)
        return await message.sendReply(`_Antilink menu of ${subject}_`+"\n\n_Antilink is currently turned *"+status+"*_\n\n_Eg: .antilink on/off_\n_.antilink warn on/off_\n\n_Use `setvar ALLOWED_LINKS:fb.com,google.com` to allow specific links_")
        }
        await message.sendReply(match[1] === "on" ? "_Antilink activated!_" : "_Antilink turned off!_");
   }}));
    Module({
        pattern: 'antiword ?(.*)',
        fromMe: false,
        desc: "Activates antiword, kicks if user sends not allowed words",
        use: 'group'
    }, (async (message, match) => {
        let adminAccesValidated = ADMIN_ACCESS ? await isAdmin(message,message.sender) : false;
        if (message.fromOwner || adminAccesValidated) {
        match[1]=match[1]?match[1].toLowerCase():""
        var db = await antiword.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        var antiwordWarn = process.env.ANTIWORD_WARN?.split(',') || []
        if (match[1].includes("warn")){
            if (match[1].endsWith("on")) {
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            if (!antiwordWarn.includes(message.jid)){
                antiwordWarn.push(message.jid)
                await setVar("ANTIWORD_WARN",antiwordWarn.join(','),false)
                    }
                    return await message.sendReply(`_Antiword warn has been activated in this group!_`); 
                }
            if (match[1].endsWith("off")) {
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            if (antiwordWarn.includes(message.jid)){
                await message.sendReply(`_Antiword warn deactivated!_`)
                return await setVar("ANTIWORD_WARN",antiwordWarn.filter(x=>x!=message.jid).join(',')||"null",false)
                }
                }
            
            }
        if (match[1] === "on"){
            if (!(await isAdmin(message))) return await message.sendReply("_I'm not an admin!_")
            await antiword.set(message.jid) 
        }
        if (match[1] === "off"){
            await antiword.delete(message.jid)  
        }
        if (match[1]!=="on" && match[1]!=="off"){
        var status = jids.includes(message.jid) || antiwordWarn.includes(message.jid) ? 'on' : 'off';
        var {subject} = await message.client.groupMetadata(message.jid)
        return await message.sendReply(`_Antiword menu of ${subject}_`+"\n\n_Antiword is currently turned *"+status+"*_\n\n_Eg: .antiword on/off_\n_.antiword warn on/off_\n\n_Use `setvar ANTI_WORDS:fuck,nigga` to block custom words or set `ANTI_WORDS:auto` to auto detect bad words (It's already enabled by default!)_")
        }
        await message.sendReply(match[1] === "on" ? "_Antiword activated!_" : "_Antiword turned off!_");
   }}));
    Module({
        on: 'text',
        fromMe: false
    }, (async (message, match) => {
        if (Config.CHATBOT === 'on') {
            try {
            await chatBot(message, Config.BOT_NAME)
            } catch {
                return await message.sendReply("Ohh :/")
            }
        }
        var db = await antilink.get();
        const jids = []
        db.map(data => {
            jids.push(data.jid)
        });
        var antiworddb = await antiword.get();
        const antiwordjids = []
        antiworddb.map(data => {
            antiwordjids.push(data.jid)
        });
        if (antiwordjids.includes(message.jid)) {
            var antiwordWarn = process.env.ANTIWORD_WARN?.split(',') || []
            if (antiwordWarn.includes(message.jid)) return;
            let disallowedWords = (process.env.ANTI_WORDS || "nigga,fuck").split(",");
            if (process.env.ANTI_WORDS == 'auto') disallowedWords = require('badwords/array');
            let thatWord = containsDisallowedWords(message.message,disallowedWords)
            if (thatWord){
                await message.sendReply(`_The word ${thatWord} is not allowed in this chat!_`);
                await message.client.groupParticipantsUpdate(message.jid, [message.sender], "remove")
                return await message.client.sendMessage(message.jid, { delete: message.data.key })
                                
            }
        }
        if (/\bhttps?:\/\/\S+/gi.test(message.message)){
        if (jids.includes(message.jid)) {
        var antilinkWarn = process.env.ANTILINK_WARN?.split(',') || []
        if (antilinkWarn.includes(message.jid)) return;
        let allowed = (process.env.ALLOWED_LINKS || "gist,instagram,youtu").split(",");
        let linksInMsg = message.message.match(/\bhttps?:\/\/\S+/gi)
        if (checkLinks(linksInMsg,allowed)) {
        if (!(await isAdmin(message,message.sender))) {
        var usr = message.sender.includes(":") ? message.sender.split(":")[0]+"@s.whatsapp.net" : message.sender
        await message.client.sendMessage(message.jid, { delete: message.data.key })
        await message.sendReply("_Link not allowed!_");
        await message.client.groupParticipantsUpdate(message.jid, [usr], "remove")
        }
        }
        }
        }
    
    }));
    
module.exports = {setVar,fixHerokuAppName,containsDisallowedWords}
