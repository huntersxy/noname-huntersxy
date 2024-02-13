game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'huntersxy6',
		connect:true,
		character:{
			
		},
		characterIntro:{

		},
		card:{

		},
		skill:{
			"h_bhyz":{
                unique:true,
                forced:true,
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                filter:function(event,player){
        
        return player.isDamaged();
    },
                check:function(event,player){
        if(player.hp<=2||player.getDamagedHp()>2) return true;
        if(player.getDamagedHp()<=1) return false;
        return player.getDamagedHp()<game.roundNumber;
    },
                content:function(){
        
        player.recover(player.maxHp-player.hp);
        player.draw(player.maxHp-player.hp);
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
			"h_bhyz":"重整",
            "h_bhyz_info":"准备阶段，你将体力回复至上限，然后摸X张牌（X为你回复的体力值）。",
		},
		pinyins:{
			
		}
	};
});
