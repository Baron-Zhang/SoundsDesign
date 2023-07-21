

cc.Class({
    extends: cc.Component,
    onLoad () {
        var worksUrlData = [
            //白0 绿1 蓝2 紫3 橙4

            ["https://www.zcool.com.cn/work/ZMzgwNjE1ODg=.html",//跳转链接
            "https://img.zcool.cn/community/01e0c75d43d66aa8012187f42a8eb7.jpg@260w_195h_1c_1e_1o_100sh.jpg",//封面链接
            "2019UI年中集",//标题
            "UI-APP界面",//分类
            "上线作品",//亮点
            4,//装等
            "2019-07"//时间
            ],
        
            ["https://www.zcool.com.cn/work/ZMzc3MzM4NzI=.html",//跳转链接
            "https://img.zcool.cn/community/01f2415d343e0aa8012187f43194da.jpg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "人设手绘练习",//标题
            "插画-插画习作",//分类
            "习作",//亮点
            0,//装等
            "2019-07"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMzc2ODUyNTI=.html",//跳转链接
            "https://img.zcool.cn/community/0190545d3159b6a8012187f44bdd60.jpg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "西餐餐饮点餐ui界面设计",//标题
            "UI-APP界面",//分类
            "上线作品",//亮点
            0,//装等
            "2019-02"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMzc2MzM0NjA=.html",//跳转链接
            "https://img.zcool.cn/community/01cc1e5d2edc0ca80120695c600cab.jpg@260w_195h_1c_1e_1o_100sh.jpg",//封面链接
            "智能产品手册",//标题
            "平面-书装/画册",//分类
            "大量发行",//亮点
            2,//装等
            "2018-11"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMzc2MzM2NTI=.html",//跳转链接
            "https://img.zcool.cn/community/0127305d2edadfa8012187f4d916ab.jpg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "众聚智能产品详情页设计",//标题
            "网页-电商",//分类
            "上线作品",//亮点
            0,//装等
            "2019-02"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMzUxMTk5NjA=.html",//跳转链接
            "https://img.zcool.cn/community/017cb15cb5a3c9a801214168a38339.jpg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "流浪地球游戏徽章",//标题
            "UI-游戏UI",//分类
            "习作",//亮点
            0,//装等
            "2019-02"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMzQzMDI3ODA=.html",//跳转链接
            "https://img.zcool.cn/community/01ff625cb554daa801208f8b8e9961.jpg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "众聚智能企业官网2.0设计",//标题
            "网页-企业官网",//分类
            "上线作品",//亮点
            0,//装等
            "2018-11"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMjkyMzM5MTI=.html",//跳转链接
            "https://img.zcool.cn/community/01b94f5b586518a801206a35034201.jpeg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "中车时代官网",//标题
            "网页-企业官网",//分类
            "上线作品",//亮点
            0,//装等
            "2018-04"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMjkyMTA1MjQ=.html",//跳转链接
            "https://img.zcool.cn/community/01c2c75b5715fea801206a35f322f4.jpeg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "魔脑汇知识商城平台项目",//标题
            "UI-APP界面",//分类
            "上线作品",//亮点
            0,//装等
            "2018-03"//时间
            ],
            
            ["https://www.zcool.com.cn/work/ZMjkxODM0MjA=.html",//跳转链接
            "https://img.zcool.cn/community/013a2c5b57e8c5a801206a35e4e63b.jpeg@520w_390h_1c_1e_1o_100sh.jpg",//封面链接
            "慧通教育管网及吉祥物设计",//标题
            "网页-企业官网",//分类
            "上线作品",//亮点
            2,//装等
            "2018-02"//时间
            ],
        ];

        //数组按日期排序
        worksUrlData.sort(function(x, y){
            return y[6].replace("-","") - x[6].replace("-","");;
          });

        //为卡牌赋值
        var cardsChildren = cc.find("Canvas/cards").children;
        for (var i = 0; i < cardsChildren.length; ++i) {
            cardsChildren[i].getComponent("worksCard").url = worksUrlData[i][0];
            cardsChildren[i].getComponent("worksCard").imgUrl = worksUrlData[i][1];
            cardsChildren[i].getComponent("worksCard").title = worksUrlData[i][2];
            cardsChildren[i].getComponent("worksCard").class = worksUrlData[i][3];
            cardsChildren[i].getComponent("worksCard").brief = worksUrlData[i][4];
            cardsChildren[i].getComponent("worksCard").type = worksUrlData[i][5];
            cardsChildren[i].getComponent("worksCard").date = worksUrlData[i][6];
        };








    },
});
