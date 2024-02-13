game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'始源爱莉',
		connect:true,
		skill:{
                //这里放技能
				"h_keyin":{
					audio:"ext:烤箱魔改:2",
					unique:true,
					trigger:{
						player:"damageEnd",
					},
					frequent:true,
					content:function(){
			'step 0'
			event.num=trigger.num;
			'step 1'
			lib.skill.huashen.addHuashens(player,3);
			'step 2'
			if(--event.num>0&&player.hasSkill(event.name)&&!get.is.blocked(event.name,player)){
				player.chooseBool(get.prompt2('xinsheng')).set('frequentSkill',event.name);
			}
			else event.finish();
			'step 3'
			if(result.bool&&player.hasSkill('xinsheng')){
				player.logSkill('xinsheng');
				event.goto(1);
			}
		},
					"_priority":0,
				},
				"h_shiyuan":{
					audio:"huashen2",
					unique:true,
					init:function(player){
			if(!player.storage.huashen){
				player.storage.huashen={
					owned:{}
				};
			}
		},
					intro:{
						content:function(storage,player){
				var str='';
				var list=Object.keys(storage.owned);
				if(list.length){
					str+=get.translation(list[0]);
					for(var i=1;i<list.length;i++){
						str+='、'+get.translation(list[i]);
					}
				}
				var skill=player.storage.huashen.current2;
				if(skill){
					str+='<p>当前技能：'+get.translation(skill);
				}
				return str;
			},
						onunmark:function(storage,player){
				_status.characterlist.addArray(Object.keys(storage.owned));
				storage.owned=[];
			},
						mark:function(dialog,content,player){
				var list=Object.keys(content.owned);
				if(list.length){
					var skill=player.storage.huashen.current2;
					var character=player.storage.huashen.current;
					if(skill&&character){
						dialog.addSmall([[character],(item,type,position,noclick,node)=>lib.skill.rehuashen.$createButton(item,type,position,noclick,node)]);
						dialog.add('<div><div class="skill">【'+get.translation(lib.translate[skill+'_ab']||get.translation(skill).slice(0,2))+'】</div>'+
						'<div>'+get.skillInfoTranslation(skill,player)+'</div></div>');
					}
					if(player.isUnderControl(true)){
						dialog.addSmall([list,(item,type,position,noclick,node)=>lib.skill.rehuashen.$createButton(item,type,position,noclick,node)]);
					}
					else{
						dialog.addText('共有'+get.cnNumber(list.length)+'张“始源”');
					}
				}
				else{
					return '没有始源';
				}
			},
					},
					addHuashen:function(player){
			if(!player.storage.huashen) return;
			if(!_status.characterlist){
				lib.skill.pingjian.initList();
			}
			_status.characterlist.randomSort();
			for(var i=0;i<_status.characterlist.length;i++){
				let name=_status.characterlist[i];
				if(name.indexOf('zuoci')!=-1||name.indexOf('key_')==0||name.indexOf('sp_key_')==0||lib.skill.rehuashen.banned.includes(name)||player.storage.huashen.owned[name]) continue;
				let skills=lib.character[name][3].filter(skill=>{
					const categories=get.skillCategoriesOf(skill);
					return !categories.some(type=>lib.skill.rehuashen.bannedType.includes(type));
				})
				if(skills.length){
					player.storage.huashen.owned[name]=skills;
					_status.characterlist.remove(name);
					return name;
				}
			}
		},
					addHuashens:function(player,num){
			var list=[];
			for(var i=0;i<num;i++){
				var name=lib.skill.huashen.addHuashen(player);
				if(name) list.push(name);
			}
			if(list.length){
				player.syncStorage('huashen');
				player.markSkill('huashen');
				game.log(player,'获得了',get.cnNumber(list.length)+'张','#g始源');
				lib.skill.rehuashen.drawCharacter(player,list);
			}
		},
					trigger:{
						global:"phaseBefore",
						player:["enterGame","phaseBegin","phaseEnd"],
					},
					filter:function(event,player,name){
			if(event.name!='phase') return true;
			if(name=='phaseBefore') return game.phaseNumber==0;
			return !get.is.empty(player.storage.huashen.owned);
		},
					direct:true,
					content:function(){
			'step 0'
			var name=event.triggername;
			if(trigger.name!='phase'||(name=='phaseBefore'&&game.phaseNumber==0)){
				player.logSkill('huashen');
				lib.skill.huashen.addHuashens(player,6);
				event.logged=true;
			}
			var cards=[];
			var skills=[];
			for(var i in player.storage.huashen.owned){
				cards.push(i);
				skills.addArray(player.storage.huashen.owned[i]);
			}
			var cond=event.triggername=='phaseBegin'?'in':'out';
			skills.randomSort();
			skills.sort(function(a,b){
				return get.skillRank(b,cond)-get.skillRank(a,cond);
			});
			if(player.isUnderControl()){
				game.swapPlayerAuto(player);
			}
			var switchToAuto=function(){
				_status.imchoosing=false;
				var skill=skills[0],character;
				for(var i in player.storage.huashen.owned){
					if(player.storage.huashen.owned[i].contains(skill)){
						character=i; break;
					}
				}
				event._result={
					bool:true,
					skill:skill,
					character:character
				};
				if(event.dialog) event.dialog.close();
				if(event.control) event.control.close();
			};
			var chooseButton=function(player,list,forced){
				var event=_status.event;
				player=player||event.player;
				if(!event._result) event._result={};
				var prompt=forced?'始源：选择获得一项技能':get.prompt('huashen');
				var dialog=ui.create.dialog(prompt,[list,(item,type,position,noclick,node)=>lib.skill.rehuashen.$createButton(item,type,position,noclick,node)]);
				event.dialog=dialog;
				event.forceMine=true;
				event.button=null;
				for(var i=0;i<event.dialog.buttons.length;i++){
					event.dialog.buttons[i].classList.add('pointerdiv');
					event.dialog.buttons[i].classList.add('selectable');
				}
				event.dialog.open();
				event.custom.replace.button=function(button){
					if(!event.dialog.contains(button.parentNode)) return;
					if(event.control) event.control.style.opacity=1;
					if(button.classList.contains('selectedx')){
						event.button=null;
						button.classList.remove('selectedx');
						if(event.control){
							event.control.replacex(['cancel2']);
						}
					}
					else{
						if(event.button){
							event.button.classList.remove('selectedx');
						}
						button.classList.add('selectedx');
						event.button=button;
						if(event.control&&button.link){
							event.control.replacex(player.storage.huashen.owned[button.link]);
						}
					}
					game.check();
				}
				event.custom.replace.window=function(){
					if(event.button){
						event.button.classList.remove('selectedx');
						event.button=null;
					}
					event.control.replacex(['cancel2']);
				}
				
				event.switchToAuto=function(){
					var cards=[];
					var skills=[];
					for(var i in player.storage.huashen.owned){
						cards.push(i);
						skills.addArray(player.storage.huashen.owned[i]);
					}
					var cond=event.triggername=='phaseBegin'?'in':'out';
					skills.randomSort();
					skills.sort(function(a,b){
						return get.skillRank(b,cond)-get.skillRank(a,cond);
					});
					_status.imchoosing=false;
					var skill=skills[0],character;
					for(var i in player.storage.huashen.owned){
						if(player.storage.huashen.owned[i].contains(skill)){
							character=i; break;
						}
					}
					event._result={
						bool:true,
						skill:skill,
						character:character
					};
					if(event.dialog) event.dialog.close();
					if(event.control) event.control.close();
				}
				var controls=[];
				event.control=ui.create.control();
				event.control.replacex=function(){
					var args=Array.from(arguments)[0];
					if(args.contains('cancel2')&&forced){
						args.remove('cancel2');
						this.style.opacity='';
					}
					args.push(function(link){
						var result=event._result;
						if(link=='cancel2') result.bool=false;
						else{
							if(!event.button) return;
							result.bool=true;
							result.skill=link;
							result.character=event.button.link;
						}
						event.dialog.close();
						event.control.close();
						game.resume();
						_status.imchoosing=false;
					});
					return this.replace.apply(this,args);
				}
				if(!forced){
					controls.push('cancel2');
					event.control.style.opacity=1;
				}
				event.control.replacex(controls);
				game.pause();
				game.countChoose();
			};
			if(event.isMine()){
				chooseButton(player,cards,event.logged);
			}
			else if(event.isOnline()){
				event.player.send(chooseButton,event.player,cards,event.logged);
				event.player.wait();
				game.pause();
			}
			else{
				switchToAuto();
			}
			'step 1'
			var map=event.result||result;
			if(map.bool){
				if(!event.logged) player.logSkill('huashen');
				var skill=map.skill,character=map.character;
				if(character!=player.storage.huashen.current){
					const old=player.storage.huashen.current;
					player.storage.huashen.current=character;
					player.markSkill('huashen');
					game.broadcastAll(function(player,character,old){
						player.tempname.remove(old);
						player.tempname.add(character);
						player.sex=lib.character[character][0];
						//player.group=lib.character[character][1];
						//player.node.name.dataset.nature=get.groupnature(player.group);
						var mark=player.marks.huashen;
						if(mark){
							mark.style.transition='all 0.3s';
							setTimeout(function(){
								mark.style.transition='all 0s';
								ui.refresh(mark);
								mark.setBackground(character,'character');
								if(mark.firstChild){
									mark.firstChild.remove();
								}
								setTimeout(function(){
									mark.style.transition='';
									mark.show();
								},50);
							},200);
						}
					},player,character,old);
					game.log(player,'将性别变为了','#y'+get.translation(lib.character[character][0])+'性');
					player.changeGroup(lib.character[character][1]);
				}
				player.storage.huashen.current2=skill;
				if(!player.additionalSkills.huashen||!player.additionalSkills.huashen.contains(skill)){
					player.addAdditionalSkill('huashen',skill);
					player.flashAvatar('huashen',character);
					game.log(player,'获得了技能','#g【'+get.translation(skill)+'】');
					player.popup(skill);
					player.syncStorage('huashen');
					player.updateMarks('huashen');
					// lib.skill.rehuashen.createAudio(character,skill,'zuoci');
				}
			}
		},
					"_priority":0,
				},
				"h_renlu":{
					skillAnimation:true,
					animationColor:"wood",
					audio:"ext:烤箱魔改:2",
					juexingji:true,
					derivation:["h_keyin"],
					unique:true,
					trigger:{
						player:"phaseZhunbeiBegin",
					},
					filter:function(event,player){
			return player.hp<=2;
		},
					forced:true,
					content:function(){
			player.addSkill('h_keyin');
			game.log(player,'获得了技能','#g【刻印】')
			player.awakenSkill(event.name);
			player.storage[event.name]=true;
		},
					ai:{
						threaten:function(player,target){
				if(target.hp==1) return 2;
				return 0.5;
			},
						maixie:true,
						effect:{
							target:function(card,player,target){
					if(!target.hasFriend()) return;
					if(get.tag(card,'damage')==1&&target.hp==2&&!target.isTurnedOver()&&
					_status.currentPhase!=target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [0.5,1];
				},
						},
					},
					"_priority":0,
				},
				"h_keyin":{
                audio:"ext:烤箱魔改:2",
                unique:true,
                trigger:{
                    player:"damageEnd",
                },
                frequent:true,
                content:function(){
        'step 0'
        event.num=trigger.num;
        'step 1'
        lib.skill.huashen.addHuashens(player,3);
        'step 2'
        if(--event.num>0&&player.hasSkill(event.name)&&!get.is.blocked(event.name,player)){
            player.chooseBool(get.prompt2('xinsheng')).set('frequentSkill',event.name);
        }
        else event.finish();
        'step 3'
        if(result.bool&&player.hasSkill('xinsheng')){
            player.logSkill('xinsheng');
            event.goto(1);
        }
    },
                "_priority":0,
            },

		},
		translate:{
                //这里放描述			
				"h_shiyuan":"始源",
				"h_shiyuan_info":"①游戏开始时，你随机将武将牌堆中的六张牌扣置于武将牌上（均称为“始源牌”），选择并亮出一张“始源牌”并声明该武将牌上的一个技能，你拥有该技能且同时将性别和势力属性变成与该武将相同直到该始源被替换（你不可声明限定技、觉醒技、隐匿技、使命技、主公技等特殊技能）。②回合开始时或回合结束时，你重新可以选择一张“始源牌”并声明该武将牌上的一个技能。",
				"h_renlu":"人律",
				"h_renlu_info":"觉醒技，准备阶段，若你的体力值小于2，则获得技能〖刻印〗。",
				"h_keyin":"刻印",
				"h_keyin_info":"当你受到伤害后，你获得3个始源牌",



		},
	};
});
