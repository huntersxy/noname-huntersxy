game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"noname-huntersxy",content:function(config,pack){
  lib.group.addArray(['xy']);
        lib.qy_group = ['xy']; //自己的自定义势力列表
        /************伳************/
        lib.translate.xy = '伳';
        lib.translate.xy2 = '伳';
        lib.groupnature.xy = 'xy';
        lib.translate.xyColor = "#ebbd07";
        /************伳************/
  
        //以下是备注
//v2.0 基于1.10.7.1



},precontent:function(){
    
},help:{},config:{},package:{
    character:{
        character:{
            cvhanser:["female","xy","3/5",["h_fc"],["des:著名CV","ext:noname-huntersxy/cvhanser.jpg","die:ext:noname-huntersxy/audio/die/cvhanser.mp3"]],
            "h_jiaxu":["male","xy","3/3",["rewansha","reweimu","zyjianbing","yjzhenlve","yjjianshu","reluanwu","yjyongdi"],["des:御神贾诩","ext:noname-huntersxy/h_jiaxu.jpg","die:ext:noname-huntersxy/audio/die/h_jiaxu.mp3"]],
            "h_spuyuan":["male","xy","3/3",["h_baohu","h_ronghe","olqisi","pyzhuren"],["des:炼器大师","ext:noname-huntersxy/h_spuyuan.jpg","die:ext:noname-huntersxy/audio/die/h_spuyuan.mp3"]],
            "h_smaliang":["male","xy","3/3",["h_zhishu","h_yushu"],["des:妙笔生花","ext:noname-huntersxy/h_smaliang.jpg","die:ext:noname-huntersxy/audio/die/h_smaliang.mp3"]],
            "h_bronya":["female","xy","3/3",["h_yuanji","h_sushe"],["des:真理永远在射程之内"]],
            "h_huohuo":["female","xy","3/3",["h_weiba"],["ext:noname-huntersxy/h_huohuo.jpg","die:ext:noname-huntersxy/audio/die/h_huohuo.mp3"]],
            "h_huohuoweiba":["double","xy","4/6",["h_quhun"],["boss","forbidai","bossallowed","ext:noname-huntersxy/h_huohuoweiba.jpg","die:ext:noname-huntersxy/audio/die/h_huohuoweiba.mp3"]],
            "h_ailixiya":["female","xy","3/12",["h_shiyuan","h_renlu"],["zhu","boss","bossallowed","ext:noname-huntersxy/h_ailixiya.jpg","die:ext:noname-huntersxy/audio/die/h_ailixiya.mp3"]],
            "h_gx":["female","xy","3/3",["h_guanxin","h_xinqi","h_juxin"],["ext:noname-huntersxy/h_gx.jpg","die:ext:noname-huntersxy/audio/die/h_gx.mp3"]],
            "h_geleixiu":["female","xy","2/2/1",["h_huishi","h_zhanyan","h_linmu"],["des:画笔，臣服于我"]],
            "h_yinlang":["female","xy","4/4",["h_stop","h_zhuru","h_download"],["ext:noname-huntersxy/h_yinlang.jpg","die:ext:noname-huntersxy/audio/die/h_yinlang.mp3"]],
            "h_zhenji":["female","xy","4/4",["h_mosha","h_shenlin","paoxiao"],[]],
            "h_inbronya":["female","xy",Infinity,["h_mosha","h_shagod","h_xinqi","h_yuanji","paoxiao"],[]],
            "h_sxjqingque":["female","xy",3,["h_dugou","qinzheng"],["des:哪有赌狗天天输"]],
            "h_husixiyu":["female","xy","1/5/4",["h_shouhu","h_zhudi","h_pojia"],["des:守护己身，护世之铭"]],
            "h_puluomixiushi":["female","xy","3/3",["h_shagod","h_bhyz"],["des:崩坏意志，机械之躯难以磨灭"]],
        },
        translate:{
            cvhanser:"Hanser•唱歌憨",
            "h_jiaxu":"神贾诩",
            "h_spuyuan":"神蒲元",
            "h_smaliang":"神马良",
            "h_bronya":"布洛妮娅",
            "h_huohuo":"藿藿",
            "h_huohuoweiba":"藿藿&尾巴大爷",
            "h_ailixiya":"人之律者 爱莉希雅",
            "h_gx":"观星",
            "h_geleixiu":"格蕾修",
            "h_yinlang":"银狼",
            "h_zhenji":"真纪",
            "h_inbronya":"永恒 布洛妮娅",
            "h_sxjqingque":"青雀",
            "h_husixiyu":"汐屿",
            "h_puluomixiushi":"普罗米修斯",
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
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
            "h_fc":{
                name:"bjdushu",
                audio:"ext:北极/audio/:2",
                forced:true,
                charlotte:true,
                superCharlotte:true,
                priority:3,
                trigger:{
                    player:["damageEnd","phaseZhunbeiBegin"],
                },
                forceunique:true,
                content:function () {
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
                subSkill:{
                    mark:{
                        marktext:"章",
                        intro:{
                            name:"章节",
                            content:"mark",
                            onunmark:true,
                        },
                        sub:true,
                        "_priority":0,
                    },
                },
                "_priority":300,
            },
            "h_zhishu":{
                audio:"ext:烤箱魔改:2",
                locked:true,
                subSkill:{
                    discard:{
                        trigger:{
                            global:"phaseEnd",
                        },
                        audio:"zishu",
                        forced:true,
                        filter:function(event,player){
                if(_status.currentPhase!=player){
                    var he=player.getCards('h');
                    var bool=false;
                    player.getHistory('gain',function(evt){
                        if(!bool&&evt&&evt.cards){
                            for(var i=0;i<evt.cards.length;i++){
                                if(he.contains(evt.cards[i])) bool=true;break;
                            }
                        }
                    });
                    return bool;
                }
                return false;
            },
                        content:function(){
                var he=player.getCards('h');
                var list=[];
                player.getHistory('gain',function(evt){
                    if(evt&&evt.cards){
                        for(var i=0;i<evt.cards.length;i++){
                            if(he.contains(evt.cards[i])) list.add(evt.cards[i]);
                        }
                    }
                });
                player.$throw(list,1000);
                player.lose(list,ui.discardPile,'visible');
                game.log(player,'将',list,'置入弃牌堆');
            },
                        sub:true,
                        "_priority":0,
                    },
                    mark:{
                        trigger:{
                            player:"gainBegin",
                            global:"phaseBeginStart",
                        },
                        silent:true,
                        filter:function(event,player){
                return event.name!='gain'||player!=_status.currentPhase;
            },
                        content:function(){
                if(trigger.name=='gain') trigger.gaintag.add('zishu');
                else player.removeGaintag('zishu');
            },
                        sub:true,
                        forced:true,
                        popup:false,
                        "_priority":1,
                    },
                    draw:{
                        trigger:{
                            player:"gainAfter",
                            global:"loseAsyncAfter",
                        },
                        audio:"zishu",
                        forced:true,
                        filter:function(event,player){
                if(_status.currentPhase!=player||event.getg(player).length==0) return false;
                return event.getParent(2).name!='zishu_draw';
            },
                        content:function(){
                player.draw('nodelay');
            },
                        sub:true,
                        "_priority":0,
                    },
                },
                ai:{
                    threaten:1.2,
                    nogain:1,
                    skillTagFilter:function(player){
            return player!=_status.currentPhase;
        },
                },
                group:["zishu_draw","zishu_mark"],
                "_priority":0,
            },
            "h_yushu":{
                trigger:{
                    player:"useCard",
                },
                filter:function(event,player){
        var evt=lib.skill.dcjianying.getLastUsed(player,event);
        if(!evt||!evt.card) return false;
        var num1=get.number(event.card),num2=get.number(evt.card);
        return typeof num1=='number'&&typeof num2=='number'&&num2%num1==0;
    },
                forced:true,
                content:function(){
        player.draw();
    },
                mod:{
                    cardUsable:function(card,player){
            if(typeof card=='object'){
                var evt=lib.skill.dcjianying.getLastUsed(player);
                if(!evt||!evt.card) return;
                var num1=get.number(card),num2=get.number(evt.card);
                if(typeof num1=='number'&&typeof num2=='number'&&num1%num2==0) return Infinity;
            }
        },
                    aiOrder:function(player,card,num){
            if(typeof card=='object'){
                var evt=lib.skill.dcjianying.getLastUsed(player);
                if(!evt||!evt.card) return;
                var num1=get.number(card),num2=num2=get.number(evt.card);
                if(typeof num1=='number'&&typeof num2=='number'&&num2%num1==0) return num+5;
            }
        },
                },
                init:function(player){
        player.addSkill('xingtu_mark');
        var history=player.getAllHistory('useCard');
        if(history.length){
            var trigger=history[history.length-1],num=get.number(trigger.card);
            player.storage.xingtu_mark=num;
            player[typeof num!='number'?'unmarkSkill':'markSkill']('xingtu_mark');
        }
    },
                onremove:function(player){
        player.removeSkill('xingtu_mark');
        player.removeGaintag('xingtu1');
        player.removeGaintag('xingtu2');
        delete player.storage.xingtu_mark;
    },
                subSkill:{
                    mark:{
                        charlotte:true,
                        trigger:{
                            player:["useCard1","gainAfter"],
                            global:"loseAsyncAfter",
                        },
                        filter:function(event,player,name){
                if(!player.countCards('h')) return false;
                return name=='useCard1'||event.getg(player).length;
            },
                        direct:true,
                        firstDo:true,
                        content:function(){
                'step 0'
                player.removeGaintag('xingtu1');
                player.removeGaintag('xingtu2');
                if(event.triggername=='useCard1'){
                    var num=get.number(trigger.card,player);
                    player.storage.xingtu_mark=num;
                    player[typeof num!='number'?'unmarkSkill':'markSkill']('xingtu_mark');
                    if(typeof num!='number') event.finish();
                }
                'step 1'
                var cards1=[],cards2=[],num=player.storage.xingtu_mark;
                player.getCards('h').forEach(card=>{
                    var numx=get.number(card,player);
                    if(typeof numx=='number'){
                        if(numx%num==0) cards1.push(card);
                        if(num%numx==0) cards2.push(card);
                    }
                });
                player.addGaintag(cards1,'xingtu1');
                player.addGaintag(cards2,'xingtu2');
            },
                        intro:{
                            content:"上一张牌的点数：#",
                        },
                        sub:true,
                        "_priority":0,
                    },
                },
                "_priority":0,
                "audioname2":{
                    "old_yuanshu":"weidi",
                },
            },
            "h_yuanji":{
                mod:{
                    globalFrom:function(from,to,distance){
            return distance-5;
        },
                },
                "_priority":0,
            },
            "h_sushe":{
                audio:"ext:world:2",
                enable:"phaseUse",
                position:"hs",
                viewAs:{
                    name:"wanjian",
                },
                filterCard:function(card,player){
        if(ui.selected.cards.length){
            return get.suit(card)==get.suit(ui.selected.cards[0]);
        }
        var cards=player.getCards('hs');
        for(var i=0;i<cards.length;i++){
            if(card!=cards[i]){
                if(get.suit(card)==get.suit(cards[i])) return true;
            }
        }
        return false;
    },
                selectCard:1,
                complexCard:true,
                check:function(card){
        var player=_status.event.player;
        var targets=game.filterPlayer(function(current){
            return player.canUse('wanjian',current);
        });
        var num=0;
        for(var i=0;i<targets.length;i++){
            var eff=get.sgn(get.effect(targets[i],{name:'wanjian'},player,player));
            if(targets[i].hp==1){
                eff*=1.5;
            }
            num+=eff;
        }
        if(!player.needsToDiscard(-1)){
            if(targets.length>=7){
                if(num<2) return 0;
            }
            else if(targets.length>=5){
                if(num<1.5) return 0;
            }
        }
        return 6-get.value(card);
    },
                ai:{
                    basic:{
                        order:8.5,
                        useful:1,
                        value:5,
                    },
                    wuxie:function(target,card,player,viewer){
            if(get.attitude(viewer,target)>0&&target.countCards('h','shan')){
                if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
            }
        },
                    result:{
                        "target_use":function(player,target){
                if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7
                return -1.5;
            },
                        target:function(player,target){
                var nh=target.countCards('h');
                if(get.mode()=='identity'){
                    if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
                }
                if(nh==0) return -2;
                if(nh==1) return -1.7
                return -1.5;
            },
                        player:function (player, target) {
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
                    tag:{
                        respond:1,
                        respondShan:1,
                        damage:1,
                        multitarget:1,
                        multineg:1,
                    },
                },
                "_priority":0,
            },
            "h_weiba":{
                trigger:{
                    player:"dying",
                },
                limited:true,
                forced:true,
                charlotte:false,
                unique:true,
                skillAnimation:true,
                animationColor:"water",
                filter:function(event,player){
        return player.isDamaged();
    },
                check:function(event,player){
        return player.hp<=1||player.getDamagedHp()>1;
    },
                content:function(){
        player.awakenSkill(event.name);
        var num=player.maxHp-player.hp;
        player.recover(num-1);
        player.draw(num);
        player.init('h_huohuoweiba');
        
    },
                mark:true,
                intro:{
                    content:"limited",
                },
                init:(player,skill)=>player.storage[skill]=false,
                "_priority":0,
            },
            "h_boom":{
                audio:"ext:noname-huntersxy:2",
                enable:"phaseUse",
                prompt:"失去1点体力并摸两张牌",
                content:function(){
        "step 0"
        player.loseHp(10);
        "step 1"
        player.init('h_boom');
    },
                ai:{
                    basic:{
                        order:1,
                    },
                    result:{
                        player:function(player){
                if(player.countCards('h')>=player.hp-1) return -1;
                if(player.hp<3) return -1;
                return 1;
            },
                    },
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
            "h_guanxin":{
                audio:"ext:烤箱魔改:2",
                audioname:["jiangwei","re_jiangwei","re_zhugeliang","ol_jiangwei"],
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                frequent:true,
                preHidden:true,
                content:function(){
        "step 0"
        var num=Math.max(12,game.countPlayer());
        if(player.hasSkill('yizhi')&&player.hasSkill('guanxing')){
            num=12;
        }
        var cards=get.cards(num);
        game.cardsGotoOrdering(cards);
        var next=player.chooseToMove();
        next.set('list',[
            ['牌堆顶',cards],
            ['牌堆底'],
        ]);
        next.set('prompt','观星：点击将牌移动到牌堆顶或牌堆底');
        next.processAI=function(list){
            var cards=list[0][1],player=_status.event.player;
            var top=[];
            var judges=player.getCards('j');
            var stopped=false;
            if(!player.hasWuxie()){
                for(var i=0;i<judges.length;i++){
                    var judge=get.judge(judges[i]);
                    cards.sort(function(a,b){
                        return judge(b)-judge(a);
                    });
                    if(judge(cards[0])<0){
                        stopped=true;break;
                    }
                    else{
                        top.unshift(cards.shift());
                    }
                }
            }
            var bottom;
            if(!stopped){
                cards.sort(function(a,b){
                    return get.value(b,player)-get.value(a,player);
                });
                while(cards.length){
                    if(get.value(cards[0],player)<=5) break;
                    top.unshift(cards.shift());
                }
            }
            bottom=cards;
            return [top,bottom];
        }
        "step 1"
        var top=result.moved[0];
        var bottom=result.moved[1];
        top.reverse();
        game.cardsGotoPile(
            top.concat(bottom),
            ['top_cards',top],
            function(event,card){
                if(event.top_cards.includes(card)) return ui.cardPile.firstChild;
                return null;
            }
        )
        player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
        game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
        "step 2"
        game.delayx();
    },
                ai:{
                    threaten:1.2,
                },
                "_priority":0,
            },
            "h_xinqi":{
                audio:"ext:烤箱魔改:2",
                audioname:["sp_lvmeng"],
                trigger:{
                    player:"phaseDrawBegin2",
                },
                frequent:true,
                filter:function(event,player){
        return !event.numFixed;
    },
                content:function(){
        trigger.num++;
        player.draw(2);
    },
                ai:{
                    threaten:1.3,
                },
                "_priority":0,
            },
            "h_juxin":{
                skillAnimation:true,
                animationColor:"wood",
                audio:"ext:烤箱魔改:2",
                juexingji:true,
                derivation:["reyingzi","gzyinghun"],
                unique:true,
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                filter:function(event,player){
        return player.hp<=2&&!player.storage.hunzi;
    },
                forced:true,
                content:function(){
        player.addSkill('guose');
        player.addSkill('cz_xinqi');
        game.log(player,'获得了技能','#g【国色】')
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
            "h_fuzhi":{
                audio:"ext:烤箱魔改:2",
                locked:true,
                subSkill:{
                    discard:{
                        trigger:{
                            global:"phaseEnd",
                        },
                        forced:true,
                        sub:true,
                        "_priority":0,
                    },
                    draw:{
                        sub:true,
                        "_priority":0,
                    },
                },
                group:[""],
                "_priority":0,
            },
            "h_quhun":{
                audio:"ext:烤箱魔改:2",
                locked:true,
                subSkill:{
                    discard:{
                        trigger:{
                            global:"phaseEnd",
                        },
                        forced:true,
                        sub:true,
                        "_priority":0,
                    },
                    draw:{
                        sub:true,
                        "_priority":0,
                    },
                },
                group:["fuqi","repojun","sbliegong"],
                "_priority":0,
            },
            "h_huishi":{
                audio:"ext:noname-huntersxy:2",
                enable:"chooseToUse",
                usable:1,
                filter:function(event,player){
        return !player.hasSkill('haruka_kanata');
    },
                chooseButton:{
                    dialog:function(event,player){
            var list=[];
            for(var i=0;i<lib.inpile.length;i++){
                var name=lib.inpile[i];
                if(name=='boss_mengpohuihun') continue;
                if(name=='sha'){
                    list.push(['基本','','sha']);
                    for(var j of lib.inpile_nature) list.push(['基本','',name,j]);
                }
                else if(get.type(name)=='trick') list.push(['锦囊','',name]);
                else if(get.type(name)=='basic') list.push(['基本','',name]);
            }
            return ui.create.dialog('绘世',[list,'vcard']);
        },
                    filter:function(button,player){
            return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
        },
                    check:function(button){
            var player=_status.event.player;
            if(player.countCards('h',button.link[2])>0) return 0;
            if(['wugu','zhulu_card'].contains(button.link[2])) return 0;
            var effect=player.getUseValue(button.link[2]);
            if(effect>0) return effect;
            return 0;
        },
                    backup:function(links,player){
            return {
                audio:'h_huishi',
                filterCard:function(){return false},
                selectCard:-1,
                popname:true,
                check:function(card){
                    return 6-get.value(card);
                },
                position:'he',
                viewAs:{name:links[0][2],nature:links[0][3],isCard:true},
            }
        },
                    prompt:function(links,player){
            return '请选择'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'的目标';
        },
                },
                ai:{
                    order:1,
                    result:{
                        player:function(player){
                var cards=player.getCards('he').sort(function(a,b){
                    return get.value(a)-get.value(b);
                });
                var num=(player.getStat('skill').h_huishi||0)+1;
                if(player.needsToDiscard()>=num) return 1;
                if(player.hp>2) return 1;
                if(cards.length>=num){
                    var val=0;
                    for(var i=0;i<cards.length;i++){
                        val+=get.value(cards[i]);
                    }
                    return 12-val;
                }
                return 0;
            },
                    },
                    fireAttack:true,
                },
                "_priority":0,
            },
            "h_huishi_limit":{
                trigger:{
                    player:"useCardAfter",
                },
                forced:true,
                filter:function(event,player){
        return event.skill=='h_huishi_backup';
    },
                content:function(){
        'step 0'
        var num=2;
        player.chooseToDiscard('###绘世：请选择一项###选择弃置'+get.cnNumber(num)+'张牌，或失去1点体力且令〖绘世〗失效至回合结束',num,'he').set('ai',function(card){
            var total=12;
            for(var i=0;i<ui.selected.cards.length;i++){
                total-=get.value(ui.selected.cards[i]);
            }
            return total-get.value(card);
        });
        'step 1'
        if(!result.bool){
            player.addTempSkill('haruka_kanata');
            player.loseHp();
        }
    },
                "_priority":0,
            },
            "h_zhanyan":{
                audio:"ext:noname-huntersxy:2",
                trigger:{
                    player:["loseAfter","changeHp","gainMaxHpAfter","loseMaxHpAfter"],
                    global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
                },
                frequent:true,
                filter:function(event,player){
        if(event.getl&&!event.getl(player)) return false;
        return player.countCards('h')<player.getDamagedHp();
    },
                content:function(){
        player.draw(player.getDamagedHp()-player.countCards('h'));
    },
                ai:{
                    noh:true,
                    skillTagFilter:function(player,tag){
            if(tag=='noh'&&player.maxHp-player.hp<player.countCards('h')){
                return false;
            }
        },
                },
                "_priority":0,
            },
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
            "h_shouhu":{
                trigger:{
                    player:"damageBegin1",
                },
                usable:1,
                forced:true,
                unique:true,
                content:function(){ trigger.cancel();player.draw(2);player.changeHujia();
                      
        
        
    },
                ai:{
                    player:2,
                },
                "_priority":0,
            },
            "h_zhudi":{
                enable:"phaseUse",
                usable:1,
                filter:function(event,player){
        return player.hujia?true:false;
    },
                filterTarget:function(card,player,target){
        return player!=target&&get.distance(player,target,'attack')<=1;
    },
                selectTarget:function(){
        return [1,_status.event.player.hujia];
    },
                contentBefore:function(){
        player.changeHujia(-targets.length);
    },
                content:function(){
        target.damage();
    },
                ai:{
                    order:9,
                    result:{
                        target:function(player,target){
                var eff=get.damageEffect(target,player,target)+0.5;
                if(eff>0&&eff<=0.5) return 0;
                return eff;
            },
                    },
                },
                "_priority":0,
            },
            "h_pojia":{
                trigger:{
                    player:"phaseEnd",
                },
                filter:function(event,player){
        return player.hujia>0;
    },
                check:function(event,player){
        return player.hujia>1&&player.hp>1;
    },
                content:function(){
        player.storage.h_pojia=player.hujia;
        player.changeHujia(-player.hujia);
        player.insertPhase();
    },
                group:["h_pojiafushu","h_pojiafushu2"],
                subSkill:{
                    hp:{
                        trigger:{
                            player:"phaseAfter",
                        },
                        silent:true,
                        filter:function(event,player){
                return event.skill=='h_pojia'&&!player.getStat('damage');
            },
                        content:function(){
                player.loseHp();
            },
                        sub:true,
                        forced:true,
                        popup:false,
                        "_priority":1,
                    },
                    draw:{
                        trigger:{
                            player:"phaseDrawBegin",
                        },
                        filter:function(event){
                return event.getParent('phase').skill=='h_pojia';
            },
                        silent:true,
                        content:function(){
                trigger.num+=player.storage.h_pojia-1;
            },
                        sub:true,
                        forced:true,
                        popup:false,
                        "_priority":1,
                    },
                },
                "_priority":0,
            },
            "h_pojiafushu":{
                trigger:{
                    player:"phaseDrawBegin",
                },
                filter:function(event){
        return event.getParent('phase').skill=='h_pojia';
    },
                silent:true,
                content:function(){
        trigger.num+=player.storage.h_pojia-1;
    },
                sub:true,
                forced:true,
                popup:false,
                "_priority":1,
            },
            "h_pojiafushu2":{
                trigger:{
                    player:"phaseDrawBegin",
                },
                filter:function(event){
        return event.getParent('phase').skill=='h_pojia';
    },
                silent:true,
                content:function(){
        trigger.num+=player.storage.h_pojia-1;
    },
                sub:true,
                forced:true,
                popup:false,
                "_priority":1,
            },
            "h_mosha":{
                audio:"ext:noname-huntersxy:2",
                trigger:{
                    source:"damageBegin2",
                },
                usable:8,
                check:function(event,player){
        var att=get.attitude(player,event.player);
        if(event.player.hp==event.player.maxHp) return att<0;
        if(event.player.hp==event.player.maxHp-1&&
            (event.player.maxHp<=3||event.player.hasSkillTag('maixie'))) return att<0;
        return att>0;
    },
                filter:function(event,player){
        return event.card
            //&&event.card.name=='sha'&&get.distance(player,event.player)<=1
        ;
    },
                logTarget:"player",
                content:function(){
        'step 0'
        player.judge(function(card){
            return get.suit(card)!='heart'?1:-1;
        }).judge2=function(result){
            return result.bool;
        };
        'step 1'
        if(result.bool){
            trigger.player.loseMaxHp(1);
            trigger.player.loseMaxHp(true);
        }
    },
                "_priority":0,
            },
            "h_linmu":{
                audio:"ext:noname-huntersxy:2",
                locked:true,
                enable:"chooseToRespond",
                usable:5,
                filter:function(event,player){
        return !player.hasSkill('haruka_kanata');
    },
                chooseButton:{
                    dialog:function(event,player){
            var list=[];
            for(var i=0;i<lib.inpile.length;i++){
                var name=lib.inpile[i];
                if(name=='boss_mengpohuihun') continue;
                if(name=='sha'){
                    list.push(['基本','','sha']);
                    for(var j of lib.inpile_nature) list.push(['基本','',name,j]);
                }
                else if(get.type(name)=='trick') list.push(['锦囊','',name]);
                else if(get.type(name)=='basic') list.push(['基本','',name]);
            }
            return ui.create.dialog('绘世',[list,'vcard']);
        },
                    filter:function(button,player){
            return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
        },
                    check:function(button){
            var player=_status.event.player;
            if(player.countCards('h',button.link[2])>0) return 0;
            if(['wugu','zhulu_card'].contains(button.link[2])) return 0;
            var effect=player.getUseValue(button.link[2]);
            if(effect>0) return effect;
            return 0;
        },
                    backup:function(links,player){
            return {
                audio:'h_huishi',
                filterCard:function(){return false},
                selectCard:-1,
                popname:true,
                check:function(card){
                    return 6-get.value(card);
                },
                position:'he',
                viewAs:{name:links[0][2],nature:links[0][3],isCard:true},
            }
        },
                    prompt:function(links,player){
            return '请选择'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'的目标';
        },
                },
                ai:{
                    order:1,
                    result:{
                        player:function(player){
                var cards=player.getCards('he').sort(function(a,b){
                    return get.value(a)-get.value(b);
                });
                var num=(player.getStat('skill').h_huishi||0)+1;
                if(player.needsToDiscard()>=num) return 1;
                if(player.hp>2) return 1;
                if(cards.length>=num){
                    var val=0;
                    for(var i=0;i<cards.length;i++){
                        val+=get.value(cards[i]);
                    }
                    return 12-val;
                }
                return 0;
            },
                    },
                    fireAttack:true,
                },
                "_priority":0,
            },
            "h_shenlin":{
                trigger:{
                    player:"useCard",
                },
                forced:true,
                filter:function (event, player) {
        return event.card;
    },
                content:function () {
        trigger.directHit.addArray(game.players);
    },
                ai:{
                    "directHit_ai":true,
                },
                "_priority":0,
            },
            "h_shagod":{
                audio:"ext:noname-huntersxy:2",
                forced:true,
                group:["h_sha"],
                trigger:{
                    player:"useCardToPlayered",
                },
                filter:function(event,player){
    return event.card.name=='sha'},
                logTarget:"target",
                check:function(event,player){
        if(event.target.hasSkillTag('noe')) return false;
        return get.attitude(player,event.target)<0;
    },
                content:function(){
                'step 0'
        trigger.target.chooseToDiscard('e',true);
        //player.chooseToGuanxing(2);
        //player.chat("你等死吧");
        trigger.target.loseMaxHp(1);
        player.draw(1)
        player.gainPlayerCard(true, trigger.target, 'he');
        trigger.target.addLink(target);
        //trigger.player.gainMaxHp(1);
     

    },
                "_priority":0,
            },
            "h_sha":{
                audio:"ext:noname-huntersxy:2",
                trigger:{
                    player:"shaMiss",
                },
                silent:true,
                forced:true,
                content:function(){
        
        var card=get.cardPile(function(card){
                    return card.name=='sha';
                });
                if(card) player.gain(card,'gain2');
    },
                popup:false,
                "_priority":1,
            },
            "h_dugou":{
                trigger:{
                    player:"useCardAfter",
                },
                forced:true,
                filter(event,player){
        if(event.parent.name=='h_dugou') return false;
        if(event.card==event.cards[0]){
            var type=get.type(event.card,'trick');
            var names=[];
            if(get.cardPile(function(card){
                if(get.type(card,'trick')!=type) return false;
                if(get.info(card).multitarget) return false;
                if(names.includes(card.name)) return false;
                if(player.hasUseTarget(card)){
                    return true;
                }
                else{
                    names.add(card.name);
                    return false;
                }
            })){
                return true;
            }
        }
        return true;
    },
                content(){
        var type=get.type(trigger.card,'trick');
        var names=[];
        var card=get.cardPile(function(card){
            if(get.type(card,'trick')!=type) return false;
            if(get.info(card).multitarget) return false;
            if(names.includes(card.name)) return false;
            if(player.hasUseTarget(card)){
                return true;
            }
            else{
                names.add(card.name);
                return false;
            }
        });
        if(card){
            var info=get.info(card);
            var targets=game.filterPlayer(function(current){
                return lib.filter.filterTarget(card,player,current);
            });
            if(targets.length){
                targets.sort(lib.sort.seat);
                var select=get.select(info.selectTarget);
                if(select[0]==-1||select[1]==-1){
                    player.useCard(card,targets,'noai');
                }
                else if(targets.length>=select[0]){
                    var num=select[0]+Math.floor(Math.random()*(select[1]-select[0]+1));
                    player.useCard(card,targets.randomGets(num),'noai');
                }
            }
        }
    },
                "_priority":0,
            },
            "h_bhyz":{
                unique:true,
                forced:true,
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                filter:function(event,player){
        
        return player.isDamaged();
    },
                check:function(event,player){
        if(player.hp<=2||player.getDamagedHp()>2) return true;
        if(player.getDamagedHp()<=1) return false;
        return player.getDamagedHp()<game.roundNumber;
    },
                content:function(){
        
        player.recover(player.maxHp-player.hp);
        player.draw(player.maxHp-player.hp);
    },
            },
        },
        translate:{
            "h_baohu":"铸圣",
            "h_baohu_info":"锁定技。①当你成为其他角色使用牌的目标时，若你的装备区内有和此牌花色相同的牌，则你摸一张牌。②若你装备区内的牌数大于1，则其他角色不能弃置你装备区内的牌。③你无法成为其他角色普通锦囊牌的目标。④你拥有技能【铸刃】【奇思】",
            "h_ronghe":"融合",
            "h_ronghe_info":"出牌阶段，你可以将两张装备合成一张装备。",
            "h_fc":"翻唱",
            "h_fc_info":"锁定技，回合开始前，你摸一张牌，并从随机的五张武将牌里面至多选择两个技能获得之。",
            "h_zhishu":"自书",
            "h_zhishu_info":"锁定技，当你于回合内不因〖自书〗而得到牌后，你摸一张牌。",
            "h_yushu":"御数",
            "h_yushu_info":"锁定技。你使用点数为X的倍数的牌无次数限制，你使用点数为X的约数的牌时摸一张牌（X为你本局游戏使用的上一张牌的点数）。",
            "h_yuanji":"真理",
            "h_yuanji_info":"锁定技，你计算与其他角色的距离时-5。",
            "h_sushe":"创构",
            "h_sushe_info":"出牌阶段，若你的手牌中有花色相同的牌，则你可以将一张当着［万箭齐发］打出",
            "h_weiba":"尾巴",
            "h_weiba_info":"觉醒技，濒死时，你将体力值回复至体力上限-1点值并摸等同于回复量的牌，然后将武将牌替换为【霍霍&尾巴大爷】。",
            "h_boom":"自爆",
            "h_boom_info":"出牌阶段，你可以失去10点体力，然后变成武将牌代码为h_boom的东西",
            "h_shiyuan":"始源",
            "h_shiyuan_info":"①游戏开始时，你随机将武将牌堆中的六张牌扣置于武将牌上（均称为“始源牌”），选择并亮出一张“始源牌”并声明该武将牌上的一个技能，你拥有该技能且同时将性别和势力属性变成与该武将相同直到该始源被替换（你不可声明限定技、觉醒技、隐匿技、使命技、主公技等特殊技能）。②回合开始时或回合结束时，你重新可以选择一张“始源牌”并声明该武将牌上的一个技能。",
            "h_renlu":"人律",
            "h_renlu_info":"觉醒技，准备阶段，若你的体力值小于2，则获得技能〖刻印〗。",
            "h_guanxin":"观星",
            "h_guanxin_info":"准备阶段，你可以观看牌堆顶的10张牌，并将其以任意顺序置于牌堆项或牌堆底。",
            "h_xinqi":"星棋",
            "h_xinqi_info":"摸牌阶段，你可以多摸三张牌。",
            "h_juxin":"聚星",
            "h_juxin_info":"觉醒技，准备阶段，若你的体力值小于2，则你获得技能〖国色〗。",
            "h_fuzhi":"赋值",
            "h_fuzhi_info":"锁定技。你视为拥有技能【】",
            "h_quhun":"驱魂",
            "h_quhun_info":"锁定技。你视为拥有技能【伏骑】【破军】【烈弓】",
            "h_huishi":"绘世",
            "h_huishi_info":"每回合限一次，你可以视为使用任意基本牌或普通锦囊牌。",
            "h_huishi_limit":"画笔",
            "h_huishi_limit_info":"绘世限制技",
            "h_zhanyan":"蘸颜",
            "h_zhanyan_info":"当你的手牌数小于X时，你可以将手牌摸至X张（X为你已损失的体力值）。",
            "h_stop":"断点",
            "h_stop_info":"每回合限五次，一名角色的判定结果确定时，若结果有花色，则你可以终止导致此判定发生的上级事件。然后选择一项：①获得判定牌对应的实体牌。②视为对判定角色使用一张火【杀】（无距离和次数限制）。",
            "h_zhuru":"注入",
            "h_zhuru_info":"出牌阶段限一次，你可选择一名其他角色。该角色获得〖八阵〗，且其所有不为{锁定技、限定技、觉醒技、主公技、带有Charlotte标签}的技能失效。你的下回合开始时，或其因〖八卦阵〗发起的判定结算结束后，你令其恢复其以此法失效的所有技能并失去以此法获得的〖八阵〗，然后获得其区域内的一张牌。",
            "h_download":"下载",
            "h_download_info":"结束阶段开始时，你将手牌补至体力上限。",
            "h_keyin":"刻印",
            "h_keyin_info":"当你受到伤害后，你获得3个始源牌",
            "h_shouhu":"守护",
            "h_shouhu_info":"锁定技。每回合限一次，当你受到伤害时，你取消之并摸两张牌且获得一点护甲",
            "h_zhudi":"逐敌",
            "h_zhudi_info":"每回合限一次，你可以舍弃任意数量的护甲并对等量的角色造成一点伤害。",
            "h_pojia":"护世",
            "h_pojia_info":"回合结束时，若你有护甲，则你可失去全部护甲并获得一个额外回合，该回合的摸牌数为你失去的护甲值的两倍，若你在额外回合中未造成伤害，则你失去一点体力。",
            "h_pojiafushu":"破甲",
            "h_pojiafushu_info":"破甲附属",
            "h_pojiafushu2":"破甲",
            "h_pojiafushu2_info":"破甲附属",
            "h_mosha":"抹杀",
            "h_mosha_info":"每回合限八次，当你对角色造成伤害时，你可以进行一次判定，若判定结果不为红桃，你令其减2点体力上限。",
            "h_linmu":"临摹",
            "h_linmu_info":"每回合限五次，你可以视为响应任意基本牌或普通锦囊牌。",
            "h_shenlin":"神临",
            "h_shenlin_info":"锁定技，你的牌无法被响应",
            "h_shagod":"清扫",
            "h_shagod_info":"锁定技，当你用杀指定目标后，你执行下项：①你摸一张牌。②你随机获得其一张装备区的牌。③你获得其一张牌。④横置对方。⑤减少其一点体力上限。若该杀未造成伤害，你获得一张杀。",
            "h_sha":"得杀",
            "h_sha_info":"杀被miss后摸一张杀",
            "h_dugou":"赌狗",
            "h_dugou_info":"当你使用牌时，你随机对一个目标使用一张同类型牌",
            "h_bhyz":"重整",
            "h_bhyz_info":"准备阶段，你将体力回复至上限，然后摸X张牌（X为你回复的体力值）。",
        },
    },
    intro:"烤箱插座阴间武将基于原版技能的简单魔改",
    author:"noname-huntersxy",
    diskURL:"https://github.com/noname-huntersxy/noname-noname-huntersxy",
    forumURL:"https://github.com/noname-huntersxy/noname-noname-huntersxy",
    version:"2.0",
},files:{"character":["h_spuyuan.jpg","h_smaliang.jpg","h_huohuoweiba.jpg","cvhanser.jpg","h_jiaxu.jpg","h_bronya.jpg","h_geleixiu.jpg","h_inbronya.jpg","h_ailixiya.jpg","h_huohuo.jpg","h_gx.jpg","h_yinlang.jpg","h_sxjqingque.jpg","h_husixiyu.jpg","h_zhenji.jpg","h_puluomixiushi.jpg"],"card":[],"skill":[],"audio":[]}}})