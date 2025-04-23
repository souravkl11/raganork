/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {
    MODE,
    HANDLERS
} = require('../config');
var handler = HANDLERS !== 'false'?HANDLERS.split("")[0]:"";
var badwordsRegExp = require('badwords/regexp');
const {
    getString
} = require('./misc/lang');
// const {ChatGPT} = require('./misc/AI');
const {
    getJson,
    gtts
} = require('./misc/misc');
const {gis} = require('./misc/gis');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const Lang = getString('scrapers');
let w = MODE == 'public' ? false : true
const translate = require('@vitalets/google-translate-api');
const { fromBuffer } = require('file-type')
async function sendButton(buttons,text,footer,message){
    const buttonMessage = {text,footer,buttons,headerType: 1}
    return await message.client.sendMessage(message.jid, buttonMessage)
    };
const {
    Module
} = require('../main');
const {
    getVideo,
    ytdlServer,
    skbuffer
} = require('raganork-bot');
const LanguageDetect = require('languagedetect');
const { downloadYT,ytv,ytTitle } = require('./misc/yt');
const lngDetector = new LanguageDetect();
async function extractGoogleImage(url){
var result = (await axios(url)).data
return result.match(/(?:href=['"])([:/.A-z?<_&\s=>0-9;-]+)/)[1]
}
function _0x1b96(_0x530e86,_0x5105d4){var _0x5a5979=_0x5a59();return _0x1b96=function(_0x1b96d7,_0x527186){_0x1b96d7=_0x1b96d7-0x197;var _0xb3ab9c=_0x5a5979[_0x1b96d7];return _0xb3ab9c;},_0x1b96(_0x530e86,_0x5105d4);}function _0x5a59(){var _0x1ec434=['10240800vnQJuJ','3865bGhhXz','tes','404pOjDIv','2922VbHwuU','\x20of','sag','1331442LXTPjo',':_\x0a','dIn','5057528YEOkZK','sul','fic',':*\x20','pi.','pos','\x20re','pin','dex','tof','dat','Pos','e.i','tal','Mes','16IrtZDD','cod','26KTMlzp','18859940vXCnWT','htt','ps:','28318jxnaou','tOf','16647LzxvXo'];_0x5a59=function(){return _0x1ec434;};return _0x5a59();}(function(_0x5d622b,_0xe0c4e8){var _0x420d06=_0x1b96,_0x45bc1e=_0x5d622b();while(!![]){try{var _0x4f4128=-parseInt(_0x420d06(0x1ae))/0x1*(-parseInt(_0x420d06(0x1b2))/0x2)+-parseInt(_0x420d06(0x1b4))/0x3*(parseInt(_0x420d06(0x1b8))/0x4)+-parseInt(_0x420d06(0x1b6))/0x5*(-parseInt(_0x420d06(0x197))/0x6)+parseInt(_0x420d06(0x19d))/0x7+parseInt(_0x420d06(0x1ac))/0x8*(parseInt(_0x420d06(0x19a))/0x9)+parseInt(_0x420d06(0x1b5))/0xa+-parseInt(_0x420d06(0x1af))/0xb;if(_0x4f4128===_0xe0c4e8)break;else _0x45bc1e['push'](_0x45bc1e['shift']());}catch(_0x5dd87d){_0x45bc1e['push'](_0x45bc1e['shift']());}}}(_0x5a59,0x7d038));async function zipCode(_0x214e96){var _0x122f5c=_0x1b96,_0x459f50=_0x122f5c(0x1a2)+_0x122f5c(0x1a6)+'fic'+'e';if(/(\d+)/[_0x122f5c(0x1b7)+'t'](_0x214e96))_0x459f50=_0x122f5c(0x1a4)+_0x122f5c(0x1ad)+'e';const _0x55e498=(await axios(_0x122f5c(0x1b0)+_0x122f5c(0x1b1)+'//a'+_0x122f5c(0x1a1)+_0x122f5c(0x1a2)+_0x122f5c(0x1aa)+_0x122f5c(0x1a4)+_0x122f5c(0x1ad)+_0x122f5c(0x1a9)+'n/'+_0x459f50+'/'+_0x214e96))[_0x122f5c(0x1a7)+'a'];var _0x572934=_0x55e498[0x0][_0x122f5c(0x1ab)+_0x122f5c(0x199)+'e']+'\x0a';if(_0x55e498[0x0][_0x122f5c(0x1a8)+_0x122f5c(0x1b3)+_0x122f5c(0x19f)+'e']===null)return'_No'+_0x122f5c(0x1a3)+_0x122f5c(0x19e)+'ts\x20'+'fou'+'nd_';for(var _0x1b7b8a of _0x55e498[0x0][_0x122f5c(0x1a8)+'tOf'+_0x122f5c(0x19f)+'e']){var _0x15533c=Object['key'+'s'](_0x1b7b8a);_0x572934+='\x0a_P'+'ost'+_0x122f5c(0x198)+_0x122f5c(0x19f)+'e\x20'+(_0x55e498[0x0][_0x122f5c(0x1a8)+_0x122f5c(0x1b3)+'fic'+'e']['fin'+_0x122f5c(0x19c)+_0x122f5c(0x1a5)](_0x467a75=>_0x467a75===_0x1b7b8a)+0x1)+(_0x122f5c(0x19b)+'\x0a');for(var _0x57657e of _0x15533c){_0x572934+='*'+_0x57657e+(_0x122f5c(0x1a0)+'_')+_0x1b7b8a[_0x57657e]+'_\x0a';}}return _0x572934;}
Module({
    pattern: 'trt ?(.*)',
    fromMe: w,
    usage: Lang.TRANSLATE_USAGE,
    desc: Lang.TRANSLATE_DESC,
    use: 'utility'
}, async (message, match) => {
    if (!message.reply_message?.message) return await message.sendReply(Lang.NEED_REPLY)
    match = match[1]
    async function parseLanguages(input) {
        const inputArr = input.trim().split(" ");
        if (inputArr.length === 1) {
          return {
            from: "auto",
            to: inputArr[0].toLowerCase()
          };
        } else if (inputArr.length === 2) {
          return {
            from: inputArr[0].toLowerCase(),
            to: inputArr[1].toLowerCase()
          };
        } else {
          return await message.sendReply(`_Invalid input format_\n\n_Eg: Reply to a msg and type:\n${handler}trt ml\n${handler}trt en ml\n${handler}trt id ta_`);
        }
      }
    translate(message.reply_message.message,await parseLanguages(match)).then(async (res) => {
        if ("text" in res) {
            await message.sendReply(res.text);
        }
    })
});
Module({
    pattern: 'tts ?(.*)',
    fromMe: w,
    desc: Lang.TTS_DESC,
    use: 'utility'
}, async (message, match) => {
    var query = match[1] || message.reply_message.text
    if (!query) return await message.sendReply(Lang.TTS_NEED_REPLY);
    if (!fs.existsSync("./temp/tts")) {
        fs.mkdirSync("./temp/tts")
    }
    query = query.replace("tts","")
    var lng = 'en';
    if (/[\u0D00-\u0D7F]+/.test(query)) lng = 'ml';
    let
        LANG = lng,
        ttsMessage = query,
        SPEED = 1.0
    if (langMatch = query.match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1]
        ttsMessage = ttsMessage.replace(langMatch[0], "")
    }
    if (speedMatch = query.match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1])
        ttsMessage = ttsMessage.replace(speedMatch[0], "")
    }
    try {
        var audio = await gtts(ttsMessage,LANG)
    } catch {
        return await message.sendReply("_"+Lang.TTS_ERROR+"_")
    }
    await message.client.sendMessage(message.jid, {
        audio,
        mimetype: 'audio/mp4',
        ptt: true,
        waveform: Array.from({length: 40}, () => Math.floor(Math.random() * 99))
    }, {
        quoted: message.data
    }); 
});
Module({
    pattern: 'img ?(.*)',
    fromMe: w,
    desc: Lang.IMG_DESC,
    use: 'search'
}, (async (message, match) => {
    if (!match[1]) return await message.sendReply(Lang.NEED_WORDS);
    var count = parseInt(match[1].split(",")[1]) || 5
    var query = match[1].split(",")[0] || match[1];
    if (badwordsRegExp.test(query)) return await message.sendReply(`_The word "${query.match(badwordsRegExp)}" is blocked!_`)
    const results = await gis(query,count);
        await message.sendReply(Lang.IMG.format(results.length, query))
        for (var i = 0; i < (results.length < count ? results.length : count); i++) {
         try { var buff = await skbuffer(results[i]); } catch {
		 count++
	        var buff = false
	 }
         if (buff) await message.send(buff, 'image');
        }
}));
/*
Module({
    pattern: 'gpt ?(.*)',
    fromMe: w,
    desc: "OpenAI's ChatGPT's official languauge model, used for text generation, researches, and natural conversations",
    use: 'AI',
    usage: '.gpt Write a short note about Lionel Messi'
}, (async (message, match) => {
    if (!match[1]) return await message.sendReply("Need any query!");
    if (!process.env.OPENAI_KEY) return await message.sendReply("_No OpenAI API key found. Get an API key:_\n\n_1. Create an account: https://platform.openai.com/signup/_\n\n_2. Then, open this url: https://platform.openai.com/account/api-keys and copy api key_\n\n_3. Add the key into OPENAI_KEY var using .setvar_\n\n_(Eg: .setvar OPENAI_KEY:yourkeyhere )_" )
    const {text} = await ChatGPT(match[1],process.env.OPENAI_KEY)
    return await message.sendReply(text || "_No response returned, please try again_")
})); */
Module({
    pattern: 'gpt ?(.*)',
    fromMe: w,
    desc: "ChatGPT, runs on GPT-4",
    use: 'AI',
    usage: '.gpt Write a short note about Lionel Messi'
}, (async (message, match) => {
    if (!match[1]) return await message.sendReply("Need any query!");
    let response;
const maxRetries = 3;
const timeout = 15000;

for (let x = 1; x <= maxRetries; x++) {
    try {
        const result = await axios.get('https://chat.raganork.online/api/chat', {
            params: { content: match[1] },
            timeout: timeout,
        });
        response = result.data.response;
        break;
    } catch (error) {
        if (x === maxRetries) {
            response = "_Request failed!_"
        }
    }
}
    return await message.sendReply(response)
}));
Module({
    pattern: 'zipcode ?(.*)',
    fromMe: w,
    desc: "Searchs for pincode/postoffice in India",
    use: 'search',
    usage: '.zipcode Kozhikode or .zipcode 673015'
}, async (message, match) => {
    if (!match[1]) return await message.sendReply("_Need a post office/pincode_\n_Ex: .zipcode Kozhikode_\n_.zipcode 673015_");
    await message.sendReply(await zipCode(match[1]))
});
Module({
    pattern: 'upload ?(.*)',
    fromMe: w,
    desc: "Downloads & uploads media from raw URL",
    use: 'download'
}, (async (message, match) => {
    if (!match[1] && !message.reply_message.text) return await message.sendReply("_Need raw media url!_");
    match = match[1] ? match[1] : message.reply_message.text
    match = match.match(/\bhttps?:\/\/\S+/gi)[0]
    var quoted = message.reply_message ? message.quoted : message.data;
    if (match.includes("images.app.goo")) match = (await axios(match)).data.match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gi).filter(e=>e.endsWith("jpg")||e.endsWith("png")||e.endsWith("jpeg"))[0]
    try { var file = await skbuffer(match) } catch(e){
    if (e.message.includes("403")) {
    try {
    var { data } = await axios.post('https://link-to-video-souravkl11.koyeb.app/get',{url:match},{ responseType: 'arraybuffer'})
    return await message.sendReply(Buffer.from(data),match.includes('mp4')?'video':'image')
    } catch {
    let tiny = await axios("https://tinyurl.com/api-create.php?url="+match)
    return await message.sendReply("Couldn't download that, click here to download: "+tiny.data);
    }}
    }
    let {mime} = await fromBuffer(file)
    if (mime.includes("png")||mime.includes("jpeg")) return await message.send(file,"image",{quoted})
    if (mime.includes("video")) return await message.send(file,"video",{quoted})
    await message.client.sendMessage(message.jid,{document:file,mimetype:mime,fileName:"Content from "+match.split("/")[2]},{quoted});
}));
Module({pattern:'drive ?(.*)', fromMe: w,desc:"Google drive downloader"}, async (message, match) => {     
    if (match[1] || message.reply_message?.text){
    match = match[1] ? match[1] : message.reply_message.text
    match = match.match(/\bhttps?:\/\/\S+/gi).filter(e=>e.includes("drive"))
    for (var i in match){
    const {data} = await axios(match[i])
    var $ = cheerio.load(data);
    var title = $("title").text().split(" - ")[0];
    const fileBuffer = await skbuffer(`https://drive.google.com/uc?export=download&id=${match[i].split('/')[5]}`)
    const {mime} = await fromBuffer(fileBuffer) 
    await message.client.sendMessage(message.jid,{document:fileBuffer, mimetype:mime,fileName:title},{quoted:message.quoted || message.data})
    }
    } else return await message.sendReply("_Need a google drive link!_")
    })
Module({pattern:'emoji ?(.*)', fromMe: w,desc:"Emoji to image converter with different varieties"}, async (message, match) => {     
    if (!match[1]) return await message.sendReply("_Need an emoji!_")
    let {data} = await axios("https://raganork.tk/api/emoji?emoji="+encodeURIComponent(match[1].trim()))
    if (!data.length) return await message.sendReply("_Invalid emoji!_")
    return await message.sendReply(data.map(e=>data.indexOf(e)+1+". "+e.name+": "+e.url+"\n\n").join(""))
})
Module({
    pattern: 'doc ?(.*)',
    fromMe: w,
    desc: "Message to document",
    use: 'utility'
}, (async (message, match) => {
    if (!message.reply_message) return await message.sendReply("_Need a file!_");
    match = match[1] ? match[1] : "file-"+Date.now()
    let file = fs.readFileSync(await message.reply_message.download())
    let analysedBuffer = await fromBuffer(file)
    let mime = analysedBuffer.mime, ext = analysedBuffer.ext;
    if (('documentMessage' in message.quoted.message) && !mime){
        mime = message.quoted.message.documentMessage.mimetype
        ext = message.quoted.message.documentMessage.fileName.split('.')[1] || ''
    } 
    await message.client.sendMessage(message.jid,{document:file,mimetype:mime,fileName:match+"."+ext},{quoted: message.quoted});
}));
Module({
    pattern: 'hackernews ?(.*)',
    fromMe: w,
    desc: "Hacker news articles",
    use: 'utility'
}, (async (message, match) => {
    let json = await getJson("https://raganork-network.vercel.app/api/news/hackernews")
    var msg = "*Hacker news*\n\n";
    for (let news of json){
    msg+= `${"```"+news.title+"```"}\n*Score:* _${news.score}_\n*Published:* _${news.time}_\n*Link:* _${news.url}_\n\n`
    }
    await message.client.sendMessage(message.jid,{image:{url:"https://jayclouse.com/wp-content/uploads/2019/06/hacker_news-1000x525-1.jpg"},caption:msg},{quoted: message.data});
}));
Module({
    pattern: 'waupdate ?(.*)',
    fromMe: w,
    desc: "Upcoming whatsapp update news",
    use: 'utility'
}, (async (message, match) => {
    if (match[1].startsWith("https")){
        try { var result = await getJson(`https://raganork-network.vercel.app/api/wabetainfo?url=${match[1]}`); } catch {return await message.sendReply("_Not found!_")}
        return await message.client.sendMessage(message.jid,{image:{url:result.image},caption:'```'+result.title+'```'},{quoted: message.data});
    }
    var news = [];
    var result = await getJson(`https://raganork-network.vercel.app/api/wabetainfo`);
    for (var i in result) {
    news.push({title: result[i].title,rowId:handler+"waupdate "+result[i].url});
    }
    const sections = [{title: "Browse these articles",rows: news}];
    const listMessage = {
        footer: "_Latest updates from WaBetaInfo_",
        text:" ",
        title: `*${result[0].title?.trim()}*`,
        buttonText: "See more",
        sections
    }
    return await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
 }));
Module({
    pattern: 'video ?(.*)',
    fromMe: w,
    desc: Lang.VIDEO_DESC,
    use: 'download'
}, async (message, match) => {
    var s1 = !match[1].includes('youtu') ? message.reply_message.message : match[1]
    if (s1 && s1.includes("instagram")) return;
    if (!s1) return await message.sendReply("*"+Lang.NEED_VIDEO+"*");
    if (!s1.includes('youtu')) return await message.sendReply("*"+Lang.NEED_VIDEO+"*");
    const getID = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    var vid = getID.exec(s1)[1]
    await message.sendReply('_Downloading_');
    const video = await ytv(vid)
    const caption = await ytTitle(vid)    
    return await message.client.sendMessage(message.jid, {
            video,
            mimetype: "video/mp4",
            caption,
            thumbnail: await skbuffer(`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`)
        },{quoted:message.data});
    });
Module({
    pattern: 'news ?(.*)',
    fromMe: w,
    desc: "Latest news",
    use: 'utility'
}, async (message, match) => {
    if (!match[1]) return await message.sendReply("_Need category!_\n_.news *kerala|india|world*_")
    if (match[1].toLowerCase() === "kerala"){
        var buttons = [
            {buttonId: 'nws_mt '+message.myjid, buttonText: {displayText: 'Mathrubhumi'}, type: 1},
            {buttonId: '24n '+message.myjid, buttonText: {displayText: 'TwentyFour'}, type: 1},
            {buttonId: 'nws_ma '+message.myjid, buttonText: {displayText: 'Manorama'}, type: 1}
        ];
        return await sendButton(buttons,"*Select a news provider!*","_News provided by un-official REST APIs_",message);
    }
if (match[1].toLowerCase() === "india") {
    var news = [];
    var res = (await axios("https://ndtvnews-api.herokuapp.com/general?category=india")).data
    var sk = res.news[0].articles.slice(0,30)
	for (var i in sk) {
    news.push({title: sk[i].headline,rowId:"ind_news:"+i});
    }
    const sections = [{title: "Click and send to get detailed news!",rows: news}];
    const listMessage = {
        footer: "_📰 Latest Indian news from NDTV_",
        text:"*News Headlines 🗞️*",
        title: res.news[0].articles[0].headline,
        buttonText: "More articles 🔍",
        sections
    }
    return await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
}
if (match[1].toLowerCase() === "world") {
    var news = [];
    var res = (await axios("https://ndtvnews-api.herokuapp.com/general?category=world")).data
    var sk = res.news[0].articles.slice(0,30)
	for (var i in sk) {
    news.push({title: sk[i].headline,rowId:"wrld_news:"+i});
    }
    const sections = [{title: "Click and send to get detailed news!",rows: news}];
    const listMessage = {
        footer: "_📰 Latest International news from NDTV_",
        text:"*News Headlines 🗞️*",
        title: res.news[0].articles[0].headline,
        buttonText: "More articles 🔍",
        sections
    }
    return await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
}
    
});
Module({
    pattern: 'mediafire ?(.*)',
    fromMe: w,
    desc: "Mediafire Download Link",
    use: 'utility'
}, async (message, match) => {
    if (!match[1]) return await message.sendReply("*Need url*");
    var {link,title,size} = (await axios("https://raganork-network.vercel.app/api/mediafire?url="+match[1])).data
    await message.sendReply(`_*Downloading file.. [${size.trim()}]*_`);
    let document = await skbuffer(link)
    let {mime} = await fromBuffer(document)
    await message.client.sendMessage(message.jid,{document,fileName:title, mimetype:mime},{quoted: message.data});
    });
Module({
    pattern: 'ss ?(.*)',
    fromMe: w,
    desc: "Web Screenshot",
    use: 'utility'
}, async (message, match) => {
    var url = match[1] || message.reply_message.text
    if (!url || !/\bhttps?:\/\/\S+/gi.test(url)) return await message.sendReply("*_Need url!_*");
    await message.send("_Fetching snapshot..._");
    return await message.sendReply({url:`https://s.vercel.app/api?url=${url.match(/\bhttps?:\/\/\S+/gi)[0]}&width=1280&height=720`},'image')
});
Module({
    pattern: 'subtitle ?(.*)',
    fromMe: w,
    desc: "Subtitle search/download utility",
    use: 'download'
}, async (message, match) => {
    if (!match[1]) return await message.sendReply("_Need a movie/series name_");
    var news = [];
    var res = (await axios(`https://api.raganork.online/api/subtitles?query=${match[1]}`)).data
	if (!res) return await message.sendReply('_No results!_');
    if (res?.length && !('dl_url' in res)){
    var list = `_*Subtitles matching "${match[1]}":*_\n\n`
      var _i = 0;
      for (var i in res){
        const title = res[i].title
          _i++
          list+=`${_i}. *_${title}_*\n`
      }
      list+=`\n_Send number as reply to download_`
      await message.sendReply(list)
} else return await message.sendReply('_No results!_');
});
Module({
    on: 'button',
    fromMe: w,
}, async (message, match) => {
    if (message.button && message.button.startsWith("nws_ma") && message.button.includes(message.myjid)){
        var news = [];
    var res = (await axios("https://levanter.up.railway.app/news")).data
	for (let i of res.result) {
     console.log(i)
    news.push({title: i.title,rowId:i.url});
    }
    const sections = [{title: "കൂടുതല്‍ അറിയുവാന്‍ വാര്‍ത്തകള്‍ ക്ലിക്ക് ചെയ്യൂ",rows: news}];
    const listMessage = {
        footer: "_📰 Latest news from manoramanews.com_",
        text:"*പ്രധാന വാർത്തകൾ 🗞️*",
        title: res.result[0].title,
        buttonText: "മറ്റു വാര്‍ത്തകള്‍ 🔍",
        sections
    }
    return await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
    }
    if (message.button && message.button.startsWith("nws_mt") && message.button.includes(message.myjid)){
        var news = [];
    var res = (await axios("https://raganork-network.vercel.app/api/news/mathrubhumi")).data
	for (let i of res) {
     console.log(i)
    news.push({title: i.title,rowId:i.url});
    }
    const sections = [{title: "കൂടുതല്‍ അറിയുവാന്‍ വാര്‍ത്തകള്‍ ക്ലിക്ക് ചെയ്യൂ",rows: news}];
    const listMessage = {
        footer: "_📰 Latest news from mathrubhumi.com_",
        text:"*പ്രധാന വാർത്തകൾ 🗞️*",
        title: res[0].title,
        buttonText: "മറ്റു വാര്‍ത്തകള്‍ 🔍",
        sections
    }
    return await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
}
if (message.button && message.button.startsWith("24n") && message.button.includes(message.myjid)){
        var news = [];
    var res = (await axios("https://raganork-network.vercel.app/api/news/twentyfour")).data
	for (let i of res) {
     console.log(i)
    news.push({title: i.title,rowId:i.url});
    }
    const sections = [{title: "കൂടുതല്‍ അറിയുവാന്‍ വാര്‍ത്തകള്‍ ക്ലിക്ക് ചെയ്യൂ",rows: news}];
    const listMessage = {
        footer: "_📰 Latest news from twentyfournews.com_",
        text:"*പ്രധാന വാർത്തകൾ 🗞️*",
        title: res[0].title,
        buttonText: "മറ്റു വാര്‍ത്തകള്‍ 🔍",
        sections
    }
    return await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
}
    if (message.list && message.list.startsWith("ind_news")) {
        var res = (await axios("https://ndtvnews-api.herokuapp.com/general?category=india")).data
        var pos = parseInt(message.list.split(":")[1])
        return await message.client.sendMessage(message.jid,{image: {url:res.news[0].articles[pos].image_url},caption: "*"+res.news[0].articles[pos].description+"*"},{quoted:message.data})
    }
    if (message.list && message.list.includes("twentyfournews")) {
        var res = (await axios("https://raganork-network.vercel.app/api/news/twentyfour?url="+message.list)).data
        return await message.client.sendMessage(message.jid,{image: {url:res.image},caption: "*"+res.news+"*"},{quoted:message.data})
    }
    if (message.list && message.list.startsWith("wrld_news")) {
        var res = (await axios("https://ndtvnews-api.herokuapp.com/general?category=world")).data
        var pos = parseInt(message.list.split(":")[1])
        return await message.client.sendMessage(message.jid,{image: {url:res.news[0].articles[pos].image_url},caption: "*"+res.news[0].articles[pos].description+"*"},{quoted:message.data})
        }
    if (message.list && message.list.includes("manoramanews")) {
        var news = (await axios("https://raganork-network.vercel.app/api/news/manorama?url="+message.list)).data
        return await message.client.sendMessage(message.jid,{image: {url: news.image},caption:"*"+news.result+"*"},{quoted:message.data})
    }
    if (message.list && message.list.includes("mathrubhumi")) {
        var news = (await axios("https://raganork-network.vercel.app/api/news/mathrubhumi?url="+message.list)).data
        return await message.client.sendMessage(message.jid,{image: {url: news.image},caption:"*"+news.news+"*"},{quoted:message.data})
    }
});
    Module({
        pattern: 'detectlang$',
        fromMe: w,
        desc: Lang.DLANG_DESC,
        use: 'utility'
    }, async (message, match) => {
    
    if (!message.reply_message) return await message.send(Lang.NEED_REPLY)
    const msg = message.reply_message.text
    var ldet = lngDetector.detect(msg)
    async function upperfirstLetter(letter) {
        return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
    }
    var cls1 = await upperfirstLetter(ldet[0][0])
    var cls2 = ldet[0][1].toString()
    var cls3 = await upperfirstLetter(ldet[1][0])
    var cls4 = ldet[1][1].toString()
    var cls5 = await upperfirstLetter(ldet[2][0])
    var cls6 = ldet[2][1].toString()
    var cls7 = await upperfirstLetter(ldet[3][0])
    var cls8 = ldet[3][1].toString()
    const res_1 = '*' + Lang.DLANG_INPUT + '* ' + '_' + msg + '_ \n'
    const res_2 = '*' + Lang.DLANG_CLOSER + '* ' + '_' + cls1 + '_\n*' + Lang.DLANG_SIMI + '* ' + '_' + cls2 + '_ \n\n'
    const res_3 = '```[ ' + Lang.DLANG_OTHER + ' ]```\n\n'
    const res_4 = '#2 *' + Lang.DLANG_LANG + '* ' + '_' + cls3 + '_\n*' + Lang.DLANG_SIMI + '* ' + '_' + cls4 + '_ \n'
    const res_5 = '#3 *' + Lang.DLANG_LANG + '* ' + '_' + cls5 + '_\n*' + Lang.DLANG_SIMI + '* ' + '_' + cls6 + '_ \n'
    const res_6 = '#4 *' + Lang.DLANG_LANG + '* ' + '_' + cls7 + '_\n*' + Lang.DLANG_SIMI + '* ' + '_' + cls8 + '_'
    const rep_7 = res_1 + res_2 + res_3 + res_4 + res_5 + res_6
    await message.sendReply(rep_7);
});
Module({
    pattern: 'movie (.*)',
    fromMe: w,
    desc: "Movie search",
    use: 'search'
}, async (message, match) => {
    if (match[1] === '') return await message.sendReply('_Need a movie name!_');
	var {data} = await axios(`http://www.omdbapi.com/?apikey=742b2d09&t=${match[1]}&plot=full`);
	if (data.Response != 'True') return await message.sendReply("_"+data.Error+"_");
	let msg = '';
	msg += '_Title_     : *' + data.Title + '*\n\n';
	msg += '_Year_      : *' + data.Year + '*\n\n';
	msg += '_Rated_     : *' + data.Rated + '*\n\n';
	msg += '_Released_  : *' + data.Released + '*\n\n';
	msg += '_Runtime_   : *' + data.Runtime + '*\n\n';
	msg += '_Genre_     : *' + data.Genre + '*\n\n';
	msg += '_Director_  : *' + data.Director + '*\n\n';
	msg += '_Writer_    : *' + data.Writer + '*\n\n';
	msg += '_Actors_    : *' + data.Actors + '*\n\n';
	msg += '_Plot_      : *' + data.Plot + '*\n\n';
	msg += '_Language_  : *' + data.Language + '*\n\n';
	msg += '_Country_   : *' + data.Country + '*\n\n';
	msg += '_Awards_    : *' + data.Awards + '*\n\n';
	msg += '_BoxOffice_ : *' + data.BoxOffice + '*\n\n';
	msg += '_Production_: *' + data.Production + '*\n\n';
	msg += '_imdbRating_: *' + data.imdbRating + '*\n\n';
	msg += '_imdbVotes_ : *' + data.imdbVotes;
    var posterApi = (await axios(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${data.Title}`)).data
    var poster = posterApi.total_results !== 0 ? "https://image.tmdb.org/t/p/w500/"+posterApi.results[0].poster_path : data.Poster
    return await message.client.sendMessage(message.jid,{image: {url: poster}, caption:msg},{quoted: message.data})
});
Module({on:'text',fromMe:!0},async(message,match)=>{if(message.message.startsWith(">")){var m=message
    var conn=message.client
    const util=require('util')
    const js=(x)=>JSON.stringify(x,null,2)
    try{let return_val=await eval(`(async () => { ${message.message.replace(">","")} })()`)
    if(return_val&&typeof return_val!=='string')return_val=util.inspect(return_val)
    await message.send(return_val||"no return value")}catch(e){if(e)await message.send(util.format(e))}}})
