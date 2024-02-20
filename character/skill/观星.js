game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: '观星',
		connect: true,
		skill: {
			//这里放技能
			"h_juxin": {
				//魂姿
				skillAnimation:true,
				animationColor:"wood",
				audio:2,
				juexingji:true,
				derivation:["guose"],
				unique:true,
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				filter:function(event,player){
					return player.hp<=2&&!player.storage.hunzi;
				},
				forced:true,
				content:function(){
					player.awakenSkill(event.name);
					//player.loseMaxHp();
					player.addSkills(['guose']);
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==2) return 2;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(!target.hasFriend()) return;
							if(target.hp===3&&get.tag(card,'damage')==1&&!target.isTurnedOver()&&
							_status.currentPhase!==target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [0.5,1];
							if(target.hp===2&&get.tag(card,'recover')&&!target.isTurnedOver()&&
							_status.currentPhase!==target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [1,-3];
						},
					},
				},
				"_priority":0,
			},
			"h_guanxin": {
				//观星
				audio:2,
				//audioname:["jiangwei","re_jiangwei","re_zhugeliang","ol_jiangwei"],
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				frequent:true,
				preHidden:true,
				async content(event,trigger,player){
					const num=player.hasSkill('yizhi')&&player.hasSkill('guanxing')?10:Math.min(10,11);//修改处
					const cards=get.cards(num);
					game.cardsGotoOrdering(cards);
					const next=player.chooseToMove();
					next.set('list',[
						['牌堆顶',cards],
						['牌堆底'],
					]);
					next.set('prompt','观星：点击将牌移动到牌堆顶或牌堆底');
					next.processAI=list=>{
						const cards=list[0][1],player=_status.event.player;
						const top=[];
						const judges=player.getCards('j');
						let stopped=false;
						if(!player.hasWuxie()){
							for(let i=0;i<judges.length;i++){
								const judge=get.judge(judges[i]);
								cards.sort((a,b)=>judge(b)-judge(a));
								if(judge(cards[0])<0){
									stopped=true;break;
								}
								else{
									top.unshift(cards.shift());
								}
							}
						}
						let bottom;
						if(!stopped){
							cards.sort((a,b)=>get.value(b,player)-get.value(a,player));
							while(cards.length){
								if(get.value(cards[0],player)<=5) break;
								top.unshift(cards.shift());
							}
						}
						bottom=cards;
						return [top,bottom];
					}
					const {result:{moved}}=await next;
					const top=moved[0];
					const bottom=moved[1];
					top.reverse();
					game.cardsGotoPile(
						top.concat(bottom),
						['top_cards',top],
						(event,card)=>{
							if(event.top_cards.includes(card)) return ui.cardPile.firstChild;
							return null;
						}
					);
					player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
					game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
					game.asyncDelayx();
				},
				ai:{
					threaten:1.2,
				},
				"_priority":0,
			},
			"h_xinqi": {
				//英姿
				//audio:2,
				//audioname:["sp_lvmeng"],
				trigger:{
					player:"phaseDrawBegin2",
				},
				frequent:true,
				filter(event,player){
					return !event.numFixed;
				},
				async content(event,trigger,player){
					trigger.num = 5;//修改处
				},
				ai:{
					threaten:1.3,
				},
				"_priority":0,
			},

		},
		translate: {
			//这里放描述			
			"h_guanxin": "观星",
			"h_guanxin_info": "准备阶段，你可以观看牌堆顶的10张牌，并将其以任意顺序置于牌堆项或牌堆底。",
			"h_xinqi": "星棋",
			"h_xinqi_info": "摸牌阶段，你可以多摸三张牌。",
			"h_juxin": "聚星",
			"h_juxin_info": "觉醒技，准备阶段，若你的体力值小于2，则你获得技能〖国色〗。",





		},
	};
});
