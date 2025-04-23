/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {
    Module
} = require('../main');
const Config = require('../config');
const axios = require('axios');
const fs = require('fs');
const Db = require('./sql/plugin');
let {
    getString
} = require('./misc/lang');
let Lang = getString('external_plugin');
var handler = Config.HANDLERS !== 'false'?Config.HANDLERS.split("")[0]:""

Module({
    pattern: 'install ?(.*)',
    fromMe: true,
    use: 'owner',
    desc: Lang.INSTALL_DESC
}, (async (message, match) => {
    match = match[1]!==""?match[1]:message.reply_message.text
    if (!match || !/\bhttps?:\/\/\S+/gi.test(match)) return await message.send(Lang.NEED_URL)
    let links = match.match(/\bhttps?:\/\/\S+/gi);
    for (let link of links){
    try {
        var url = new URL(link);
    } catch {
        return await message.send(Lang.INVALID_URL);
    }
    if (url.host === 'gist.github.com' || url.host === 'gist.githubusercontent.com') {
        url = !url?.toString().endsWith('raw')?url.toString() + '/raw':url.toString()
    } else {
        url = url.toString()
    }
    try {
        var response = await axios(url+"?timestamp="+new Date());
    } catch {
        return await message.send(Lang.INVALID_URL)
    }
    let plugin_name = /pattern: ["'](.*)["'],/g.exec(response.data)
    var plugin_name_temp = response.data.match(/pattern: ["'](.*)["'],/g)?response.data.match(/pattern: ["'](.*)["'],/g).map(e=>e.replace("pattern","").replace(/[^a-zA-Z]/g, "")):"temp"
    try { plugin_name = plugin_name[1].split(" ")[0] } catch { return await message.sendReply("_Invalid plugin. No plugin name found!_") }
    fs.writeFileSync('./plugins/' + plugin_name + '.js', response.data);
    plugin_name_temp = plugin_name_temp.length > 1 ? plugin_name_temp.join(", ") : plugin_name;
    try {
        require('./' + plugin_name);
    } catch (e) {
        fs.unlinkSync(__dirname+'/'+plugin_name + '.js')
        return await message.sendReply(Lang.INVALID_PLUGIN + e);
    }
    await Db.installPlugin(url, plugin_name);
    await message.send(Lang.INSTALLED.format(plugin_name_temp));
}
}));

Module({
    pattern: 'plugin ?(.*)',
    fromMe: true,
    use: 'owner',
    desc: Lang.PLUGIN_DESC
}, (async (message, match) => {
    var plugins = await Db.PluginDB.findAll();
    if (match[1] !== '') {
        var plugin = plugins.filter(_plugin => _plugin.dataValues.name === match[1])
        try {
            await message.sendReply(`_${plugin[0].dataValues.name}:_ ${plugin[0].dataValues.url}`);
        } catch {
            return await message.sendReply(Lang.PLUGIN_NOT_FOUND)
        }
        return;
    }
    var msg = Lang.INSTALLED_PLUGINS;
    var plugins = await Db.PluginDB.findAll();
    if (plugins.length < 1) {
        return await message.send(Lang.NO_PLUGIN);
    } else {
        plugins.map(
            (plugin) => {
                msg += '*' +plugin.dataValues.name + '* : ' +( plugin.dataValues.url.endsWith("/raw")?plugin.dataValues.url.replace('raw',''):plugin.dataValues.url) + '\n\n';
            }
        );
        return await message.sendReply(msg);
    }
}));

Module({
    pattern: 'remove(?: |$)(.*)',
    fromMe: true,
    use: 'owner',
    desc: Lang.REMOVE_DESC
}, (async (message, match) => {
    if (match[1] === '') return await message.send(Lang.NEED_PLUGIN);
    var plugin = await Db.PluginDB.findAll({
        where: {
            name: match[1]
        }
    });
    if (plugin.length < 1) {
        return await message.send(Lang.NO_PLUGIN);
    } else {
        await plugin[0].destroy();
        const Message = Lang.DELETED.format(match[1])
        await message.sendReply(Message);
        delete require.cache[require.resolve('./' + match[1] + '.js')]
        fs.unlinkSync('./plugins/' + match[1] + '.js');
       }
}));

Module(
    {
      pattern: "pupdate ?(.*)",
      fromMe: true,
      use: "owner",
      desc: "Update a plugin",
    },
    async (m, match) => {
      const plugin = match[1];
      if (!plugin) return await m.send("Need a plugin name");
      await Db.PluginDB.sync();
      var plugins = await Db.PluginDB.findAll({
        where: {
          name: plugin,
        },
      });
      if (plugins.length < 1) {
        return await m.send("Such plugin isn't installed!");
      }
      var url = plugins[0].dataValues.url;
      try {
        var response = await axios(url + "?timestamp=" + new Date());
      } catch {
        return await m.send("invalid url");
      }
      fs.writeFileSync("./plugins/" + plugin + ".js", response.data);
      delete require.cache[require.resolve("./" + plugin + ".js")];
      try {
        require("./" + plugin);
      } catch (e) {
        fs.unlinkSync(__dirname + "/" + plugin + ".js");
        return await m.send("Invalid plugin\n" + e);
      }
      await m.send("The plugin '"+ plugin + "' has been updated.");
      return;
    }
  );
