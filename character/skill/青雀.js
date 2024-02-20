game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: '青雀',
		connect: true,
		skill: {
			//这里放技能
			"h_dugou": {
				trigger: {
					player: "useCardAfter",
				},
				forced: true,
				filter(event, player) {
					if (event.parent.name == 'h_dugou') return false;
					if (event.card == event.cards[0]) {
						var type = get.type(event.card, 'trick');
						var names = [];
						if (get.cardPile(function (card) {
							if (get.type(card, 'trick') != type) return false;
							if (get.info(card).multitarget) return false;
							if (names.includes(card.name)) return false;
							if (player.hasUseTarget(card)) {
								return true;
							}
							else {
								names.add(card.name);
								return false;
							}
						})) {
							return true;
						}
					}
					return true;
				},
				content() {
					var type = get.type(trigger.card, 'trick');
					var names = [];
					var card = get.cardPile(function (card) {
						if (get.type(card, 'trick') != type) return false;
						if (get.info(card).multitarget) return false;
						if (names.includes(card.name)) return false;
						if (player.hasUseTarget(card)) {
							return true;
						}
						else {
							names.add(card.name);
							return false;
						}
					});
					if (card) {
						var info = get.info(card);
						var targets = game.filterPlayer(function (current) {
							return lib.filter.filterTarget(card, player, current);
						});
						if (targets.length) {
							targets.sort(lib.sort.seat);
							var select = get.select(info.selectTarget);
							if (select[0] == -1 || select[1] == -1) {
								player.useCard(card, targets, 'noai');
							}
							else if (targets.length >= select[0]) {
								var num = select[0] + Math.floor(Math.random() * (select[1] - select[0] + 1));
								player.useCard(card, targets.randomGets(num), 'noai');
							}
						}
					}
				},
				"_priority": 0,
			},

		},
		translate: {
			//这里放描述			
			"h_dugou": "赌狗",
			"h_dugou_info": "当你使用牌时，你随机对一个目标使用一张同类型牌",





		},
	};
});
