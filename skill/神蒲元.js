game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'神蒲元',
		connect:true,
		skill:{
//这里放技能
			"h_baohu":{
	mod:{
		canBeDiscarded:function(card,player,target){
if(player!=target&&get.position(card)=='e'&&target.countCards('e')>=1) return false;
},
	},
	audio:"ext:noname-huntersxy:2",
	trigger:{
		target:"useCardToTargeted",
	},
	forced:true,
	locked:true,
	filter:function(event,player){
if(player==event.player||!player.countCards('e')) return false;
var suit=get.suit(event.card,false);
if(suit=='none') return false;
return player.hasCard(function(card){
return get.suit(card,player)==suit;
},'e');
},
	content:function(){
player.draw();
},
	ai:{
		effect:{
			target:function(card,player,target){
	if(typeof card=='object'&&player!=target){
		var suit=get.suit(card);
		if(suit=='none') return;
		if(player.hasCard(function(card){
			return get.suit(card,player)==suit;
		},'e')) return [1,0.08];
	}
},
		},
	},
	"_priority":0,
			},
			"h_ronghe":{
	enable:"phaseUse",
	filter:function(event,player){
var he=player.getCards('he');
var num=0;
for(var i=0;i<he.length;i++){
var info=lib.card[he[i].name];
{
	num++;
	if(num>=2) return true;
}
}
},
	filterCard:function(card){
if(ui.selected.cards.length&&card.name==ui.selected.cards[0].name) return false;
var info=get.info(card);
return info.type=='equip';
},
	selectCard:2,
	position:"he",
	check:function(card){
return get.value(card);
},
	content:function(){
var name=cards[0].name+'_'+cards[1].name;
var info1=get.info(cards[0]),info2=get.info(cards[1]);
if(!lib.card[name]){
var info={
	enable:true,
	type:'equip',
	subtype:get.subtype(cards[0]),
	vanish:true,
	cardimage:info1.cardimage||cards[0].name,
	filterTarget:function(card,player,target){
		return target==player;
	},
	selectTarget:-1,
	modTarget:true,
	content:lib.element.content.equipCard,
	legend:true,
	source:[cards[0].name,cards[1].name],
	onEquip:[],
	onLose:[],
	skills:[],
	distance:{},
	ai:{
		order:8.9,
		equipValue:10,
		useful:2.5,
		value:function(card,player){
			var value=0;
			var info=get.info(card);
			var current=player.getEquip(info.subtype);
			if(current&&card!=current){
				value=get.value(current,player);
			}
			var equipValue=info.ai.equipValue||info.ai.basic.equipValue;
			if(typeof equipValue=='function') return equipValue(card,player)-value;
			return equipValue-value;
		},
		result:{
			target:function(player,target){
				return get.equipResult(player,target,name);
			}
		}
	}
}
for(var i in info1.distance){
	info.distance[i]=info1.distance[i];
}
for(var i in info2.distance){
	if(typeof info.distance[i]=='number'){
		info.distance[i]+=info2.distance[i];
	}
	else{
		info.distance[i]=info2.distance[i];
	}
}
if(info1.skills){
	info.skills=info.skills.concat(info1.skills);
}
if(info2.skills){
	info.skills=info.skills.concat(info2.skills);
}
if(info1.onEquip){
	if(Array.isArray(info1.onEquip)){
		info.onEquip=info.onEquip.concat(info1.onEquip);
	}
	else{
		info.onEquip.push(info1.onEquip);
	}
}
if(info2.onEquip){
	if(Array.isArray(info2.onEquip)){
		info.onEquip=info.onEquip.concat(info2.onEquip);
	}
	else{
		info.onEquip.push(info2.onEquip);
	}
}
if(info1.onLose){
	if(Array.isArray(info1.onLose)){
		info.onLose=info.onLose.concat(info1.onLose);
	}
	else{
		info.onLose.push(info1.onLose);
	}
}
if(info2.onLose){
	if(Array.isArray(info2.onLose)){
		info.onLose=info.onLose.concat(info2.onLose);
	}
	else{
		info.onLose.push(info2.onLose);
	}
}
if(info.onEquip.length==0) delete info.onEquip;
if(info.onLose.length==0) delete info.onLose;
lib.card[name]=info;
lib.translate[name]=get.translation(cards[0].name,'skill')+get.translation(cards[1].name,'skill');
var str=lib.translate[cards[0].name+'_info'];
if(str[str.length-1]=='.'||str[str.length-1]=='。'){
	str=str.slice(0,str.length-1);
}
lib.translate[name+'_info']=str+'；'+lib.translate[cards[1].name+'_info'];
try{
	game.addVideo('newcard',null,{
		name:name,
		translate:lib.translate[name],
		info:lib.translate[name+'_info'],
		card:cards[0].name,
		legend:true,
	});
}
catch(e){
	console.log(e);
}
}
player.gain(game.createCard({name:name,suit:cards[0].suit,number:cards[0].number}),'gain2');
},
	ai:{
		order:9.5,
		result:{
			player:1,
		},
	},
	"_priority":0,
			},

		},
		translate:{
//这里放描述			
			"h_baohu":"铸圣",
            "h_baohu_info":"锁定技。①当你成为其他角色使用牌的目标时，若你的装备区内有和此牌花色相同的牌，则你摸一张牌。②若你装备区内的牌数大于1，则其他角色不能弃置你装备区内的牌。③你无法成为其他角色普通锦囊牌的目标。④你拥有技能【铸刃】【奇思】",
			"h_ronghe":"融合",
            "h_ronghe_info":"出牌阶段，你可以将两张装备合成一张装备。",





		},
	};
});
