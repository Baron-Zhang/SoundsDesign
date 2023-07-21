
cc.Class({
    extends: cc.Component,

    properties: {
        fristMask:cc.Node,
        navMenu:cc.Node,
        navOption:cc.Node,
        mask:cc.Node,
    },

    onLoad () {
        //刷新常驻节点
        // cc.find("residentNode").getComponent("public").reload();
        //进场动画
        this.fristMask.scale = 100;
        //销毁粉色遮罩
        this.fristMask.runAction(//动画
            cc.scaleTo(1.2, 0, 0).easing(cc.easeInOut(3)),
            );
        //拉出菜单
        this.isOpenNav = false;
        this.navMenu.on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
            if (this.navOption.getPosition().x <= -298) {//预留2单位作为动作误差
                cc.tween(this.navMenu)
                    .to(0.5, { position: cc.v2(-150, 0),}, { easing: 'quadInOut'})
                    .start();
                cc.tween(this.navOption)
                    .to(0.5, { position: cc.v2(170, 180),}, { easing: 'quadInOut'})
                    .start();
                cc.tween(this.mask)
                    .call(() => { 
                        this.mask.active=true;
                        this.isOpenNav = true;
                        this.mask.setPosition(960, 470);
                        console.log("遮罩出现"); 
                    })
                    .to(0.5, { opacity: 200}, { easing: 'quadInOut'})
                    .start();
            };
        }, this);
        //收回菜单
        this.mask.on( cc.Node.EventType.MOUSE_MOVE, function (event) {//【移入目标节点区域】使用枚举类型来注册
            if (this.navOption.getPosition().x >= 168 && this.isOpenNav == true) {//预留2单位作为动作误差
                this.isOpenNav = false;
                this.navMenu.runAction(
                    cc.moveTo(0.5, 0, 0),
                );
                this.navOption.runAction(
                    cc.moveTo(0.5, -300, 180),
                    );
                cc.tween(this.mask)
                    // .call(() => {this.isOpenNav = false;})
                    .to(0.5, { opacity: 0}, { easing: 'quadInOut'})
                    .call(() => { 
                        this.mask.active=false;
                        console.log("遮罩禁用"); 
                    })
                    .start();
            };
        }, this);
    },
    //跳转
    clickNav : function (event, customEventData) {
        switch (customEventData) {
            case "home":
                this.schedule(function() {
                    cc.director.loadScene("home");
                }, 0.6);
                break;
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
        //点击导航动效
        this.fristMask.runAction(cc.sequence(//动画
            cc.scaleTo(1, 100, 100).easing(cc.easeInOut(3)),
            cc.callFunc(function () {//loading出现
                cc.find("loading",this.node).opacity = 255;
                var windowSize=cc.winSize;//获取屏幕尺寸
                cc.find("loading",this.node).setPosition(windowSize.width/2-60, windowSize.height/2);
                //假进度
                this.schedule(function() {
                    cc.find("loading/loadingBar1",this.node).getComponent(cc.ProgressBar).progress = cc.find("loading/loadingBar1",this.node).getComponent(cc.ProgressBar).progress + 0.1;
                }, 0.1, 3, 0);
                this.schedule(function() {
                    cc.find("loading/loadingBar1",this.node).getComponent(cc.ProgressBar).progress = cc.find("loading/loadingBar1",this.node).getComponent(cc.ProgressBar).progress + 0.1;
                }, 0.1, 2, 4);
                this.schedule(function() {
                    cc.find("loading/loadingBar1",this.node).getComponent(cc.ProgressBar).progress = cc.find("loading/loadingBar1",this.node).getComponent(cc.ProgressBar).progress + 0.1;
                }, 0.1, 2, 10);
            }, this),
        ));
    },

    // update (dt) {},
});
