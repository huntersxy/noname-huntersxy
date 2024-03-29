game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'huntersxy',
		connect:true,
		character:{
            
            //作者
            "h_huntersxy":["female","shen",5,["h_guangce"],["zhu","boss","bossallowed","ext:noname-huntersxy/character/image/h_huntersxy.jpg"]],
            //崩坏三
            //白希
            "h_baixier":["female","xy",3,["h_ss","h_shenhai",],["des:死生之律者","ext:noname-huntersxy/character/image/h_baixier.jpg"]],
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

            

		},
	};
});
