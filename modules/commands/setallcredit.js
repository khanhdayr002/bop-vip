exports.config = {
  name: 'setallcredit',
  version: '0.0.1',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'set credit commands mới',
  commandCategory: 'Tiện ích',
  usages: '[text]',
  cooldowns: 3
};
let fs = require('fs');

exports.run = function(o) {
  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);
  let credits_input = o.args.join(' ') || 'Haruna';
  let all_file = fs.readdirSync(__dirname).filter($=>/\.js$/.test($));
  let module_err = [];
  for (let file of all_file)try {
    let path_module = __dirname+'/'+file;
    let module_str = fs.readFileSync(path_module, 'utf8');
    let config_str = module_str.match(/(module[\s.]+|)exports[\s.]+config\s*=\s*({[^;]*})/)?.[2]; if (!config_str)throw `- set credit ${file} -> Not Found Config Module`;
    let new_config = eval(`(()=>{
      let config = ${config_str};

      if (typeof config.credits != 'string'||config.credits=='DC-Nam')return false;

      config.credits = ${JSON.stringify(credits_input)};

      return JSON.stringify(config,0,4);
      })();`) || config_str;
    let new_module_str = module_str.replace(config_str, new_config);

    fs.writeFileSync(path_module, new_module_str);
  } catch(e) {
    console.error(e);
    module_err.push(file);
  };

  send(`Set credits mới cho ${all_file.length-module_err.length} module thành công!${module_err.length > 0?`\n\n-> Có ${module_err.length} module không thể set credit gồm: ${module_err.join(', ')}`: ''}`);
};