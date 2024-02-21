game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: '藿藿',
		connect: true,
		skill: {
			//这里放技能
			"h_quhun": {
				audio: "mingzhe",
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				forced: true,
				filter: function (event, player) {
					if (player.isPhaseUsing()) return false;
					var evt = event.getl(player);
					for (var i of evt.cards2) {
						if (get.color(i, player) == 'red') return true;
					}
					return false;
				},
				content: function () {
					if (!trigger.visible) {
						var cards = trigger.getl(player).hs.filter(function (i) {
							return get.color(i, player) == 'red';
						});
						if (cards.length > 0) player.showCards(cards, get.translation(player) + '发动了【驱魂】');
					}
					player.draw(player.getDamagedHp());
				},
				"_priority": 0,
			},
			"h_weiba": {
				trigger: {
					player: "dying",
				},
				limited: true,
				forced: true,
				charlotte: false,
				unique: true,
				skillAnimation: true,
				animationColor: "water",
				filter: function (event, player) {
					return player.isDamaged();
				},
				check: function (event, player) {
					return player.hp <= 1 || player.getDamagedHp() > 1;
				},
				/* content: function () {
					player.awakenSkill(event.name);
					var num = player.maxHp - player.hp;
					player.recover(num - 1);
					player.draw(num);
					player.init('h_huohuoweiba');

				}, */
				async content(event, trigger, player) {
					player.awakenSkill(event.name);
					var num = player.maxHp - player.hp;
					player.init('h_huohuoweiba');
					player.recover(num - 1);
					player.draw(num);

				},
				mark: true,
				intro: {
					content: "limited",
				},
				init: (player, skill) => player.storage[skill] = false,
				"_priority": 0,
			},

		},

		translate: {
			//这里放描述			
			"h_weiba": "尾巴",
			"h_weiba_info": "觉醒技，濒死时，你将体力值回复至体力上限-1点值并摸等同于回复量的牌，然后将武将牌替换为【霍霍&尾巴大爷】。",
			"h_quhun": "驱魂",
			"h_quhun_info": "锁定技。你于出牌阶段外失去红色牌后，你摸x张牌（x为你已损失的体力）",




		},
	};
});
