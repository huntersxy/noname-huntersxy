game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"noname-huntersxy",content:function(config,pack){
  lib.group.addArray(['xy']);
        lib.qy_group = ['xy']; //自己的自定义势力列表
        /************伳************/
        lib.translate.xy = '伳';
        lib.translate.xy2 = '伳';
        lib.groupnature.xy = 'xy';
        lib.translate.xyColor = "#ebbd07";
        /************伳************/
  
        //以下是备注
//v2.0 基于1.10.7.1


},precontent:function (huntersxy) {
            if (huntersxy.enable) {
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/huntersxy/huntersxy.js', null);
            
            //角色技能外置
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/普罗米修斯.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/汐屿.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/cvhanser.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/裴秀马良.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/布洛妮娅.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/始源爱莉.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/青雀.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/银狼.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/格蕾修.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/观星.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/藿藿.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/真纪.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/神蒲元.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/永恒布洛妮娅.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/真纪.js', null);
            lib.init.js(lib.assetURL + 'extension/noname-huntersxy/skill/真纪.js', null);
            
            lib.config.all.characters.push('huntersxy');
                lib.translate['huntersxy_character_config'] = "Huntersxy";// 包名翻译                       
                   if(!lib.config.characters.includes('character')&&!lib.config.extension_huntersxy_autoOpenPack){
            lib.config.characters.push('character')
            game.saveConfig('characters',lib.config.characters)
            game.saveConfig('extension_huntersxy_autoOpenPack', true)
        }
                  window.JINQU_import  = function (func) {
            func(lib, game, ui, get, ai, _status);
        };
        
 
        
        }
        },help:{},config:{},package:{
    character:{
        character:{
            cvhanser:["female","xy","3/5",["h_fc"],["des:著名CV","ext:noname-huntersxy/cvhanser.jpg","die:ext:noname-huntersxy/audio/die/cvhanser.mp3"]],
            "h_jiaxu":["male","xy","3/3",["rewansha","reweimu","zyjianbing","yjzhenlve","yjjianshu","reluanwu","yjyongdi"],["des:御神贾诩","ext:noname-huntersxy/h_jiaxu.jpg","die:ext:noname-huntersxy/audio/die/h_jiaxu.mp3"]],
            "h_spuyuan":["male","xy","3/3",["h_baohu","h_ronghe","olqisi","pyzhuren"],["des:炼器大师","ext:noname-huntersxy/h_spuyuan.jpg","die:ext:noname-huntersxy/audio/die/h_spuyuan.mp3"]],
            "h_smaliang":["male","xy","3/3",["h_zhishu","h_yushu"],["des:妙笔生花","ext:noname-huntersxy/h_smaliang.jpg","die:ext:noname-huntersxy/audio/die/h_smaliang.mp3"]],
            "h_bronya":["female","xy","3/3",["h_yuanji","h_sushe"],["des:真理永远在射程之内"]],
            "h_huohuo":["female","xy","3/3",["h_weiba"],["ext:noname-huntersxy/h_huohuo.jpg","die:ext:noname-huntersxy/audio/die/h_huohuo.mp3"]],
            "h_huohuoweiba":["double","xy","4/6",["h_quhun"],["boss","forbidai","bossallowed","ext:noname-huntersxy/h_huohuoweiba.jpg","die:ext:noname-huntersxy/audio/die/h_huohuoweiba.mp3"]],
            "h_ailixiya":["female","xy","3/12",["h_shiyuan","h_renlu"],["zhu","boss","bossallowed","ext:noname-huntersxy/h_ailixiya.jpg","die:ext:noname-huntersxy/audio/die/h_ailixiya.mp3"]],
            "h_gx":["female","xy","3/3",["h_guanxin","h_xinqi","h_juxin"],["ext:noname-huntersxy/h_gx.jpg","die:ext:noname-huntersxy/audio/die/h_gx.mp3"]],
            "h_geleixiu":["female","xy","2/2/1",["h_huishi","h_zhanyan","h_linmu"],["des:画笔，臣服于我"]],
            "h_yinlang":["female","xy","4/4",["h_stop","h_zhuru","h_download"],["ext:noname-huntersxy/h_yinlang.jpg","die:ext:noname-huntersxy/audio/die/h_yinlang.mp3"]],
            "h_zhenji":["female","xy","4/4",["h_mosha","h_shenlin","paoxiao"],[]],
            "h_inbronya":["female","xy",Infinity,["h_mosha","h_shagod","h_xinqi","h_yuanji","paoxiao"],["forbidai"]],
            "h_sxjqingque":["female","xy",3,["h_dugou","qinzheng"],["des:哪有赌狗天天输","ext:noname-huntersxy/h_sxjqingque.jpg"]],
            "h_husixiyu":["female","xy","1/5/4",["h_shouhu","h_zhudi","h_pojia"],["des:守护己身，护世之铭","ext:noname-huntersxy/h_husixiyu.jpg"]],
            "h_puluomixiushi":["female","xy","3/3",["h_shagod","h_bhyz"],["des:崩坏意志，机械之躯难以磨灭"]],
        },
        translate:{
            cvhanser:"Hanser•唱歌憨",
            "h_jiaxu":"神贾诩",
            "h_spuyuan":"神蒲元",
            "h_smaliang":"裴秀马良",
            "h_bronya":"布洛妮娅",
            "h_huohuo":"藿藿",
            "h_huohuoweiba":"藿藿&尾巴大爷",
            "h_ailixiya":"人之律者 爱莉希雅",
            "h_gx":"观星",
            "h_geleixiu":"格蕾修",
            "h_yinlang":"银狼",
            "h_zhenji":"真纪",
            "h_inbronya":"永恒 布洛妮娅",
            "h_sxjqingque":"青雀",
            "h_husixiyu":"汐屿",
            "h_puluomixiushi":"普罗米修斯",
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
    intro:"烤箱插座阴间武将基于原版技能的简单魔改",
    author:"noname-huntersxy",
    diskURL:"https://github.com/noname-huntersxy/noname-noname-huntersxy",
    forumURL:"https://github.com/noname-huntersxy/noname-noname-huntersxy",
    version:"2.0",
},files:{"character":["h_spuyuan.jpg","h_smaliang.jpg","h_huohuoweiba.jpg","cvhanser.jpg","h_jiaxu.jpg","h_bronya.jpg","h_geleixiu.jpg","h_inbronya.jpg","h_ailixiya.jpg","h_gx.jpg","h_huohuo.jpg","h_sxjqingque.jpg","h_husixiyu.jpg","h_yinlang.jpg","h_zhenji.jpg","h_puluomixiushi.jpg"],"card":[],"skill":[],"audio":[]}}})