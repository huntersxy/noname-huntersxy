game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: 'cvhanser',
		connect: true,
		skill: {
			//这里放技能
			"h_fc": {
				name: "bjdushu",
				audio: "ext:noname-huntersxy/audio/:2",
				forced: true,
				charlotte: true,
				superCharlotte: true,
				priority: 3,
				trigger: {
					player: ["damageEnd", "phaseZhunbeiBegin"],
				},
				forceunique: true,
				content: function () {
					'step 0'
					player.addMark('bjshuyue', 1);
					'step 1'
					var list;
					if (_status.characterlist) {
						list = [];
						for (var i = 0; i < _status.characterlist.length; i++) {
							var name = _status.characterlist[i];
							list.push(name);
						}
					}
					else if (_status.connectMode) {
						list = get.charactersOL(function (i) {
							return true;
						});
					}
					else {
						list = get.gainableCharacters(function (info) {
							return true;
						});
					}
					var players = game.players.concat(game.dead);
					for (var i = 0; i < players.length; i++) {
						list.remove(players[i].name);
						list.remove(players[i].name1);
						list.remove(players[i].name2);
					}
					list.remove('bjbaimei');
					list.remove('bjxiaoyue');
					list.remove('bjbaimou');
					list = list.randomGets(2);
					var skills = [];
					for (var i of list) {
						skills.addArray((lib.character[i][3] || []).filter(function (skill) {
							var info = get.info(skill);
							return info;
						}));
					}
					if (!list.length || !skills.length) { event.finish(); return; }
					if (player.isUnderControl()) {
						game.swapPlayerAuto(player);
					}
					var switchToAuto = function () {
						_status.imchoosing = false;
						event._result = {
							bool: true,
							skills: skills.randomGets(2),
						};
						if (event.dialog) event.dialog.close();
						if (event.control) event.control.close();
					};
					var chooseButton = function (list, skills) {
						var event = _status.event;
						if (!event._result) event._result = {};
						event._result.skills = [];
						var rSkill = event._result.skills;
						var dialog = ui.create.dialog('请选择至多一个技能获得之', [list, 'character'], 'hidden');
						event.dialog = dialog;
						var table = document.createElement('div');
						table.classList.add('add-setting');
						table.style.margin = '0';
						table.style.width = '100%';
						table.style.position = 'relative';
						for (var i = 0; i < skills.length; i++) {
							var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link = skills[i];
							table.appendChild(td);
							td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
							td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
								if (_status.dragged) return;
								if (_status.justdragged) return;
								_status.tempNoButton = true;
								setTimeout(function () {
									_status.tempNoButton = false;
								}, 500);
								var link = this.link;
								if (!this.classList.contains('bluebg')) {
									if (rSkill.length >= 1) return;
									rSkill.add(link);
									this.classList.add('bluebg');
								}
								else {
									this.classList.remove('bluebg');
									rSkill.remove(link);
								}
							});
						}
						dialog.content.appendChild(table);
						dialog.add('　　');
						dialog.open();

						event.switchToAuto = function () {
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing = false;
						};
						event.control = ui.create.control('ok', function (link) {
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing = false;
						});
						for (var i = 0; i < event.dialog.buttons.length; i++) {
							event.dialog.buttons[i].classList.add('selectable');
						}
						game.pause();
						game.countChoose();
					};
					if (event.isMine()) {
						chooseButton(list, skills);
					}
					else if (event.isOnline()) {
						event.player.send(chooseButton, list, skills);
						event.player.wait();
						game.pause();
					}
					else {
						switchToAuto();
					}
					'step 2'
					var map = event.result || result;
					if (map && map.skills && map.skills.length) {
						for (var i of map.skills) player.addSkillLog(i);
					}
					game.broadcastAll(function (list) {
						game.expandSkills(list);
						for (var i of list) {
							var info = lib.skill[i];
							if (!info) continue;
							if (!info.audioname2) info.audioname2 = {};
							info.audioname2.old_yuanshu = 'weidi';
						}
					}, map.skills);
					'step 3'
					player.draw();
				},
				subSkill: {
					mark: {
						marktext: "章",
						intro: {
							name: "章节",
							content: "mark",
							onunmark: true,
						},
						sub: true,
						"_priority": 0,
					},
				},
				"_priority": 300,
			},


		},
		translate: {
			//这里放描述			
			"h_fc": "翻唱",
			"h_fc_info": "锁定技，回合开始前，你摸一张牌，并从随机的五张武将牌里面至多选择两个技能获得之。",





		},
	};
});
