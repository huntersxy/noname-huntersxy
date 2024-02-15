game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'xier',
		connect:true,
		character:{

        },
		skill:{
            "h_ss":{
                audio:"ext:noname-huntersxy:2",
                trigger:{
                    global:"damageBefore",
                },
                filter:function(event,player){
        return (event.card&&event.source&&
            event.player.isIn()&&player.countCards('he'));
    },
                direct:true,
                checkx:function(event,player){
        var att1=get.attitude(player,event.player);
        var att2=get.attitude(player,event.source);
        return att1>0&&att2<=0;
    },
                preHidden:true,
                content:function(){
        "step 0"
        var next=player.chooseToDiscard('he',get.prompt2('h_ss',trigger.player));
        var check=lib.skill.h_ss.checkx(trigger,player);
        next.set('ai',function(card){
            if(_status.event.goon) return 8-get.value(card);
            return 0;
        });
        next.set('logSkill','h_ss');
        next.set('goon',check);
        next.setHiddenSkill('h_ss');
        "step 1"
        if(result.bool){
            trigger.player.judge();
        }
        else{
            event.finish();
        }
        "step 2"
        switch(result.suit){
            case 'heart':
            
            player.addSkill('h_hongtao')
            trigger.player.gainMaxHp();//获得一点体力上限
            trigger.player.recover();//回复一点体力
            player.recover();
            break;
            case 'diamond':
            
            player.addSkill('h_fangkuai')
            trigger.player.tempHide();//获得潜行技能：无法成为基本牌和锦囊牌的目标
            
            
            break;
            case 'club':
            player.addSkill('h_meihua');
            //trigger.source.chooseToDiscard('he',2,true);
            
            trigger.player.turnOver();
            trigger.player.loseMaxHp();
            trigger.player.addTempSkill('fengyin');
            
            break;
            case 'spade':
            player.addSkill('h_heitao');
            trigger.player.link();
            trigger.player.damage(2,"thunder");
            
            
            
            break;
        }
    },
                ai:{
                    expose:0.3,
                },
                "_priority":0,
            },
            "h_quanbing":{
                audio:"ext:noname-huntersxy:2",
                trigger:{
                    global:"judge",
                },
                filter:function(event,player){
        return player.countCards('hes')>0;
    },
                direct:true,
                content:function(){
        "step 0"
        player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
        get.translation(trigger.player.judging[0])+'，'+get.prompt('guidao'),'hes',function(card){
            //if(get.color(card)!='black') return false;
            var player=_status.event.player;
            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
            if(mod2!='unchanged') return mod2;
            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
            if(mod!='unchanged') return mod;
            return true;
        }).set('ai',function(card){
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            var judging=_status.event.judging;
            var result=trigger.judge(card)-trigger.judge(judging);
            var attitude=get.attitude(player,trigger.player);
            if(attitude==0||result==0) return 0;
            if(attitude>0){
                return result;
            }
            else{
                return -result;
            }
        }).set('judging',trigger.player.judging[0]);
        "step 1"
        if(result.bool){
            player.respond(result.cards,'highlight','guidao','noOrdering');
        }
        else{
            event.finish();
        }
        "step 2"
        if(result.bool){
            player.$gain2(trigger.player.judging[0]);
            player.gain(trigger.player.judging[0]);
            trigger.player.judging[0]=result.cards[0];
            trigger.orderingCards.addArray(result.cards);
            game.log(trigger.player,'的判定牌改为',result.cards[0]);
        }
        "step 3"
        game.delay(2);
    },
                ai:{
                    rejudge:true,
                    tag:{
                        rejudge:1,
                    },
                },
                "_priority":0,
            },
            "h_heitao":{
                trigger:{
                    global:"damageBegin",
                },
                skillAnimation:true,
                animationColor:"water",
                forced:true,
                content:function(){
                
                player.draw();
                player.removeSkill('h_heitao');
                
                },
                "_priority":0,
            },
            "h_hongtao":{
                trigger:{
                    global:"damageBegin",
                },
                skillAnimation:true,
                animationColor:"water",
                forced:true,
                content:function(){
                
                player.draw();
                player.removeSkill('h_hongtao');
                
                
                },
                "_priority":0,
            },
            "h_fangkuai":{
                trigger:{
                    global:"damageBegin",
                },
                skillAnimation:true,
                animationColor:"water",
                forced:true,
                content:function(){
                
                player.draw();
                player.removeSkill('h_fangkuai');
                
                },
                "_priority":0,
            },
            "h_meihua":{
                trigger:{
                    global:"damageBegin",
                },
                skillAnimation:true,
                animationColor:"water",
                forced:true,
                content:function(){
                
                player.draw();
                player.removeSkill('h_meihua');
                
                },
                "_priority":0,
            },
            "深海":{
                audio:"ext:noname-huntersxy:2",
                audioname:["sb_xiaoqiao"],
                mod:{
                    suit:function(card,suit){
            if(suit=='club') return 'diamond';
        },
                },
                trigger:{
                    global:"judge",
                },
                direct:true,
                filter:function(event,player){
        if(event.fixedResult&&event.fixedResult.suit) return event.fixedResult.suit=='heart';
        return get.suit(event.player.judging[0],event.player)=='heart';
    },
                content:function(){
        "step 0"
        var str='深海：'+get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
        get.translation(trigger.player.judging[0])+'，请将其改为一种花色';
        player.chooseControl('spade','heart','diamond','club').set('prompt',str).set('ai',function(){
            var judging=_status.event.judging;
            var trigger=_status.event.getTrigger();
            var res1=trigger.judge(judging);
            var list=lib.suit.slice(0);
            var attitude=get.attitude(player,trigger.player);
            if(attitude==0) return 0;
            var getj=function(suit){
                return trigger.judge({
                    name:get.name(judging),
                    nature:get.nature(judging),
                    suit:suit,
                    number:get.number(judging),
                })
            };
            list.sort(function(a,b){
                return (getj(b)-getj(a))*get.sgn(attitude);
            });
            return list[0];
        }).set('judging',trigger.player.judging[0]);
        "step 1"
        if(result.control!='cancel2'){
            player.addExpose(0.25);
            player.popup(result.control);
            game.log(player,'将判定结果改为了','#y'+get.translation(result.control+2));
            if(!trigger.fixedResult) trigger.fixedResult={};
            trigger.fixedResult.suit=result.control;
            trigger.fixedResult.color=get.color({suit:result.control});
        }
    },
                ai:{
                    rejudge:true,
                    tag:{
                        rejudge:0.4,
                    },
                    expose:0.5,
                },
                "_priority":0,
            },
            "h_xier1":{
                mod:{
                    suit:function(card,suit){
            if(suit=='spade') return 'heart';
        },
                },
                "_priority":0,
            },
            "h_shilv":{
                    trigger:{
                        player:"damageEnd",
                    },
                    locked:true,
                    forced:true,
                    filter:function(event,player){
                        return (event.source);
                    },
                    direct:true,
                    checkx:function(event,player){
                        var att1=get.attitude(player,event.player);
                        var att2=get.attitude(player,event.source);
                        return att1>0&&att2<=0;
                    },
                    logTarget:"source",
                    preHidden:true,
                    content:function(){
                        "step 0"
                        trigger.source.addTempSkill("guicai");
                        trigger.source.addTempSkill("mbzhixi");
                        player.changeHujia();
                        trigger.source.judge();
                        "step 1"
                        switch(result.suit){
                            case 'spade':trigger.source.chooseToDisable();break;
                            case 'heart':trigger.source.addSkill('ranshang');break;
                            case 'diamond':trigger.source.clearSkills();break;
                            case 'club':trigger.source.discard(trigger.source.getCards('he'));break;
                        }
                    },
                    ai:{
                        "maixie_defend":true,
                        effect:{
                            target(card,player,target){
                                if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                                return 0.8;
                            },
                        },
                    },
                    "_priority":0,
                
                
            },
		},
        characterSort:{
            
        },
		translate:{
            
            "h_ss":"死生",
            "h_ss_info":"当场上有角色即将受到来源为牌的伤害时，你可弃一张牌对其进行判定。若判定结果为①黑桃：发动罪罚，其横置，并受到两点雷电伤害。②梅花：发动湮灭，其减少一点体力上限，翻面并且本回合非锁定技失效。③红桃：发动不息，其增加一点体力上限并回复一点体力，你回复一点体力④方块：发动赐福，其他角色无法对其使用牌。判定结束后，你摸一张牌。",
            "h_quanbing":"权柄",
            "h_quanbing_info":"权柄",
            "h_heitao":"罪罚",
            "h_hongtao":"不息",
            "h_meihua":"湮灭",
            "h_fangkuai":"赐福",
            "深海":"深海",
            "深海_info":"锁定技。你的梅花视为方块，你的黑桃视为红桃。当场上有判定结果为红心时，你可以修改该结果的花色。",
            "h_xier1":"h_xier1",
            "h_xier1_info":"",
            "h_shilv":"死律",
            "h_shilv_info":"锁定技，当你受到伤害后，①你获得一点护盾，伤害来源获得技能[鬼才][止息]至本回合结束。②伤害来源进行判定，若结果为黑桃：其选择一个装备栏废除。红桃:其获得技能[燃殇]。梅花:其弃置所有牌。方块:其所有技能被清除。",
		},
	};
});
