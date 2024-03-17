game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "noname-huntersxy", 
        editable: false,
        content: function (config, pack) {
            //自己的自定义势力列表
            lib.group.addArray(['xy']);
            lib.qy_group = ['xy']; 
            lib.translate.xy = '伳';
            lib.translate.xy2 = '伳';
            lib.groupnature.xy = 'xy';
            lib.translate.xyColor = "#ebbd07";
            //自己的自定义前缀
            lib.namePrefix.set('寻',{color:'#FFA500'});
        }, precontent: 
        function (huntersxy) {
            if (huntersxy.enable) {
                //Huntersxy 武将包
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/extension_huntersxy.js');
                window.HXY_import = function (pack) {
                    pack(lib, game, ui, get, ai, _status);
                };


                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/acg.js');
                //lib.config.all.characters.push('acg');
                lib.translate['acg_character_config'] = "ACG";//包名翻译
                if (!lib.config.characters.includes('character') && !lib.config.extension_huntersxy_autoOpenPack) {
                    lib.config.characters.push('character')
                    game.saveConfig('characters', lib.config.characters)
                    game.saveConfig('extension_acg_autoOpenPack', true)
                }

            }
        }, help: {}, config: {}, package: {
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
            intro: "烤箱插座阴间武将基于原版技能的简单魔改,名为noname-huntersxy的武将包是测试用的",
            author: "noname-huntersxy",
            diskURL: "https://github.com/noname-huntersxy/noname-noname-huntersxy",
            forumURL: "https://github.com/noname-huntersxy/noname-noname-huntersxy",
            version: "2.0",
        }, files: { "character": [], "card": [], "skill": [], "audio": [] }
    }
})
