let fetch = require('node-fetch')
const axios = require("axios")
let { JSDOM } = require('jsdom')
const { Innertube, UniversalCache, Utils} = require('youtubei.js');
const { readFileSync, existsSync, mkdirSync, createWriteStream } = require('fs');
const {streamToIterable} = Utils;
var path = require('path');
function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
async function getVideo(vid,res_='360p',m=false){
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const time1 = new Date().getTime()
  const stream = await yt.download(vid, {
    type: 'video', 
    quality: res_,
    format: 'mp4',
    client: 'ANDROID'
  });
  let downloadedBytes = 0;
  const totalBytes = (await yt.getInfo(vid)).streaming_data.adaptive_formats.filter(e=>e.has_video && e.mime_type.includes('mp4') && e.quality_label == res_)[0].content_length;
  const file = createWriteStream(`./temp/ytv.mp4`);
  const progressInterval = setInterval(async () => {
    const progress = (downloadedBytes / totalBytes) * 100;
    console.log(`Download progress: ${progress.toFixed(2)}%`);
    if (m) {
      await m.edit(`_Downloading ${res_}: ${progress.toFixed(2)}%_`,m.jid,m.progressKey)
    }
  }, 200);
  for await (const chunk of streamToIterable(stream)) {
    downloadedBytes += chunk.length;
    file.write(chunk); // Write chunk to file
  }
  clearInterval(progressInterval)
  if (m) await m.edit(`_Downloading ${res_}: 100%_`,m.jid,m.progressKey);
  return `./temp/ytv.mp4`
};
async function ytv(vid,res_='360p',m){
  const video = await getVideo(vid,res_,m);
  if (m) await m.edit(`_Downloading audio.._`,m.jid,m.progressKey)
  const audio = await dlSong(vid)
  if (m) await m.edit(`_Mixing audio & video.._`,m.jid,m.progressKey)
  return await require('./misc').avMix(video,audio)
}
async function getResolutions(vid){
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const result_ =  (await yt.getInfo(vid)).streaming_data.adaptive_formats.filter(e=>e.has_video && e.mime_type.includes('mp4'))
  const result = []
  for (x of result_){
      result.push({size:bytesToSize(x.content_length),quality:x.quality_label.split('p')[0]+'p',fps60:x.quality_label.endsWith('p60')})
  }
  return result;
}
async function dlSong(vid){
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const stream = await yt.download(vid, {
    type: 'audio', 
    quality: 'best',
    format: 'mp4',
    client: 'ANDROID'
  });
  const file = createWriteStream(`./temp/song.m4a`);
  for await (const chunk of streamToIterable(stream)) {
    file.write(chunk);
  }
  return `./temp/song.m4a`;
}
async function ytTitle(vid){
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const video = await yt.getBasicInfo(vid,"TV_EMBEDDED");
  return video.basic_info.title
}
async function getSearchImage(vid){
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const video = await yt.getBasicInfo(vid);
  return video.basic_info.thumbnail?.[1]?.url || video.basic_info.thumbnail?.[0]?.url;
}
async function searchYT(q){
  const yt = await Innertube.create({ cache: new UniversalCache() });
  const search = await yt.search(q)
  return search;
};
module.exports = {
  dlSong,
  ytTitle, searchYT,
  getSearchImage,
  ytv, getResolutions,
  servers: ['en154','en136', 'id4', 'en60', 'en61', 'en68']
};
