const assets = require('@miraipr0ject/assets');
const crypto = require('crypto');
const os = require("os");

module.exports.throwError = function (command, threadID, messageID) {
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	return global.client.api.sendMessage(global.getText("utils", "throwError", ((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX), command), threadID, messageID);
}

module.exports.cleanAnilistHTML = function (text) {
	text = text
		.replace('<br>', '\n')
		.replace(/<\/?(i|em)>/g, '*')
		.replace(/<\/?b>/g, '**')
		.replace(/~!|!~/g, '||')
		.replace("&amp;", "&")
		.replace("&lt;", "<")
		.replace("&gt;", ">")
		.replace("&quot;", '"')
		.replace("&#039;", "'");
	return text;
}

module.exports.downloadFile = async function (url, path) {
	const { createWriteStream } = require('fs');
	const axios = require('axios');

	const response = await axios({
		method: 'GET',
		responseType: 'stream',
		url
	});

	const writer = createWriteStream(path);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};

module.exports.getContent = async function(url) {
	try {
		const axios = require("axios");

		const response = await axios({
			method: 'GET',
			url
		});

		const data = response;

		return data;
	} catch (e) { return console.log(e); };
}

module.exports.randomString = function (length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length || 5;
	for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}

module.exports.assets = {
	async font (name) {
		if (!assets.font.loaded) await assets.font.load();
		return assets.font.get(name);
	},
	async image (name) {
		if (!assets.image.loaded) await assets.image.load();
		return assets.image.get(name);
	},
	async data (name) {
		if (!assets.data.loaded) await assets.data.load();
		return assets.data.get(name);
	}
}

module.exports.AES = {
	encrypt (cryptKey, crpytIv, plainData) {
		var encipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(cryptKey), Buffer.from(crpytIv));
        var encrypted = encipher.update(plainData);
		encrypted = Buffer.concat([encrypted, encipher.final()]);
		return encrypted.toString('hex');
	},
	decrypt (cryptKey, cryptIv, encrypted) {
		encrypted = Buffer.from(encrypted, "hex");
		var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(cryptKey), Buffer.from(cryptIv, 'binary'));
		var decrypted = decipher.update(encrypted);
	
		decrypted = Buffer.concat([decrypted, decipher.final()]);
	
		return String(decrypted);
	},
	makeIv () { return Buffer.from(crypto.randomBytes(16)).toString('hex').slice(0, 16); }
}

module.exports.homeDir = function () {
	var returnHome, typeSystem;
	const home = process.env["HOME"];
	const user = process.env["LOGNAME"] || process.env["USER"] || process.env["LNAME"] || process.env["USERNAME"];

	switch (process.platform) {
		case "win32": {
			returnHome = process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
			typeSystem = "win32"
			break;
		}
		case "darwin": {
			returnHome = home || (user ? '/Users/' + user : null);
			typeSystem = "darwin";
			break;
		}
		case "linux": {
			returnHome =  home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
			typeSystem = "linux"
			break;
		}
		default: {
			returnHome = home || null;
			typeSystem = "unknow"
			break;
		}
	}

	return [typeof os.homedir === 'function' ? os.homedir() : returnHome, typeSystem];
}

module.exports.readStreamFromURL = function (url, path = undefined) {
  var cb;
  var axios = require('axios');
  var rtPromise = new Promise(function (resolve, reject) {
    cb = function (err, stream) {
      if (err) reject(err);
      resolve(stream);
    }
  });

  axios({
    method: 'GET',
    url,
    responseType: 'stream'
  })
    .then(function (res) {
      var ext = res.headers['content-type'].split('/').pop();
      var stream = res.data;
      if (path) stream.path = path;
      else stream.path = Date.now() + '.' + ext;
      cb(null, stream);
    })
    .catch(function (error) {
      cb(err);
    });  
  return rtPromise;
}

module.exports.Y2Mate = function () {
  var request = require('request').defaults({ jar: true });

  function getJar() {
    var jar = request.jar();
    return jar;
  }

  function getHeaders(url, customHeader) {
    var headers = {  
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: "https://www.y2mate.com",
      Host: new URL(url).hostname,
      Origin: "https://www.y2mate.com/",
      "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      Connection: 'keep-alive',
      "sec-fetch-site": "same-origin"
    }
    if (customHeader) {
      Object.assign(headers, customHeader);
      if (customHeader.noRef) {
        delete headers.Referer;
      }
    }
    return headers;
  }

  function httpGet(url, jar, customHeader) {
    var cb;
    var rtPromise = new Promise(function (resolve, reject) {
      cb = function (error, resData) {
        if (error) reject(error);
        resolve(resData);
      }
    });
    var Options = {
      headers: getHeaders(url, customHeader),
      timeout: 60000,
      url,
      method: "GET",
      jar,
      gzip: true
    }
    request(Options, function (error, response, body) {
      return cb(error, response);
    });

    return rtPromise;
  }

  function httpPost(url, jar, form, customHeader) {
    var cb;
    var rtPromise = new Promise(function (resolve, reject) {
      cb = function (error, resData) {
        if (error) reject(error);
        resolve(resData);
      }
    });
    var Options = {
      headers: getHeaders(url, customHeader),
      timeout: 60000,
      url,
      method: "POST",
      form,
      jar,
      gzip: true
    }
    request(Options, function (error, response, body) {
      return cb(error, response);
    });

    return rtPromise;
  } 

  function saveCookie(jar) {
    return function (res) {
      var cookies = res.headers["set-cookie"] || [];
      cookies.forEach(function (v) {
        jar.setCookie(v, 'https://www.y2mate.com/');
      });

      return res;
    }
  }

  return {
    getJar,
    get: httpGet,
    post: httpPost,
    saveCookie
  }
}

module.exports.createRequest = function (Options) {
  var getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);
  var request = require('request')
    .defaults({ jar: true });

  if (getType(Options) != 'Object') {
    throw 'Error: Options is not a Object';
  }

  function getHeaders(url, customHeader) {
    var headers = {  
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: Options.url,
      Host: new URL(url).hostname,
      Origin: Options.url,
      "User-Agent": Options.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'Sec-Ch-Ua-Platform': 'Windows',
      Connection: 'keep-alive',
      "sec-fetch-site": "same-origin"
    }
    if (customHeader) {
      Object.assign(headers, customHeader);
      if (customHeader.noRef) {
        delete headers.Referer;
      }
    }
    return headers;
  }

  function get(url, jar, customHeader) {
    var cb;
    var rtPromise = new Promise(function (resolve, reject) {
      cb = function (error, resData) {
        resData ? resolve(resData) : reject(error);
      }
    });
    var Options = {
      headers: getHeaders(url, customHeader),
      timeout: 60000,
      url,
      method: "GET",
      jar,
      gzip: true
    }
    request(Options, function (error, response, body) {
      return cb(error, response);
    });

    return rtPromise;
  }

  function post(url, jar, form, customHeader) {
    var cb;
    var rtPromise = new Promise(function (resolve, reject) {
      cb = function (error, resData) {
        resData ? resolve(resData) : reject(error);
      }
    });
    var Options = {
      headers: getHeaders(url, customHeader),
      timeout: 60000,
      url,
      method: "POST",
      form,
      jar,
      gzip: true
    }
    request(Options, function (error, response, body) {
      return cb(error, response);
    });

    return rtPromise;
  } 

  function saveCookie(jar) {
    return function (res) {
      var cookies = res.headers["set-cookie"] || [];
      cookies.forEach(function (v) {
        jar.setCookie(v, Options.url);
      });

      return res;
    }
  }

  return {
    getJar: request.jar,
    get,
    post,
    saveCookie
  }
}