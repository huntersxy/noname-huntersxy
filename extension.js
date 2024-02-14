game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"noname-huntersxy",content:function(config,pack){
            lib.group.addArray(['xy']);
            lib.qy_group = ['xy']; //自己的自定义势力列表
            lib.translate.xy = '伳';
            lib.translate.xy2 = '伳';
            lib.groupnature.xy = 'xy';
            lib.translate.xyColor = "#ebbd07";
            //以下是备注
            //v2.0 基于1.10.7.1
        },precontent:function (huntersxy) {
            if (huntersxy.enable) { 
                //初代角色技能外置，后续只要能用就不外置
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/普罗米修斯.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/汐屿.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/cvhanser.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/裴秀马良.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/布洛妮娅.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/始源爱莉.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/青雀.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/银狼.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/格蕾修.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/观星.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/藿藿.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/真纪.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/神蒲元.js', null);
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/永恒布洛妮娅.js', null);
                //引用角色包
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/huntersxy.js', null);
                lib.config.all.characters.push('huntersxy');
                lib.translate['huntersxy_character_config'] = "Huntersxy";// 包名翻译  

                if(!lib.config.characters.includes('character')&&!lib.config.extension_huntersxy_autoOpenPack){
                    lib.config.characters.push('character')
                    game.saveConfig('characters',lib.config.characters)
                    game.saveConfig('extension_huntersxy_autoOpenPack', true)
                }
                window.JINQU_import = function (func) {
                    func(lib, game, ui, get, ai, _status);
                };
            }
        },help:{},config:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"烤箱插座阴间武将基于原版技能的简单魔改,名为noname-huntersxy的武将包是测试用的",
    author:"noname-huntersxy",
    diskURL:"https://github.com/noname-huntersxy/noname-noname-huntersxy",
    forumURL:"https://github.com/noname-huntersxy/noname-noname-huntersxy",
    version:"2.0",
},files:{"character":[],"card":[],"skill":[],"audio":[]}}})