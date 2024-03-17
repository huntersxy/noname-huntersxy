game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'acg',
		connect:true,
		character:{
            "acg_yhgx":["female","xy",3,["acg_zhiji","acg_moulue"],["des:找到你了，刺客先生","die:ext:noname-huntersxy/audio/die/acg_yhgx.mp3","ext:noname-huntersxy/character/acg/樱花观星.jpg"]],
        },
        skill:{
            "acg_zhiji":{
                    audio:"ext:acg_zhiji.mp3",
                    usable:2,
                    enable:["chooseToUse","chooseToRespond"],
                    filter:function(event,player){
                        if(!player.countCards('hse')) return false;
                        for(var i of lib.inpile){
                            var type=get.type2(i);
                            if((type=='basic'||type=='trick')&&event.filterCard({name:i},player,event)) return true;
                        }
                        return false;
                    },
                    chooseButton:{
                        dialog:function(event,player){
                            var list=[];
                            for(var i=0;i<lib.inpile.length;i++){
                                var name=lib.inpile[i];
                                if(name=='sha'){
                                    if(event.filterCard({name:name},player,event)) list.push(['基本','','sha']);
                                    for(var j of lib.inpile_nature){
                                        if(event.filterCard({name:name,nature:j},player,event)) list.push(['基本','','sha',j]);
                                    }
                                }
                                else if(get.type2(name)=='trick'&&event.filterCard({name:name},player,event)) list.push(['锦囊','',name]);
                                else if(get.type(name)=='basic'&&event.filterCard({name:name},player,event)) list.push(['基本','',name]);
                            }
                            return ui.create.dialog('智计',[list,'vcard']);
                        },
                        filter:function(button,player){
                            return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
                        },
                        check:function(button){
                            if(_status.event.getParent().type!='phase') return 1;
                            var player=_status.event.player;
                            if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].includes(button.link[2])) return 0;
                            return player.getUseValue({
                                name:button.link[2],
                                nature:button.link[3],
                            });
                        },
                        backup:function(links,player){
                            return {
                                filterCard:true,
                                audio:"ext:noname-huntersxy/audio/acg_zhiji:2",
                                popname:true,
                                check:function(card){
                                    return 8-get.value(card);
                                },
                                position:'hse',
                                viewAs:{name:links[0][2],nature:links[0][3]},
                                precontent:function(){
                                    player.addTempSkill('spmiewu2');
                                    player.removeMark('spwuku',1);
                                },
                            }
                        },
                    prompt:function(links,player){
                            return '将一张牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用';
                        },
                    },
                    hiddenCard:function(player,name){
                        if(!lib.inpile.includes(name)) return false;
                        var type=get.type2(name);
                        return (type=='basic'||type=='trick')&&player.countMark('spwuku')==0&&player.countCards('she')>0&&!player.hasSkill('spmiewu2');
                    },
                    ai:{
                        combo:"spwuku",
                        fireAttack:true,
                        respondSha:true,
                        respondShan:true,
                        skillTagFilter:function(player){
                            if(!player.countMark('spwuku')||!player.countCards('hse')||player.hasSkill('spmiewu2')) return false;
                        },
                        order:1,
                        result:{
                            player:function(player){
                                if(_status.event.dying) return get.attitude(player,_status.event.dying);
                                return 1;
                            },
                        },
                    },
                    "_priority":0,
                },


               "acg_moulue":{


               } 
            
        },
        characterSort:{
            acg:{
                wwey:["acg_yhgx",],
                
            },
        },
		translate:{
            wwey:"温文尔雅",
            acg_yhgx_prefix:'寻',
            acg_yhgx:"寻观星",
            acg_zhiji:"智计",
            acg_zhiji_info:"每回合限一次，你可以将一张牌当任意基本牌或锦囊牌使用。",
            acg_moulue:"谋略",
            acg_moulue_info:"",
		},
	};
});
