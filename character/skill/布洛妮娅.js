game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: '布洛妮娅',
		connect: true,
		skill: {
			//这里放技能
			"h_yuanji": {
				//马术
				mod: {
					globalFrom(from, to, distance) {
						return distance - 1;
					},
				},
				"_priority": 0,
			},
			"h_sushe": {
				//乱击
				enable: "phaseUse",
				position: "hs",
				viewAs: {
					name: "wanjian",
				},
				filterCard: function (card, player) {
					if (ui.selected.cards.length) {
						return get.suit(card) == get.suit(ui.selected.cards[0]);
					}
					var cards = player.getCards('hs');
					for (var i = 0; i < cards.length; i++) {
						if (card != cards[i]) {
							if (get.suit(card) == get.suit(cards[i])) return true;
						}
					}
					return false;
				},
				selectCard: 1,
				complexCard: true,
				check: function (card) {
					var player = _status.event.player;
					var targets = game.filterPlayer(function (current) {
						return player.canUse('wanjian', current);
					});
					var num = 0;
					for (var i = 0; i < targets.length; i++) {
						var eff = get.sgn(get.effect(targets[i], { name: 'wanjian' }, player, player));
						if (targets[i].hp == 1) {
							eff *= 1.5;
						}
						num += eff;
					}
					if (!player.needsToDiscard(-1)) {
						if (targets.length >= 7) {
							if (num < 2) return 0;
						}
						else if (targets.length >= 5) {
							if (num < 1.5) return 0;
						}
					}
					return 6 - get.value(card);
				},
				ai: {
					basic: {
						order: 8.5,
						useful: 1,
						value: 5,
					},
					wuxie: function (target, card, player, viewer) {
						if (get.attitude(viewer, target) > 0 && target.countCards('h', 'shan')) {
							if (!target.countCards('h') || target.hp == 1 || Math.random() < 0.7) return 0;
						}
					},
					result: {
						"target_use": function (player, target) {
							if (player.hasUnknown(2) && get.mode() != 'guozhan') return 0;
							var nh = target.countCards('h');
							if (get.mode() == 'identity') {
								if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
							}
							if (nh == 0) return -2;
							if (nh == 1) return -1.7
							return -1.5;
						},
						target: function (player, target) {
							var nh = target.countCards('h');
							if (get.mode() == 'identity') {
								if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
							}
							if (nh == 0) return -2;
							if (nh == 1) return -1.7
							return -1.5;
						},
						player: function (player, target) {
							if (player._wanjian_temp || player.hasSkillTag('jueqing', false, target)) return 0;
							player._wanjian_temp = true;
							let eff = get.effect(target, new lib.element.VCard({ name: 'wanjian' }), player, target);
							delete player._wanjian_temp;
							if (eff >= 0) return 0;
							if (target.hp > 2 || target.hp > 1 && !target.isZhu && target != game.boss && target != game.trueZhu && target != game.falseZhu) return 0;
							if (target.hp > 1 && target.hasSkillTag('respondShan', true, 'respond', true)) return 0;
							if (player.hasSkillTag('viewHandcard', null, target, true) && (target.hasCard(function (card) {
								let name = get.name(card, target);
								return (name == 'shan' || name == 'hufu') && lib.filter.cardRespondable(card, target);
							}, 'h') || target.hasCard(function (card) {
								return get.name(card) == 'wuxie' && lib.filter.cardEnabled(card, target, 'forceEnable');
							}, 'h'))) return 0;
							if (target.hp > 1 && target.countCards('hs') > 1.67 + 2 * Math.random()) return 0;
							let res = 0, att = get.sgn(get.attitude(player, target));
							res -= att * (0.8 * target.countCards('hs') + 0.6 * target.countCards('e') + 3.6);
							if (get.mode() == 'identity' && target.identity == 'fan') res += 2.4;
							if (get.mode() == 'guozhan' && player.identity != 'ye' && player.identity == target.identity || get.mode() == 'identity' && player.identity == 'zhu' && (target.identity == 'zhong' || target.identity == 'mingzhong')) res -= 0.8 * player.countCards('he');
							return res;
						},
					},
					tag: {
						respond: 1,
						respondShan: 1,
						damage: 1,
						multitarget: 1,
						multineg: 1,
					},
				},
				"_priority": 0,
			},

		},
		translate: {
			//这里放描述			
			"h_yuanji": "真理",
			"h_yuanji_info": "锁定技，你计算与其他角色的距离时-5。",
			"h_sushe": "创构",
			"h_sushe_info": "出牌阶段，若你的手牌中有花色相同的牌，则你可以将一张当着［万箭齐发］打出",
		},
	};
});
