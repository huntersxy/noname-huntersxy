game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: '格蕾修',
		connect: true,
		skill: {
			//这里放技能
			"h_linmu": {
				audio: "ext:noname-huntersxy:2",
				locked: true,
				enable: "chooseToRespond",
				usable: 5,
				filter: function (event, player) {
					return !player.hasSkill('haruka_kanata');
				},
				chooseButton: {
					dialog: function (event, player) {
						var list = [];
						for (var i = 0; i < lib.inpile.length; i++) {
							var name = lib.inpile[i];
							if (name == 'boss_mengpohuihun') continue;
							if (name == 'sha') {
								list.push(['基本', '', 'sha']);
								for (var j of lib.inpile_nature) list.push(['基本', '', name, j]);
							}
							else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
							else if (get.type(name) == 'basic') list.push(['基本', '', name]);
						}
						return ui.create.dialog('绘世', [list, 'vcard']);
					},
					filter: function (button, player) {
						return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
					},
					check: function (button) {
						var player = _status.event.player;
						if (player.countCards('h', button.link[2]) > 0) return 0;
						if (['wugu', 'zhulu_card'].contains(button.link[2])) return 0;
						var effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup: function (links, player) {
						return {
							audio: 'h_huishi',
							filterCard: function () { return false },
							selectCard: -1,
							popname: true,
							check: function (card) {
								return 6 - get.value(card);
							},
							position: 'he',
							viewAs: { name: links[0][2], nature: links[0][3], isCard: true },
						}
					},
					prompt: function (links, player) {
						return '请选择' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '的目标';
					},
				},
				ai: {
					order: 1,
					result: {
						player: function (player) {
							var cards = player.getCards('he').sort(function (a, b) {
								return get.value(a) - get.value(b);
							});
							var num = (player.getStat('skill').h_huishi || 0) + 1;
							if (player.needsToDiscard() >= num) return 1;
							if (player.hp > 2) return 1;
							if (cards.length >= num) {
								var val = 0;
								for (var i = 0; i < cards.length; i++) {
									val += get.value(cards[i]);
								}
								return 12 - val;
							}
							return 0;
						},
					},
					fireAttack: true,
				},
				"_priority": 0,
			},
			"h_huishi": {
				audio: "ext:noname-huntersxy:2",
				enable: "chooseToUse",
				usable: 1,
				filter: function (event, player) {
					return !player.hasSkill('haruka_kanata');
				},
				chooseButton: {
					dialog: function (event, player) {
						var list = [];
						for (var i = 0; i < lib.inpile.length; i++) {
							var name = lib.inpile[i];
							if (name == 'boss_mengpohuihun') continue;
							if (name == 'sha') {
								list.push(['基本', '', 'sha']);
								for (var j of lib.inpile_nature) list.push(['基本', '', name, j]);
							}
							else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
							else if (get.type(name) == 'basic') list.push(['基本', '', name]);
						}
						return ui.create.dialog('绘世', [list, 'vcard']);
					},
					filter: function (button, player) {
						return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
					},
					check: function (button) {
						var player = _status.event.player;
						if (player.countCards('h', button.link[2]) > 0) return 0;
						if (['wugu', 'zhulu_card'].contains(button.link[2])) return 0;
						var effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup: function (links, player) {
						return {
							audio: 'h_huishi',
							filterCard: function () { return false },
							selectCard: -1,
							popname: true,
							check: function (card) {
								return 6 - get.value(card);
							},
							position: 'he',
							viewAs: { name: links[0][2], nature: links[0][3], isCard: true },
						}
					},
					prompt: function (links, player) {
						return '请选择' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '的目标';
					},
				},
				ai: {
					order: 1,
					result: {
						player: function (player) {
							var cards = player.getCards('he').sort(function (a, b) {
								return get.value(a) - get.value(b);
							});
							var num = (player.getStat('skill').h_huishi || 0) + 1;
							if (player.needsToDiscard() >= num) return 1;
							if (player.hp > 2) return 1;
							if (cards.length >= num) {
								var val = 0;
								for (var i = 0; i < cards.length; i++) {
									val += get.value(cards[i]);
								}
								return 12 - val;
							}
							return 0;
						},
					},
					fireAttack: true,
				},
				"_priority": 0,
			},
			"h_huishi_limit": {
				trigger: {
					player: "useCardAfter",
				},
				forced: true,
				filter: function (event, player) {
					return event.skill == 'h_huishi_backup';
				},
				content: function () {
					'step 0'
					var num = 2;
					player.chooseToDiscard('###绘世：请选择一项###选择弃置' + get.cnNumber(num) + '张牌，或失去1点体力且令〖绘世〗失效至回合结束', num, 'he').set('ai', function (card) {
						var total = 12;
						for (var i = 0; i < ui.selected.cards.length; i++) {
							total -= get.value(ui.selected.cards[i]);
						}
						return total - get.value(card);
					});
					'step 1'
					if (!result.bool) {
						player.addTempSkill('haruka_kanata');
						player.loseHp();
					}
				},
				"_priority": 0,
			},
			"h_zhanyan": {
				audio: "ext:noname-huntersxy:2",
				trigger: {
					player: ["loseAfter", "changeHp", "gainMaxHpAfter", "loseMaxHpAfter"],
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				frequent: true,
				filter: function (event, player) {
					if (event.getl && !event.getl(player)) return false;
					return player.countCards('h') < player.getDamagedHp();
				},
				content: function () {
					player.draw(player.getDamagedHp() - player.countCards('h'));
				},
				ai: {
					noh: true,
					skillTagFilter: function (player, tag) {
						if (tag == 'noh' && player.maxHp - player.hp < player.countCards('h')) {
							return false;
						}
					},
				},
				"_priority": 0,
			},

		},
		translate: {
			//这里放描述			
			"h_huishi": "绘世",
			"h_huishi_info": "每回合限一次，你可以视为使用任意基本牌或普通锦囊牌。",
			"h_huishi_limit": "画笔",
			"h_huishi_limit_info": "绘世限制技",
			"h_zhanyan": "蘸颜",
			"h_zhanyan_info": "当你的手牌数小于X时，你可以将手牌摸至X张（X为你已损失的体力值）。",
			"h_linmu": "临摹",
			"h_linmu_info": "每回合限五次，你可以视为响应任意基本牌或普通锦囊牌。",




		},
	};
});
