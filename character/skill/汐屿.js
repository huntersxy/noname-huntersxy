game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'汐屿技能',
		connect:true,
		skill:{


        "h_shouhu":{
                trigger:{
                    player:"damageBegin1",
                },
                usable:1,
                forced:true,
                unique:true,
                content:function(){ trigger.cancel();player.draw(2);player.changeHujia();
            },
                ai:{
                    player:2,
                },
                "_priority":0,
            },
            "h_zhudi":{
                enable:"phaseUse",
                usable:1,
                filter:function(event,player){
        return player.hujia?true:false;
    },
                filterTarget:function(card,player,target){
        return player!=target&&get.distance(player,target,'attack')<=1;
    },
                selectTarget:function(){
        return [1,_status.event.player.hujia];
    },
                contentBefore:function(){
        player.changeHujia(-targets.length);
    },
                content:function(){
        target.damage();
    },
                ai:{
                    order:9,
                    result:{
                        target:function(player,target){
                var eff=get.damageEffect(target,player,target)+0.5;
                if(eff>0&&eff<=0.5) return 0;
                return eff;
            },
                    },
                },
                "_priority":0,
            },
    
    
    
            "h_pojia":{
                trigger:{
                    player:"phaseEnd",
                },
                filter:function(event,player){
        return player.hujia>0;
    },
                check:function(event,player){
        return player.hujia>1&&player.hp>1;
    },
                content:function(){
        player.storage.h_pojia=player.hujia;
        player.changeHujia(-player.hujia);
        player.insertPhase();
    },
                group:["h_pojiafushu","h_pojiafushu2"],
                subSkill:{
                    hp:{
                        trigger:{
                            player:"phaseAfter",
                        },
                        silent:true,
                        filter:function(event,player){
                return event.skill=='h_pojia'&&!player.getStat('damage');
            },
                        content:function(){
                player.loseHp();
            },
                        sub:true,
                        forced:true,
                        popup:false,
                        "_priority":1,
                    },
                    draw:{
                        trigger:{
                            player:"phaseDrawBegin",
                        },
                        filter:function(event){
                return event.getParent('phase').skill=='h_pojia';
            },
                        silent:true,
                        content:function(){
                trigger.num+=player.storage.h_pojia-1;
            },
                        sub:true,
                        forced:true,
                        popup:false,
                        "_priority":1,
                    },
                },
                "_priority":0,
            },
    
    
            "h_pojiafushu":{
                trigger:{
                    player:"phaseDrawBegin",
                },
                filter:function(event){
        return event.getParent('phase').skill=='h_pojia';
    },
                silent:true,
                content:function(){
        trigger.num+=player.storage.h_pojia-1;
    },
                sub:true,
                forced:true,
                popup:false,
                "_priority":1,
            },
    
    
            "h_pojiafushu2":{
                trigger:{
                    player:"phaseDrawBegin",
                },
                filter:function(event){
        return event.getParent('phase').skill=='h_pojia';
    },
                silent:true,
                content:function(){
        trigger.num+=player.storage.h_pojia-1;
    },
                sub:true,
                forced:true,
                popup:false,
                "_priority":1,
            },    
		},



        


		translate:{
			"h_shouhu":"守护",
            "h_shouhu_info":"锁定技。每回合限一次，当你受到伤害时，你取消之并摸两张牌且获得一点护甲",
            "h_zhudi":"逐敌",
            "h_zhudi_info":"每回合限一次，你可以舍弃任意数量的护甲并对等量的角色造成一点伤害。",
            "h_pojia":"护世",
            "h_pojia_info":"回合结束时，若你有护甲，则你可失去全部护甲并获得一个额外回合，该回合的摸牌数为你失去的护甲值的两倍，若你在额外回合中未造成伤害，则你失去一点体力。",
            "h_pojiafushu":"破甲",
            "h_pojiafushu_info":"破甲附属",
            "h_pojiafushu2":"破甲",
            "h_pojiafushu2_info":"破甲附属",



		},
	};
});
