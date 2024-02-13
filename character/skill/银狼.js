game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'银狼',
		connect:true,
		skill:{
                //这里放技能
				"h_stop":{
					audio:"ext:noname-huntersxy:2",
					usable:5,
					trigger:{
						global:"judgeFixing",
					},
					filter:function(event,player){
			return event.result&&event.result.suit=='spade'||'club'||'diamond'||'spade'||'heart';
		},
					check:function(event,player){
			return event.result.judge*get.attitude(player,event.player)<=0;
		},
					content:function(){
			'step 0'
			var evt=trigger.getParent();
			if(evt.name=='phaseJudge') evt.excluded=true;
			else{
				evt.finish();
				evt._triggered=null;
				if(evt.name.startsWith('pre_')){
					var evtx=evt.getParent();
					evtx.finish();
					evtx._triggered=null;
				}
				var nexts=trigger.next.slice();
				for(var next of nexts){
					if(next.name=='judgeCallback') trigger.next.remove(next);
				}
				var evts=game.getGlobalHistory('cardMove',function(evt){
					return evt.getParent(2)==trigger.getParent();
				});
				var cards=[];
				for(var i=evts.length-1;i>=0;i--){
					var evt=evts[i];
					for(var card of evt.cards){
						if(get.position(card,true)=='o') cards.push(card);
					}
				}
				trigger.orderingCards.addArray(cards);
			}
			var list=[];
			if(get.position(trigger.result.card)=='d') list.push(0);
			if(trigger.player.isIn()&&player.canUse({name:'sha',nature:'fire',isCard:true},trigger.player,false)) list.push(1);
			if(list.length==2) player.chooseControl().set('choiceList',[
				'获得'+get.translation(trigger.result.card),
				'视为对'+get.translation(trigger.player)+'使用一张火【杀】',
			]).set('choice',(get.effect(trigger.player,{name:'sha'},player,player)>0)?1:0);
			else if(list.length==1) event._result={index:list[0]};
			else event.finish();
			'step 1'
			if(result.index==0) player.gain(trigger.result.card,'gain2');
			else player.useCard({name:'sha',nature:'fire',isCard:true},trigger.player,false)
		},
					"_priority":0,
				},
				"h_zhuru":{
					audio:"ext:noname-huntersxy:2",
					enable:"phaseUse",
					usable:1,
					filterTarget:function(card,player,target){
			return target!=player;
		},
					content:function(){
			var skills=target.getSkills(null,false,false).filter(function(i){
				if(i=='bazhen') return;
				var info=get.info(i);
				return info&&!get.is.locked(i)&&!info.limited&&!info.juexingji&&!info.zhuSkill&&!info.charlotte;
			});
			target.addAdditionalSkill('dcjiezhen_blocker','bazhen');
			target.addSkill('dcjiezhen_blocker');
			target.markAuto('dcjiezhen_blocker',skills);
			player.addSkill('dcjiezhen_clear');
			player.markAuto('dcjiezhen_clear',[target]);
		},
					ai:{
						order:1,
						result:{
							target:function(player,target){
					var skills=target.getSkills(null,false,false).filter(function(i){
						if(i=='bazhen') return;
						var info=get.info(i);
						return info&&!get.is.locked(i)&&!info.limited&&!info.juexingji&&!info.zhuSkill&&!info.charlotte;
					});
					if(!skills.length&&target.hasEmptySlot(2)) return 1;
					return -0.5*skills.length;
				},
						},
					},
					subSkill:{
						blocker:{
							init:function(player,skill){
					player.addSkillBlocker(skill);
				},
							onremove:function(player,skill){
					player.removeSkillBlocker(skill);
					player.removeAdditionalSkill(skill);
					delete player.storage.dcjiezhen_blocker;
				},
							charlotte:true,
							locked:true,
							skillBlocker:function(skill,player){
					return skill!='bazhen'&&skill!='dcjiezhen_blocker'&&!lib.skill[skill].charlotte&&player.getStorage('dcjiezhen_blocker').contains(skill);
				},
							mark:true,
							marktext:"阵",
							intro:{
								content:function(storage,player,skill){
						if(storage.length) return '失效技能：'+get.translation(storage);
						return '无失效技能';
					},
							},
							sub:true,
							"_priority":0,
						},
						clear:{
							audio:"dcjiezhen",
							charlotte:true,
							trigger:{
								global:["judgeAfter","die"],
								player:"phaseBegin",
							},
							forced:true,
							forceDie:true,
							onremove:true,
							filter:function(event,player){
					if(event.name=='die'){
						return player==event.player||player.getStorage('dcjiezhen_clear').contains(event.player);
					}
					else if(event.name=='judge'){
						return event.skill=='bagua'&&player.getStorage('dcjiezhen_clear').contains(event.player);
					}
					return player.getStorage('dcjiezhen_clear').length>0;
				},
							logTarget:function(event,player){
					if(event.name!='phase') return event.player;
					return player.getStorage('dcjiezhen_clear');
				},
							content:function(){
					'step 0'
					var targets=player.getStorage('dcjiezhen_clear');
					if(trigger.name=='die'&&player==trigger.player){
						for(var target of targets){
							target.removeSkill('dcjiezhen_blocker');
						}
						player.removeSkill('dcjiezhen_clear');
						event.finish();
						return;
					}
					if(trigger.name=='phase') event.targets=targets.slice(0).sortBySeat();
					else event.targets=[trigger.player];
					'step 1'
					var target=targets.shift();
					var storage=player.getStorage('dcjiezhen_clear');
					if(storage.contains(target)){
						storage.remove(target);
						target.removeSkill('dcjiezhen_blocker');
						if(target.isIn()&&target.countGainableCards(player,'hej')>0) player.gainPlayerCard(target,'hej',true);
					}
					if(targets.length>0){
						event.redo();
					}
					else{
						player.removeSkill('dcjiezhen_clear');
					}
				},
							sub:true,
							"_priority":0,
						},
					},
					derivation:"bazhen",
					"_priority":0,
				},
				"h_download":{
					trigger:{
						player:"phaseJieshuBegin",
					},
					frequent:true,
					filter:function(event,player){
			return player.countCards('h')<player.maxHp;
		},
					content:function(){
			player.drawTo(player.maxHp);
		},
					"_priority":0,
				},

		},
		translate:{
                //这里放描述			
				"h_stop":"断点",
				"h_stop_info":"每回合限五次，一名角色的判定结果确定时，若结果有花色，则你可以终止导致此判定发生的上级事件。然后选择一项：①获得判定牌对应的实体牌。②视为对判定角色使用一张火【杀】（无距离和次数限制）。",
				"h_zhuru":"注入",
				"h_zhuru_info":"出牌阶段限一次，你可选择一名其他角色。该角色获得〖八阵〗，且其所有不为{锁定技、限定技、觉醒技、主公技、带有Charlotte标签}的技能失效。你的下回合开始时，或其因〖八卦阵〗发起的判定结算结束后，你令其恢复其以此法失效的所有技能并失去以此法获得的〖八阵〗，然后获得其区域内的一张牌。",
				"h_download":"下载",
				"h_download_info":"结束阶段开始时，你将手牌补至体力上限。",





		},
	};
});
