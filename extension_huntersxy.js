var HXY=function(lib,game,ui,get,ai,_status){

                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/藿藿.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/普罗米修斯.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/汐屿.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/cvhanser.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/裴秀马良.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/布洛妮娅.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/始源爱莉.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/青雀.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/银狼.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/格蕾修.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/观星.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/真纪.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/神蒲元.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/永恒布洛妮娅.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/xier.js');
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/skill/伳影.js');
                //引用角色包
                lib.init.js(lib.assetURL + 'extension/noname-huntersxy/character/huntersxy.js');
                //lib.config.all.characters.push('huntersxy');
                lib.translate['huntersxy_character_config'] = "Huntersxy";//包名翻译
                if (!lib.config.characters.includes('character') && !lib.config.extension_huntersxy_autoOpenPack) {
                    lib.config.characters.push('character')
                    game.saveConfig('characters', lib.config.characters)
                    game.saveConfig('extension_huntersxy_autoOpenPack', true)
                }
};window.HXY_import(HXY);