game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'huntersxy',
		connect:true,
		character:{
            //作者
            "h_huntersxy":["female","shen",5,["h_yupai"],["zhu","boss","bossallowed","ext:noname-huntersxy/character/image/h_huntersxy.jpg"]],
            //崩坏三
            //白希
            "h_baixier":["female","xy",3,["h_ss","深海","h_xier1"],["des:死生之律者","ext:noname-huntersxy/character/image/h_baixier.jpg"]],
            //黑希
            "h_heixier":["female","xy","3/3/1",["h_shilv","h_xier_hudun"],["des:希儿...","ext:noname-huntersxy/character/image/h_heixier.jpg"]],
            //永恒布洛妮娅
            "h_bronya_Infinity":["female","xy",Infinity,["h_mosha","h_shagod","h_xinqi","h_yuanji","paoxiao"],["forbidai","ext:noname-huntersxy/character/image/h_bronya_Infinity.jpg"]],
            //普罗米修斯
            "h_puluomixiushi":["female","xy","3/3",["h_shagod","h_bhyz"],["des:崩坏意志，机械之躯难以磨灭","ext:noname-huntersxy/character/image/h_puluomixiushi.jpg"]],
            //爱莉希雅
            "h_ailixiya":["female","xy","3/12",["h_shiyuan","h_renlu"],["zhu","boss","bossallowed","ext:noname-huntersxy/character/image/h_ailixiya.jpg"]],
            //Hanser
            "h_cvhanser":["female","xy","3/5",["h_fc"],["des:著名CV","ext:noname-huntersxy/character/image/h_cvhanser.jpg"]],
            //布洛妮娅
            "h_bronya":["female","xy","3/3",["h_yuanji","h_sushe"],["des:真理永远在射程之内","ext:noname-huntersxy/character/image/h_bronya.jpg"]],
            //观星
            "h_guanxing":["female","xy","3/3",["h_guanxin","h_xinqi","h_juxin"],["ext:noname-huntersxy/character/image/h_guanxing.jpg"]],
            //格蕾修
            "h_geleixiu":["female","xy","2/2/1",["h_huishi","h_zhanyan","h_linmu"],["des:画笔，臣服于我","ext:noname-huntersxy/character/image/h_geleixiu.jpg"]],

            //星穹铁道
            //银狼
            "h_yinlang":["female","xy","4/4",["h_stop","h_zhuru","h_download"],["ext:noname-huntersxy/character/image/h_yinlang.jpg"]],
            //青雀
            "h_qingque":["female","xy",3,["h_dugou","qinzheng"],["des:哪有赌狗天天输","ext:noname-huntersxy/character/image/h_qingque.jpg"]],
            //藿藿
            "h_huohuo":["female","xy","3/3",["h_weiba"],["ext:noname-huntersxy/character/image/h_huohuo.jpg"]],
            "h_huohuoweiba":["double","xy","4/6",["h_quhun"],["boss","forbidai","bossallowed","ext:noname-huntersxy/character/image/h_huohuoweiba.jpg"]],

            //汐屿
            "h_xiyu":["female","xy","1/5/4",["h_shouhu","h_zhudi","h_pojia"],["des:坚守","ext:noname-huntersxy/character/image/h_xiyu.jpg"]],
            //真纪
            "h_zhenji":["female","xy","4/4",["h_mosha","h_shenlin","paoxiao"],["ext:noname-huntersxy/character/image/h_zhenji.jpg"]],


            //神贾诩
            "h_jiaxu":["male","xy","3/3",["rewansha","reweimu","zyjianbing","yjzhenlve","yjjianshu","reluanwu","yjyongdi"],["des:御神贾诩","ext:noname-huntersxy/character/image/h_jiaxu.jpg"]],
            //神蒲元
            "h_puyuan":["male","xy","3/3",["h_baohu","h_ronghe","olqisi","pyzhuren"],["des:炼器大师","ext:noname-huntersxy/character/image/h_puyuan.jpg"]],
            //神马良
            "h_maliang":["male","xy","3/3",["h_zhishu","h_yushu"],["des:妙笔生花","ext:noname-huntersxy/character/image/h_maliang.jpg"]],
            
           
            

        },
        skill:{
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
        var cards=get.cards((get.mode()!='guozhan'&&player.countCards('h')==0)?10:10);
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
        characterSort:{
            huntersxy:{
                hanser:["h_cvhanser",],
                bh3:["h_bronya","h_bronya_Infinity","h_puluomixiushi","h_geleixiu","h_ailixiya","h_guanxing","h_baixier","h_heixier"],
                xqtd:["h_huohuo","h_huohuoweiba","h_qingque","h_yinlang"],
                ybs:["h_puyuan","h_jiaxu","h_maliang"],
            },
        },
		translate:{
            "h_huntersxy":"伳影",
            "h_baixier":"希儿",
            "h_heixier":"黑希",
			"h_cvhanser":"Hanser•唱歌憨",
            "h_jiaxu":"神贾诩",
            "h_puyuan":"神蒲元",
            "h_maliang":"裴秀马良",
            "h_bronya":"布洛妮娅",
            "h_huohuo":"藿藿",
            "h_huohuoweiba":"藿藿&尾巴大爷",
            "h_ailixiya":"人之律者 爱莉希雅",
            "h_guanxing":"观星",
            "h_geleixiu":"格蕾修",
            "h_yinlang":"银狼",
            "h_zhenji":"真纪",
            "h_bronya_Infinity":"永恒 布洛妮娅",
            "h_qingque":"青雀",
            "h_xiyu":"汐屿",
            "h_puluomixiushi":"普罗米修斯",
            hanser:"hanser",
            bh3:"崩坏三",
            xqtd:"星穹铁道",
            ybs:"原版逆天魔改",

            "h_yupai":"御牌",
            "h_yupai_info":"你的出牌阶段和你需要响应牌时，你可以使用牌堆顶的4张牌",

		},
	};
});
