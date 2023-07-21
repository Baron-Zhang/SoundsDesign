
var type = cc.Enum({
    白装: 0,
    绿装: 1,
    蓝装: 2,
    紫装: 3,
    橙装: 4,
});

cc.Class({
    extends: cc.Component,

    properties: {
        url: {default: "null", tooltip: "跳转链接"},
        imgUrl: {default: "null", tooltip: "图片链接"},

        title: {default: "null", tooltip: "标题"},
        class: {default: "null", tooltip: "分类"},
        brief: {default: "null", tooltip: "亮点"},
        date: {default: "null", tooltip: "日期"},

        type: {
            type: cc.Enum(type),
            default: type.白装,
        },
    },

    onLoad () {
        //为数据数组排序

        //将数据数组中的 图片链接、跳转链接、标题 等赋值到 properties 中




        //设置稀有度
        switch (this.type) {
            case 0:
                cc.resources.load("img/02-works/card_00", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("cardBody/cardBg",this.node).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }.bind(this));
                break;
            case 1:
                cc.resources.load("img/02-works/card_01", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("cardBody/cardBg",this.node).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }.bind(this));
                break;
            case 2:
                cc.resources.load("img/02-works/card_02", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("cardBody/cardBg",this.node).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }.bind(this));
                break;
            case 3:
                cc.resources.load("img/02-works/card_03", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("cardBody/cardBg",this.node).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }.bind(this));
                break;
            case 4:
                cc.resources.load("img/02-works/card_04", cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("cardBody/cardBg",this.node).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }.bind(this));
                break;
        
            default:
                break;
        };
        //设置封面
        if (this.imgUrl != "null") {
            cc.assetManager.loadRemote(this.imgUrl, function (err, texture) {
                cc.find("cardBody/workImg",this.node).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            }.bind(this));
        };
        //设置标题
        cc.find("cardBody/title",this.node).getComponent(cc.Label).string = this.title;
        //设置分类
        cc.find("cardBody/class",this.node).getComponent(cc.Label).string = this.class;
        //设置亮点
        cc.find("cardBody/brief",this.node).getComponent(cc.Label).string = this.brief;
        //设置日期
        cc.find("cardBody/date",this.node).getComponent(cc.Label).string = this.date;



        //鼠标状态
        var time = 0.3;
        var cardScaleA = 1; //目标大小
        var cardScaleB = 0.75; //原始大小
        var vardMove = 20;  //悬浮距离
        var angleB = cc.find("cardBody",this.node).rotation//原始角度
        this.node.on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
                //提高层级
                this.node.zIndex = 100;
                //开始动画前先停止之前的所有动画
                cc.find("cardBody",this.node).stopAllActions();
                cc.find("cardShadow",this.node).stopAllActions();
                //开始动画
                cc.find("cardBody",this.node).runAction(cc.spawn (
                    cc.scaleTo(time, cardScaleA, cardScaleA).easing(cc.easeIn(3.0)),
                    cc.moveTo(time, cc.v2(-vardMove, vardMove)).easing(cc.easeIn(3.0)),
                    cc.rotateTo(time,0),
                    ));
                cc.find("cardShadow",this.node).runAction(cc.spawn (
                    cc.scaleTo(time, cardScaleA,cardScaleA).easing(cc.easeIn(3.0)),
                    cc.moveTo(time, cc.v2(vardMove+25, vardMove-120)).easing(cc.easeIn(3.0)),
                    cc.rotateTo(time,0),
                ));
                //调暗兄弟节点
                var children = cc.find("Canvas/cards").children;
                for (var i = 0; i < children.length; ++i) {
                        children[i].runAction(cc.fadeTo(time,150));
                };
                this.node.runAction(cc.fadeTo(time,255));
        }, this);
        this.node.on( cc.Node.EventType.MOUSE_LEAVE, function (event) {
                //恢复层级
                this.node.zIndex = 1;
                //开始动画前先停止之前的所有动画
                cc.find("cardBody",this.node).stopAllActions();
                cc.find("cardShadow",this.node).stopAllActions();
                //开始动画
                cc.find("cardBody",this.node).runAction(cc.spawn (
                    cc.scaleTo(time,cardScaleB,cardScaleB).easing(cc.easeIn(3.0)),
                    cc.moveTo(time, cc.v2(vardMove-25, vardMove-25)).easing(cc.easeIn(3.0)),
                    cc.rotateTo(time,angleB),
                    ));
                cc.find("cardShadow",this.node).runAction(cc.spawn (
                    cc.scaleTo(time, cardScaleB, cardScaleB).easing(cc.easeIn(3.0)),
                    cc.moveTo(time, cc.v2(vardMove, -vardMove)).easing(cc.easeIn(3.0)),
                    cc.rotateTo(time,angleB),
                ));
                //调亮兄弟节点
                var children = cc.find("Canvas/cards").children;
                for (var i = 0; i < children.length; ++i) {
                    children[i].runAction(cc.fadeTo(time,255));
                };
        }, this);

        
        //点击→跳转链接
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            if (this.url != "null") {
                // this.openLink(this.url);//原地打开
                cc.sys.openURL(this.url);//新开窗口
            }
          }, this);





    },

    // update (dt) {},
});
