game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: '名字',
		connect: true,
		skill: {
			//这里放技能
			"h_shenlin": {
				trigger: {
					player: "useCard",
				},
				forced: true,
				filter: function (event, player) {
					return event.card;
				},
				content: function () {
					trigger.directHit.addArray(game.players);
				},
				ai: {
					"directHit_ai": true,
				},
				"_priority": 0,
			},
			"h_mosha": {
				audio: "ext:noname-huntersxy:2",
				trigger: {
					source: "damageBegin2",
				},
				usable: 8,
				check: function (event, player) {
					var att = get.attitude(player, event.player);
					if (event.player.hp == event.player.maxHp) return att < 0;
					if (event.player.hp == event.player.maxHp - 1 &&
						(event.player.maxHp <= 3 || event.player.hasSkillTag('maixie'))) return att < 0;
					return att > 0;
				},
				filter: function (event, player) {
					return event.card
						//&&event.card.name=='sha'&&get.distance(player,event.player)<=1
						;
				},
				logTarget: "player",
				content: function () {
					'step 0'
					player.judge(function (card) {
						return get.suit(card) != 'heart' ? 1 : -1;
					}).judge2 = function (result) {
						return result.bool;
					};
					'step 1'
					if (result.bool) {
						trigger.player.loseMaxHp(1);
						trigger.player.loseMaxHp(true);
					}
				},
				"_priority": 0,
			},

		},
		translate: {
			//这里放描述			
			"h_mosha": "抹杀",
			"h_mosha_info": "每回合限八次，当你对角色造成伤害时，你可以进行一次判定，若判定结果不为红桃，你令其减2点体力上限。",
			"h_shenlin": "神临",
			"h_shenlin_info": "锁定技，你的牌无法被响应",





		},
	};
});
