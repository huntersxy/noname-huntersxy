game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'huntersxy',
		connect:true,
		character:{
            cvhanser:["female","xy","3/5",["h_fc"],["des:著名CV","ext:noname-huntersxy/character/image/cvhanser.jpg","die:ext:noname-huntersxy/audio/die/cvhanser.mp3"]],
            "h_jiaxu":["male","xy","3/3",["rewansha","reweimu","zyjianbing","yjzhenlve","yjjianshu","reluanwu","yjyongdi"],["des:御神贾诩","ext:noname-huntersxy/character/image/h_jiaxu.jpg","die:ext:noname-huntersxy/audio/die/h_jiaxu.mp3"]],
            "h_spuyuan":["male","xy","3/3",["h_baohu","h_ronghe","olqisi","pyzhuren"],["des:炼器大师","ext:noname-huntersxy/character/image/h_spuyuan.jpg","die:ext:noname-huntersxy/audio/die/h_spuyuan.mp3"]],
            "h_smaliang":["male","xy","3/3",["h_zhishu","h_yushu"],["des:妙笔生花","ext:noname-huntersxy/character/image/h_smaliang.jpg","die:ext:noname-huntersxy/audio/die/h_smaliang.mp3"]],
            "h_bronya":["female","xy","3/3",["h_yuanji","h_sushe"],["des:真理永远在射程之内","ext:noname-huntersxy/character/image/h_puluomixiushi.jpg"]],
            "h_huohuo":["female","xy","3/3",["h_weiba"],["ext:noname-huntersxy/character/image/h_huohuo.jpg","die:ext:noname-huntersxy/audio/die/h_huohuo.mp3"]],
            "h_huohuoweiba":["double","xy","4/6",["h_quhun"],["boss","forbidai","bossallowed","ext:noname-huntersxy/character/image/h_huohuoweiba.jpg","die:ext:noname-huntersxy/audio/die/h_huohuoweiba.mp3"]],
            "h_ailixiya":["female","xy","3/12",["h_shiyuan","h_renlu"],["zhu","boss","bossallowed","ext:noname-huntersxy/character/image/h_ailixiya.jpg","die:ext:noname-huntersxy/audio/die/h_ailixiya.mp3"]],
            "h_gx":["female","xy","3/3",["h_guanxin","h_xinqi","h_juxin"],["ext:noname-huntersxy/character/image/h_gx.jpg","die:ext:noname-huntersxy/audio/die/h_gx.mp3"]],
            "h_geleixiu":["female","xy","2/2/1",["h_huishi","h_zhanyan","h_linmu"],["des:画笔，臣服于我","ext:noname-huntersxy/character/image/h_geleixiu.jpg"]],
            "h_yinlang":["female","xy","4/4",["h_stop","h_zhuru","h_download"],["ext:noname-huntersxy/character/image/h_yinlang.jpg","die:ext:noname-huntersxy/audio/die/h_yinlang.mp3"]],
            "h_zhenji":["female","xy","4/4",["h_mosha","h_shenlin","paoxiao"],["ext:noname-huntersxy/character/image/h_zhenji.jpg"]],
            
            "h_sxjqingque":["female","xy",3,["h_dugou","qinzheng"],["des:哪有赌狗天天输","ext:noname-huntersxy/character/image/h_sxjqingque.jpg"]],
            "h_husixiyu":["female","xy","1/5/4",["h_shouhu","h_zhudi","h_pojia"],["des:守护己身，护世之铭","ext:noname-huntersxy/character/image/h_husixiyu.jpg"]],
            "h_puluomixiushi":["female","xy","3/3",["h_shagod","h_bhyz"],["des:崩坏意志，机械之躯难以磨灭","ext:noname-huntersxy/character/image/h_puluomixiushi.jpg"]],
            "h_inbronya":["female","xy",Infinity,["h_mosha","h_shagod","h_xinqi","h_yuanji","paoxiao"],["forbidai","ext:noname-huntersxy/character/image/h_inbronya.jpg"]],
		},
		characterIntro:{

		},
		card:{

		},
		skill:{
			"h_boom":{
                audio:"ext:noname-huntersxy:2",
                enable:"phaseUse",
                prompt:"失去1点体力并摸两张牌",
                content:function(){
        "step 0"
        player.loseHp(10);
        "step 1"
        player.init('h_boom');
    },
                ai:{
                    basic:{
                        order:1,
                    },
                    result:{
                        player:function(player){
                if(player.countCards('h')>=player.hp-1) return -1;
                if(player.hp<3) return -1;
                return 1;
            },
                    },
                },
                "_priority":0,
            },

		},
		perfectPair:{
			
		},
		characterReplace:{
			
		},
		dynamicTranslate:{},
		translate:{
			"h_boom":"自爆",
            "h_boom_info":"出牌阶段，你可以失去10点体力，然后变成武将牌代码为h_boom的东西",
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
		pinyins:{
			
		}
	};
});