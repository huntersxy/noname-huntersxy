game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'永恒布洛妮娅',
		connect:true,
		skill:{
                //这里放技能
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
		translate:{
                //这里放描述			
				"h_boom":"自爆",
            	"h_boom_info":"出牌阶段，你可以失去10点体力，然后变成武将牌代码为h_boom的东西",





		},
	};
});
