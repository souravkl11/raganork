const {LANGUAGE,VERSION} = require('../../config');
const {existsSync,readFileSync} = require('fs');
var json = existsSync(__dirname+'/lang/' + LANGUAGE + '.json') ? JSON.parse(readFileSync(__dirname+'/lang/' + LANGUAGE + '.json')) : JSON.parse(readFileSync(__dirname+'/lang/english.json'));
let session = (process.env.SESSION || process.env.SESSION_ID);
if (!(session && session.startsWith('Raganork'))){
    console.error("No session found, add env var 'SESSION' before starting bot")
    process.exit(0)
}
console.log("raganork-md "+VERSION)
function getString(file) { return json['STRINGS'][file]; }
module.exports = {language: json, getString: getString }
