cc.Class({
    extends: cc.Component,

    properties: {
        illustration:[cc.Node],
    },

    onLoad () {
        //初始化鼠标状态
        cc.game.canvas.style.cursor = "url('https://garryui.cn/cursor/normal.png'),auto";
        
        //销毁顶层遮罩
        cc.find("Canvas/loadBg").active = true; 
        cc.find("Canvas/loadBg").runAction(
            cc.fadeOut(3),
        );
        
        //鼠标视差
        cc.find("Canvas").on(cc.Node.EventType.MOUSE_MOVE, function (event) {//【监听鼠标位置】使用枚举类型来注册
            //获取鼠标的世界坐标
            this.mouseX = event.getLocationX();
            this.mouseY = event.getLocationY();
            //获取鼠标坐标增量
            var mouseDeltaX = event.getDeltaX();
            var mouseDeltaY = event.getDeltaY();
            //定义并获取插画的坐标
            var illu1 = this.illustration[0].getPosition();
            var illu2 = this.illustration[1].getPosition();
            var illu3 = this.illustration[2].getPosition();
            // var CiircleBPos = cc.find("Canvas/CiircleB").getPosition();
            //动态改变插画的坐标
            this.illustration[0].setPosition(illu1.x+0.1*mouseDeltaX,illu1.y+0.1*mouseDeltaY);
            this.illustration[1].setPosition(illu2.x+0.05*mouseDeltaX,illu2.y+0.05*mouseDeltaY);
            this.illustration[2].setPosition(illu3.x+0.02*mouseDeltaX,illu3.y+0.02*mouseDeltaY);
            // cc.find("Canvas/CiircleB").setPosition(CiircleBPos.x+0.05*mouseDeltaX,CiircleBPos.y+0.1*mouseDeltaY);
        }, this);
        //切换动效
        this.actionFlag = true;//动效开关
        cc.find("brief",this.node).on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
            this.briefAction = true ;
            this.worksAction = false ;
            this.articleAction = false ;
            this.contactAction = false ;
        }, this);
        cc.find("works",this.node).on( cc.Node.EventType.MOUSE_ENTER, function (event) {
            this.briefAction = false ;
            this.worksAction = true ;
            this.articleAction = false ;
            this.contactAction = false ;
        }, this);
        cc.find("article",this.node).on( cc.Node.EventType.MOUSE_ENTER, function (event) {
            this.briefAction = false ;
            this.worksAction = false ;
            this.articleAction = true ;
            this.contactAction = false ;
        }, this);
        cc.find("contact",this.node).on( cc.Node.EventType.MOUSE_ENTER, function (event) {
            this.briefAction = false ;
            this.worksAction = false ;
            this.articleAction = false ;
            this.contactAction = true ;
        }, this);
    },

    //插画动画
    illustrationAciton: function () {
        var time = 0.5;
        var easing = 2;
        var delay = 0.1;
        var component = this;
        var y = 0;
        if (this.briefAction) {
            y=0;
        } else if(this.worksAction){
            y=1000;
        } else if(this.articleAction){
            y=2000;
        } else if(this.contactAction){
            y=3000;
        };
        if (this.actionFlag) {//是否可以播放动画
            this.actionFlag = false;
            this.illustration[0].runAction(
                cc.moveTo(time, 0, y).easing(cc.easeInOut(easing)),
            );
            component.scheduleOnce(function() {
                this.illustration[1].runAction(
                    cc.moveTo(time, 0, y).easing(cc.easeInOut(easing)),
                );
            }, delay);
            component.scheduleOnce(function() {
                this.illustration[2].runAction(cc.sequence(
                    cc.moveTo(time, 0, y).easing(cc.easeInOut(easing)),
                    cc.callFunc(function () {
                        this.actionFlag = true;
                    }, this),
                ),);
            }, delay*1.6);
        };
    },


    //toast：点击导航
    clickNav : function (event, customEventData) {
        switch (customEventData) {
            case "brief":
                this.schedule(function() {
                    cc.director.loadScene("brief");
                }, 0.6);
                break;
            case "works":
                this.schedule(function() {
                    cc.director.loadScene("works");
                }, 0.6);
                break;
            case "article":
                this.schedule(function() {
                    cc.director.loadScene("article");
                }, 0.6);
                break;
            case "contact":
                this.schedule(function() {
                    cc.director.loadScene("contact");
                }, 0.6);
                break;
        
            default:
                break;
        };
        this.clickNavAction();
    },
    //点击导航动效
    clickNavAction :function () {
        var windowSize=cc.winSize;//获取屏幕尺寸
        console.log("width="+windowSize.width+",height="+windowSize.height);
        cc.find("Canvas/clickNav").setPosition(this.mouseX-windowSize.width/2, this.mouseY-windowSize.height/2);
        cc.find("Canvas/clickNav").runAction(cc.sequence(//动画
            cc.scaleTo(1, 100, 100).easing(cc.easeInOut(3)),
            cc.callFunc(function () {//loading出现
                cc.find("Canvas/loading").opacity = 255;
                //假进度
                this.schedule(function() {
                    cc.find("Canvas/loading/loadingBar1").getComponent(cc.ProgressBar).progress = cc.find("Canvas/loading/loadingBar1").getComponent(cc.ProgressBar).progress + 0.1;
                }, 0.1, 3, 0);
                this.schedule(function() {
                    cc.find("Canvas/loading/loadingBar1").getComponent(cc.ProgressBar).progress = cc.find("Canvas/loading/loadingBar1").getComponent(cc.ProgressBar).progress + 0.1;
                }, 0.1, 2, 4);
                this.schedule(function() {
                    cc.find("Canvas/loading/loadingBar1").getComponent(cc.ProgressBar).progress = cc.find("Canvas/loading/loadingBar1").getComponent(cc.ProgressBar).progress + 0.1;
                }, 0.1, 2, 10);
            }, this),
            ));
    },


    start () {

    },

    update (dt) {
        this.illustrationAciton();
    },
});
