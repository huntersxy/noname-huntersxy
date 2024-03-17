game.import('character', function (lib, game, ui, get, ai, _status) {
    return {
        name: '伳影',
        connect: true,
        skill: {
            //这里放技能
            "h_yupai2": {
                trigger: {
                    player: ["chooseToRespondBegin", "chooseToUseBegin","gameStart"],
                    global: ["chooseToRespondBegin",],
                },
                audio: "ext",
                superCharlotte: true,
                charlotte: true,
                forceunique: true,
                TaiguSkill: true,
                forced: true,
                lastDo: true,
                mark: true,
                hiddenCard: function (player, name) {
                    var cardPile = Array.from(ui.cardPile.childNodes);
                    if (!cardPile.length) return false;
                    var num = 4
                    //var num = Math.min(9, player.getDamagedHp() + 1);
                    cardPile = cardPile.slice(0, Math.min(num, cardPile.length));;
                    return cardPile.some(i => i.name == name);
                },
                filter: function (event, player) {
                    if (event.responded || event.skill) return false;
                    var cardPile = Array.from(ui.cardPile.childNodes);
                    if (!cardPile.length) return false;
                    //var num = Math.min(9, player.getDamagedHp() + 1);
                    var num = 4
                    cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                    return cardPile.some(i => event.filterCard && event.filterCard(i, player, event));
                },
                mod: {
                    "cardEnabled2": function (card, player) {
                        if (_status.event.skill && get.itemtype(card) == 'card' && card.hasGaintag('h_yupai2')) return false;
                    },
                },
                intro: {
                    mark: function (dialog, storage, player) {
                        var cardPile = Array.from(ui.cardPile.childNodes);
                        if (!cardPile.length) return '';
                        //var num = Math.min(9, player.getDamagedHp() + 1);
                        var num = 4
                        cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                        if (player.isUnderControl(true)) {
                            dialog.addAuto(cardPile);
                        } else {
                            return '';
                        }
                    },
                },
                copy: function (cards) {
                    var result = [];
                    for (var i of cards) {
                        var card = ui.create.card(ui.special);
                        card.init([
                            i.suit,
                            i.number,
                            i.name,
                            i.nature,
                        ]);
                        card.cardid = i.cardid,
                            card.wunature = i.wunature,
                            card.storage = i.storage,
                            card.relatedCard = i;
                        result.push(card);
                    };
                    return result;
                },
                contentx: function () {
                    "step 0"
                    if (trigger.result.bool) {
                        if (trigger.onresult) {
                            trigger.onresult(trigger.result);
                            delete trigger.onresult;
                        };
                    };
                    "step 1"
                    player.lose(event.cards, ui.special)._triggered = null;
                    "step 2"
                    for (var i of event.cards) {
                        i.fix();
                        i.remove();
                        i.destroyed = true;
                    };
                },
                content: function () {
                    "step 0"
                    var cardPile = Array.from(ui.cardPile.childNodes);
                    //var num = Math.min(9, player.getDamagedHp() + 1);
                    var num = 4
                    cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                    event.cards = lib.skill.h_yupai2.copy(cardPile);
                    player.directgains(event.cards, null, 'h_yupai2');
                    "step 1"
                    var evt = trigger;
                    var onresult = false;
                    if (evt.onresult) {
                        onresult = evt.onresult;
                    };
                    var next2 = game.createEvent('tgtt_jyxnylhzhenyan_clear', false);
                    next2.cards = event.cards;
                    next2.player = player;
                    next2._trigger = evt;
                    next2.setContent(lib.skill.h_yupai2.contentx);
                    event.next.remove(next2);
                    evt.after.push(next2);
                    evt.onresult = function (result) {
                        if (evt.after.includes(next2)) {
                            evt.after.remove(next2);
                            evt.next.push(next2);
                        };
                        if (result.cards && result.cards.length && (result.cards[0].hasGaintag('h_yupai2') || event.cards.includes(result.cards[0]))) {
                            var card2 = result.cards[0];
                            result.cards[0] = result.cards[0].relatedCard;
                            var cardx = result.cards[0];
                            result.card = {
                                name: get.name(card2),
                                suit: get.suit(card2),
                                number: get.number(card2),
                                nature: get.nature(card2),
                                isCard: true,
                                cardid: cardx.cardid,
                                wunature: cardx.wunature,
                                storage: cardx.storage,
                                cards: [cardx],
                            };
                        };
                        if (onresult) onresult.apply(evt, arguments);
                        delete evt.onresult;
                    };
                    game.delay(1);
                    var cards = player.getCards("hs");
                    var sort2 = function (b, a) {
                        if (a.name != b.name) return lib.sort.card(a.name, b.name);
                        else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
                        else return a.number - b.number;
                    };
                    if (cards.length > 1) {
                        cards.sort(sort2);
                        cards.forEach(function (i, j) {
                            player.node.handcards1.insertBefore(cards[j], player.node.handcards1.firstChild);
                        });
                    }
                },
                ai: {
                    respondShan: true,
                    respondSha: true,
                    save: true,
                    skillTagFilter: function (player, tag, arg) {
                        var event = _status.event;
                        var cardPile = Array.from(ui.cardPile.childNodes);
                        if (!cardPile.length) return false;
                       //var num = Math.min(9, player.getDamagedHp() + 1);
                       var num = 4
                        cardPile = cardPile.slice(0, Math.min(num, cardPile.length));
                        for (var i = 0; i < cardPile.length; i++) {
                            if (tag == 'respondSha') {
                                if (cardPile[i].name == 'sha') return true;
                            } else if (tag == 'respondShan') {
                                if (cardPile[i].name == 'shan') return true;
                            } else if (tag == 'save') {
                                if (cardPile[i].name == 'jiu' || cardPile[i].name == 'tao') return true;
                            };
                        };
                        return false;
                    },
                },
                sub: true,
                "_priority": 0,
            },


            "h_yupai":{
                audio:"ext:huntersxy:2",
                enable:["chooseToUse","chooseToRespond"],
                hiddenCard:function(player,name){
        if(player!=_status.currentPhase&&get.type(name)=='basic'&&lib.inpile.includes(name)) return true;
    },
                filter:function(event,player){
        if(event.responded||player==_status.currentPhase||event.aocai) return true;
        for(var i of lib.inpile){
            if(get.type(i)=='basic'&&event.filterCard({name:i},player,event)) return true;
        }
        return true;
    },
                delay:false,
                content:function(){
        'step 0'
        var evt=event.getParent(2);
        evt.set('aocai',true);
        var cards=get.cards((get.mode()!='guozhan'&&player.countCards('h')==0)?5:5);
        for(var i=cards.length-1;i>=0;i--){
            ui.cardPile.insertBefore(cards[i].fix(),ui.cardPile.firstChild);
        }
        var aozhan=player.hasSkill('aozhan');
        player.chooseButton(['御牌：选择要'+(evt.name=='chooseToUse'?'使用':'打出')+'的牌',cards]).set('filterButton',function(button){
            return _status.event.cards.includes(button.link);
        }).set('cards',cards.filter(function(card){
            if(aozhan&&card.name=='tao'){
                return evt.filterCard({
                    name:'sha',isCard:true,cards:[card],
                },evt.player,evt)||evt.filterCard({
                    name:'shan',isCard:true,cards:[card],
                },evt.player,evt);
            }
            return evt.filterCard(card,evt.player,evt);
        })).set('ai',function(button){
            var evt=_status.event.getParent(3);
            if(evt&&evt.ai){
                var tmp=_status.event;
                _status.event=evt;
                var result=(evt.ai||event.ai1)(button.link,_status.event.player,evt);
                _status.event=tmp;
                return result;
            }
            return 1;
        });
        'step 1'
        var evt=event.getParent(2);
        if(result.bool&&result.links&&result.links.length){
            var card=result.links[0];
            var name=card.name,aozhan=(player.hasSkill('aozhan')&&name=='tao');
            if(aozhan){
                name=evt.filterCard({
                    name:'sha',isCard:true,cards:[card],
                },evt.player,evt)?'sha':'shan';
            }
            if(evt.name=='chooseToUse'){
                game.broadcastAll(function(result,name){
                    lib.skill.aocai_backup.viewAs={name:name,cards:[result],isCard:true};
                },card,name);
                evt.set('_backupevent','aocai_backup');
                evt.set('openskilldialog',('请选择'+get.translation(card)+'的目标'))
                evt.backup('aocai_backup');
            }
            else{
                delete evt.result.skill;
                delete evt.result.used;
                evt.result.card=get.autoViewAs(result.links[0]);
                if(aozhan) evt.result.card.name=name;
                evt.result.cards=[result.links[0]];
                evt.redo();
                return;
            }
        }
        evt.goto(0);
    },
                ai:{
                    effect:{
                        target:function(card,player,target,effect){
                if(get.tag(card,'respondShan')) return 0.7;
                if(get.tag(card,'respondSha')) return 0.7;
            },
                    },
                    order:11,
                    respondShan:true,
                    respondSha:true,
                    result:{
                        player:function(player){
                if(_status.event.dying) return get.attitude(player,_status.event.dying);
                return 1;
            },
                    },
                },
            },

        },

        translate: {
            //这里放描述
            "h_yupai2":"御牌",
            "h_yupai":"御牌",
            "h_yupai_info":"你的出牌阶段和你需要响应牌时，你可以使用牌堆顶的4张牌",
            "qw_guance":"御牌"
        },
    };
}
);
