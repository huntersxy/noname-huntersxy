game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'huntersxy',
		connect:true,
		character:{
			
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
