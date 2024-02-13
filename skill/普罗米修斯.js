game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'普罗米修斯技能',
		connect:true,
		skill:{
            "h_shagod":{
                audio:"ext:noname-huntersxy:2",
                forced:true,
                group:["h_sha"],
                trigger:{
                    player:"useCardToPlayered",
                },
                filter:function(event,player){
    return event.card.name=='sha'},
                logTarget:"target",
                check:function(event,player){
        if(event.target.hasSkillTag('noe')) return false;
        return get.attitude(player,event.target)<0;
    },
                content:function(){
                'step 0'
        trigger.target.chooseToDiscard('e',true);
        //player.chooseToGuanxing(2);
        //player.chat("你等死吧");
        trigger.target.loseMaxHp(1);
        player.draw(1)
        player.gainPlayerCard(true, trigger.target, 'he');
        trigger.target.addLink(target);
        //trigger.player.gainMaxHp(1);
     

    },
                "_priority":0,
            },
            "h_sha":{
                audio:"ext:noname-huntersxy:2",
                trigger:{
                    player:"shaMiss",
                },
                silent:true,
                forced:true,
                content:function(){
        
        var card=get.cardPile(function(card){
                    return card.name=='sha';
                });
                if(card) player.gain(card,'gain2');
    },
                popup:false,
                "_priority":1,
            },
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
		translate:{
			"h_bhyz":"重整",
            "h_bhyz_info":"准备阶段，你将体力回复至上限，然后摸X张牌（X为你回复的体力值）。",
            "h_shagod":"清扫",
			"h_shagod_info":"锁定技，当你用杀指定目标后，你执行下项：①你摸一张牌。②你随机获得其一张装备区的牌。③你获得其一张牌。④横置对方。⑤减少其一点体力上限。若该杀未造成伤害，你获得一张杀。",
			"h_sha":"得杀",
			"h_sha_info":"杀被miss后摸一张杀",
		},
	};
});
