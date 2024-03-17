//game.import( name:"noname-huntersxy"
//提示：本扩展源代码基于GPL协议向无名杀社区开放，欢迎大家借鉴和参考代码。
//import { VERSION } from './version.js'
import { lib,get,_status,ui,game,ai } from './extension/noname.js';
import { CONFIG } from './extension/config.js';
import { CONTENT } from './extension/content.js';
import { PRECONTENT } from './extension/precontent.js';

let mainPackageFunc = async function(){
  const extensionInfo = 
        await lib.init.promises.json(`${lib.assetURL}extension/noname-huntersxy/info.json`);
  let mainPackage = {
    name: "noname-huntersxy", content:CONTENT, precontent:PRECONTENT, config:CONFIG, help: {}, package: {
      character: {
        character: {
        },
        translate: {
        },
      },
      card: {
        card: {
        },
        translate: {
        },
        list: [],
      },
      skill: {
        skill: {
        },
        translate: {
        },
      },
      intro: "烤箱插座阴间武将基于原版技能的简单魔改",
        author: "huntersxy",
        diskURL: "https://github.com/noname-huntersxy/noname-noname-huntersxy",
        forumURL: "https://github.com/noname-huntersxy/noname-noname-huntersxy",
      version: extensionInfo.version,
    }, files: { "character": [], "card": [], "skill": [] }
  };
  window.qhly_extension_package = mainPackage;
  return mainPackage;
};


export let type = 'extension';

export default mainPackageFunc;