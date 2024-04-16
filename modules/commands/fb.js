var axios = require('axios');

function readURL(url, isAudio) {
  var cb;
  var returnPromise = new Promise(function (resolve, reject) {
    cb = function (err, res) {
      if (err) reject(err);
      resolve(res);
    }
  });
  
  axios({
    method: 'GET',
    url,
    responseType: 'stream'
  })
    .then(function (res) {
      var ext = res.headers['content-type'].split('/').pop();
      if (!isAudio) res.data.path = Date.now() + '.' + ext;
      else res.data.path = Date.now() + '.mp3';
      return res.data;
    })
    .then(function (res) {
      return cb(null, res);
    })
    .catch(cb);
  
  return returnPromise;
}

function readID(url) {
  var cheerio = require('cheerio');
  var cb;
  var returnPromise = new Promise(function (resolve, reject) {
    cb = function (err, res) {
      if (err) reject(err);
      resolve(res);
    }
  });

  axios
    .get(url)
    .then(function (res) {
      var $ = cheerio.load(res.data);
      return $('link[rel="alternate"]')
        .attr('href')
        .split('/')
        .filter((v) => isNaN(parseInt(v)) == false)[0];
    })
    .then(function (res) {
      return cb(null, res);
    })
    .catch(function (err) {
      console.log(err);
      return cb(err);
    });

  return returnPromise;
}

class GraphResponse {
  get config() {
    return {
      name: 'fb',
      version: 'Deprecated',
      hasPermission: 0,
      credits: 'Sam',
      description: 'Download All type From Facebook',
      commandCategory: 'Media',
      usages: '{p}{m} {type} {url}',
      cooldowns: 5
    }
  }
  async run({ api, event, args }) {
    var txt = function (res, react) {
      var { messageID, threadID, senderID } = event;
      return api.sendMessage(res, threadID, function (e, i) {
        if (e) txt(`Đã xảy ra lỗi\nError:\n${e}`);
        else if (react) global.client.handleReaction.push({
          name: 'fb',
          author: senderID,
          type: 'Media',
          messageID: i.messageID,
          url: react
        });
      }, messageID);
    }
    if (!api.getAccess) 
      return txt('facebook-chat-api không hỗ trợ getAccess\nVui lòng xài facebook-chat-api gốc của module');
    return api.getAccess(async function (err, token) {
      if (err) {
        switch (err.type) {
          case 'submitCode':
            return txt('Vui lòng tắt 2FA để có thể xài');
          default:
            console.log(err);
            return txt('Đã xảy ra lỗi, vui lòng kiểm tra console');
        }
      }
      if (!args[0]) 
      return txt('{p}{m} help để xem cách xài');
      try {
        var Graph = {
          get: function httpGet(postID) {
            var cb;
            var returnPromise = new Promise(function (resolve, reject) {
              cb = function (err, resData) {
                if (err) reject(err);
                resolve(resData);
              }
            });

            api
              .httpGet('https://graph.facebook.com/v1.0/' + postID + '?access_token='+ token)
              .then(function (res) {
                return cb(null, JSON.parse(res));
              })
              .catch(function (err) {
                console.log(err);
                return cb(err);
              });

            return returnPromise;
          },
          post: function httpPost(url, form) {
            var cb;
            var returnPromise = new Promise(function (resolve, reject) {
              cb = function (err, resData) {
                if (err) reject(err);
                resolve(resData);
              }
            });

            api
              .httpPost(url, form)
              .then(function (res) {
                return cb(null, JSON.parse(res.split('\n')[0]));
              })
              .catch(function (err) {
                console.log(err);
                return cb(err);
              });
            
            return returnPromise;
          }
        }
        switch (args[0].toLowerCase()) {
          case 'help':
          case '-h':
            var msg = 
              `Dùng {p}{m}:\n` +
              `- help/-h để xem cách xài\n` +
              `- reel/-r {url} để tải link reel\n` + 
              `- watch/-w {url} để tải link watch\n` +
              `- story/-s {url} để tải story\n` +
              `- post/-p {url} để tải post`;
            return txt(msg);
          case 'story':
          case '-s':
            var isStory = /https:\/\/(www|m)\.facebook\.com\/stories\/(\d+)\/([^.]+)\/\?(bucket_count|view_single)/g.exec(args[1]);
            if (isStory == null) 
              return txt('URL is not accept');
            var st = await Graph
              .post('https://www.facebook.com/api/graphql/', {
                doc_id: '5804889792887763',
                fb_api_req_friendly_name: "StoriesSuspenseContentPaneRootWithEntryPointQuery",
                variables: JSON.stringify({
                  UFI2CommentsProvider_commentsKey: "StoriesSuspenseContentPaneRootWithEntryPointQuery",
                  blur: 10,
                  bucketID: isStory[2],
                  displayCommentsContextEnableComment: true,
                  displayCommentsContextIsAdPreview: false,
                  displayCommentsContextIsAggregatedShare: false,
                  displayCommentsContextIsStorySet: false,
                  displayCommentsFeedbackContext: null,
                  feedbackSource: 65,
                  feedLocation: "COMET_MEDIA_VIEWER",
                  focusCommentID: null,
                  initialBucketID: isStory[2],
                  initialLoad: true,
                  isStoryCommentingEnabled: false,
                  scale: 1,
                  shouldDeferLoad: false,
                  shouldEnableArmadilloStoryReply: false,
                  shouldEnableLiveInStories: true,
                  shouldEnableLiveInStoriesDropdown: false
                }),
              server_timestamps: !0
              });
            var st = st.data.bucket;
            var ser = st.unified_stories.edges.find((v) => v.node.id == isStory[3]).node;
            return txt({
              body: 
                `Owner: ` + st.story_bucket_owner.name +
                `\nReaction To Convert Audio`,
              attachment: await readURL(ser.attachments[0].media.playable_url_quality_hd)
            }, ser.attachments[0].media.playable_url_quality_hd);
          case 'watch':
          case '-w':
            if (args[1].includes('fb.watch')) args[1] = 'https://www.facebook.com/watch?v=' + (await readID(args[1]));
            var URI = args[1].match(/\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/);
            if (URI == null || URI.length < 2) 
              return txt('URL is not accept');
            var wt = await Graph
              .get(URI[1]);
            return txt({
              body: 
                `Owner: ` + wt.from.name +
                `\nDesc: ` + (wt.name + '\n' || '') + wt.description +
                `\nReaction To Convert Audio`,
              attachment: await readURL(wt.source)
            }, wt.source);
          case 'reel':
          case '-r':
            var URI = args[1].match(/\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/);
            if (URI == null || URI.length < 2) 
              return txt('URL is not accept');
            var rl = await Graph
              .get(URI[1]);
            if (rl.error) 
              return txt(rl.error.message);
            return txt({
              body: 
                `Owner: ` + (!!rl.from == true ? rl.from.name : null) +
                `\nDesc: ` + rl.description +
                `\nReaction To Convert Audio`,
              attachment: await readURL(rl.source)
            }, rl.source);
          case 'post':
          case '-p':
            var URI = /\.com\/(story\.php\?story_fbid=(\S+)&id|(\S+)\/posts\/(\S+)(\/\?|))/g.exec(args[1]).filter(v => v != undefined && v != '');
            // |groups\/\S+\/permalink\/(\d+)\/\? (rảnh code thêm, giờ là 10h30 r không tắt máy có mà vừa ngủ vừa khóc :) )
            if (URI == null || URI.length < 2) 
              return txt('URL is not accept');
            var cookie = api
              .getAppState()
              .map(function (v) {
                return v.key + '='+ v.value + ';';
              })
              .join('');
            return axios({
              method: 'GET',
              url: args[1],
              headers: {
                accept: 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                encoding: 'gzip',
                cookie,
                "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
              }
            })
              .then(res => res.data)
              .then(async function (res) {
                var pt = await Graph
                  .get(URI.pop());
                console.log(pt)
                var msg = {
                  body: 
                    `Owner: ` + (!!pt.from == true ? pt.from.name : null) +
                    `\nDesc: ` + (pt.message || null)
                }
                var attachment = [];
                if (res.includes('playable_url_quality_hd')) {
                  for (let i of res.split('permalink_url')) {
                    if (i.indexOf('":"') < 0) break;
                    var videoID = /(\d+)/g.exec(i.split('","')[0])[1];
                    var playURL = (await Graph.get(videoID)).source;
                    if (playURL) attachment.push(await readURL(playURL));
                  }
                  msg.attachment = attachment;
                }
                else if (res.includes('.com/photo/?fbid=')) {
                  for (let i of res.split('.com/photo/?fbid')) {
                    if (i.indexOf('=') < 0) break;
                    var pictureID = /(\d+)/g.exec(i)[1];
                    var data = await Graph.get(pictureID);
                    var pictureURL = data.source || !!data.images ? data.images[0].source : undefined;
                    if (pictureURL) attachment.push(await readURL(pictureURL));
                  }
                  msg.attachment = attachment;
                }
                else if (res.includes('.com/photo.php?fbid=')) {
                  for (let i of res.split('.com/photo.php?fbid')) {
                    if (i.indexOf('=') < 0) break;
                    var pictureID = /(\d+)/g.exec(i)[1];
                    var data = await Graph.get(pictureID);
                    var pictureURL = data.source || !!data.images ? data.images[0].source : undefined;
                    if (pictureURL) attachment.push(await readURL(pictureURL));
                  }
                  msg.attachment = attachment;
                }
                return txt(msg);
              })
              .catch(function (res) {
                console.log(res);
                return txt(res);
              });
          default:
            return txt('{p}{m} help để xem cách xài');
        }
      } catch (e) {
        console.log(e);
        return txt('Đã xảy ra lỗi\n' + e);
      }
    });
  }
  async handleReaction({ api, event, handleReaction }) {
    var { userID, threadID, messageID } = event;
    if (userID != handleReaction.author) return;
    return api.sendMessage({
      attachment: await readURL(handleReaction.url, true)
    }, threadID, messageID);
  }
}

module.exports = new GraphResponse();