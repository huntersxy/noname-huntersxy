game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'裴秀马良',
		connect:true,
		skill:{
                //这里放技能
				"h_zhishu":{
					audio:"ext:烤箱魔改:2",
					locked:true,
					subSkill:{
						discard:{
							trigger:{
								global:"phaseEnd",
							},
							audio:"zishu",
							forced:true,
							filter:function(event,player){
					if(_status.currentPhase!=player){
						var he=player.getCards('h');
						var bool=false;
						player.getHistory('gain',function(evt){
							if(!bool&&evt&&evt.cards){
								for(var i=0;i<evt.cards.length;i++){
									if(he.contains(evt.cards[i])) bool=true;break;
								}
							}
						});
						return bool;
					}
					return false;
				},
							content:function(){
					var he=player.getCards('h');
					var list=[];
					player.getHistory('gain',function(evt){
						if(evt&&evt.cards){
							for(var i=0;i<evt.cards.length;i++){
								if(he.contains(evt.cards[i])) list.add(evt.cards[i]);
							}
						}
					});
					player.$throw(list,1000);
					player.lose(list,ui.discardPile,'visible');
					game.log(player,'将',list,'置入弃牌堆');
				},
							sub:true,
							"_priority":0,
						},
						mark:{
							trigger:{
								player:"gainBegin",
								global:"phaseBeginStart",
							},
							silent:true,
							filter:function(event,player){
					return event.name!='gain'||player!=_status.currentPhase;
				},
							content:function(){
					if(trigger.name=='gain') trigger.gaintag.add('zishu');
					else player.removeGaintag('zishu');
				},
							sub:true,
							forced:true,
							popup:false,
							"_priority":1,
						},
						draw:{
							trigger:{
								player:"gainAfter",
								global:"loseAsyncAfter",
							},
							audio:"zishu",
							forced:true,
							filter:function(event,player){
					if(_status.currentPhase!=player||event.getg(player).length==0) return false;
					return event.getParent(2).name!='zishu_draw';
				},
							content:function(){
					player.draw('nodelay');
				},
							sub:true,
							"_priority":0,
						},
					},
					ai:{
						threaten:1.2,
						nogain:1,
						skillTagFilter:function(player){
				return player!=_status.currentPhase;
			},
					},
					group:["zishu_draw","zishu_mark"],
					"_priority":0,
				},
				"h_yushu":{
					trigger:{
						player:"useCard",
					},
					filter:function(event,player){
			var evt=lib.skill.dcjianying.getLastUsed(player,event);
			if(!evt||!evt.card) return false;
			var num1=get.number(event.card),num2=get.number(evt.card);
			return typeof num1=='number'&&typeof num2=='number'&&num2%num1==0;
		},
					forced:true,
					content:function(){
			player.draw();
		},
					mod:{
						cardUsable:function(card,player){
				if(typeof card=='object'){
					var evt=lib.skill.dcjianying.getLastUsed(player);
					if(!evt||!evt.card) return;
					var num1=get.number(card),num2=get.number(evt.card);
					if(typeof num1=='number'&&typeof num2=='number'&&num1%num2==0) return Infinity;
				}
			},
						aiOrder:function(player,card,num){
				if(typeof card=='object'){
					var evt=lib.skill.dcjianying.getLastUsed(player);
					if(!evt||!evt.card) return;
					var num1=get.number(card),num2=num2=get.number(evt.card);
					if(typeof num1=='number'&&typeof num2=='number'&&num2%num1==0) return num+5;
				}
			},
					},
					init:function(player){
			player.addSkill('xingtu_mark');
			var history=player.getAllHistory('useCard');
			if(history.length){
				var trigger=history[history.length-1],num=get.number(trigger.card);
				player.storage.xingtu_mark=num;
				player[typeof num!='number'?'unmarkSkill':'markSkill']('xingtu_mark');
			}
		},
					onremove:function(player){
			player.removeSkill('xingtu_mark');
			player.removeGaintag('xingtu1');
			player.removeGaintag('xingtu2');
			delete player.storage.xingtu_mark;
		},
					subSkill:{
						mark:{
							charlotte:true,
							trigger:{
								player:["useCard1","gainAfter"],
								global:"loseAsyncAfter",
							},
							filter:function(event,player,name){
					if(!player.countCards('h')) return false;
					return name=='useCard1'||event.getg(player).length;
				},
							direct:true,
							firstDo:true,
							content:function(){
					'step 0'
					player.removeGaintag('xingtu1');
					player.removeGaintag('xingtu2');
					if(event.triggername=='useCard1'){
						var num=get.number(trigger.card,player);
						player.storage.xingtu_mark=num;
						player[typeof num!='number'?'unmarkSkill':'markSkill']('xingtu_mark');
						if(typeof num!='number') event.finish();
					}
					'step 1'
					var cards1=[],cards2=[],num=player.storage.xingtu_mark;
					player.getCards('h').forEach(card=>{
						var numx=get.number(card,player);
						if(typeof numx=='number'){
							if(numx%num==0) cards1.push(card);
							if(num%numx==0) cards2.push(card);
						}
					});
					player.addGaintag(cards1,'xingtu1');
					player.addGaintag(cards2,'xingtu2');
				},
							intro:{
								content:"上一张牌的点数：#",
							},
							sub:true,
							"_priority":0,
						},
					},
					"_priority":0,
					"audioname2":{
						"old_yuanshu":"weidi",
					},
				},

		},
		translate:{
                //这里放描述			
				"h_zhishu":"自书",
				"h_zhishu_info":"锁定技，当你于回合内不因〖自书〗而得到牌后，你摸一张牌。",
				"h_yushu":"御数",
				"h_yushu_info":"锁定技。你使用点数为X的倍数的牌无次数限制，你使用点数为X的约数的牌时摸一张牌（X为你本局游戏使用的上一张牌的点数）。",





		},
	};
});
