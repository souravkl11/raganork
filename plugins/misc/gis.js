const REGEX = /\["(\bhttps?:\/\/[^"]+)",(\d+),(\d+)\],null/g;

/**
 * 
 * Async version of g-i-s module, source: npm
 * @async
 * @param {String} searchTerm Search term to search
 * @param {Object} options Options for search
 * @param {Object} options.query You can use a custom query
 * @param {String} options.userAgent User agent for request
 * @returns {Promise<[{url: string, height: number, width: number }]>} Array of results
 */
async function gis(searchTerm,limit, options = {}) {
    if (!searchTerm || typeof searchTerm !== "string") return [];
    if (typeof options !== "object") return [];
  
    const {
      query = {},
      userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    } = options,
      body = await fetch(`http://www.google.com/search?${new URLSearchParams({ ...query, udm: "2", tbm: "isch", q: searchTerm })}`, { headers: { "User-Agent": userAgent } }).then(res => res.text()),
      content = body.slice(body.lastIndexOf("ds:1"), body.lastIndexOf("sideChannel"));  
    let result;
    let urls = [];
    let i = 0
    while (result = REGEX.exec(content)){
      if (i == limit) break;
      urls.push(result[1]);
      i++
    }
    return urls;
  };
  async function pinSearch(searchTerm,limit, options = {}) {
    searchTerm = "pinterest " + searchTerm 
      if (!searchTerm || typeof searchTerm !== "string") return [];
      if (typeof options !== "object") return [];
    
      const {
        query = {},
        userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
      } = options,
        body = await fetch(`http://www.google.com/search?${new URLSearchParams({ ...query, udm: "2", tbm: "isch", q: searchTerm })}`, { headers: { "User-Agent": userAgent } }).then(res => res.text()),
        content = body.slice(body.lastIndexOf("ds:1"), body.lastIndexOf("sideChannel"));

      let result;
      let urls = [];
      let i = 0
      while (result = REGEX.exec(content)){
        if (result[1].includes('pinimg.com')){
        if (i == limit) break;
        urls.push(result[1]);
        i++
        }
      }
      return urls;
    };
module.exports = {gis,pinSearch}
