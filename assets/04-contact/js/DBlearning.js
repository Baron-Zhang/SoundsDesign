
cc.Class({
    extends: cc.Component,

    properties: {
        weiJian:cc.Node,
        moveMask:cc.Node,
        destination:cc.Node,
    },
    
    onLoad () {
        // 获得当前armatureDisplay，和当前amature
        // this.armatureDisplay = this.testWarlock.getComponent(dragonBones.ArmatureDisplay);
        // this.armature = this.armatureDisplay.armature();

        //定义卫健的动画
        var weiJianDBPlay = this.weiJian.getComponent(dragonBones.ArmatureDisplay);

        //鼠标点击移动  
        this.moveMask.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            //获取鼠标x坐标
            var mouseX = event.getLocationX()-cc.winSize.width/2;
            //目的地光标
            this.destination.x = mouseX;
            this.destination.scaleY = 0;
            this.destination.runAction(
                cc.scaleTo(0.1,1),
            );
            //卫健走路 
            this.weiJian.stopAllActions();
            this.weiJian.runAction(cc.sequence(
                cc.callFunc(function () {
                    weiJianDBPlay.timeScale = 3;//设置骨骼动画速率
                    if (weiJianDBPlay.animation != "walk") {
                        weiJianDBPlay.playAnimation('walk', 0);//播放骨骼动画
                    };
                }, this),
                cc.moveTo((Math.abs(this.weiJian.getPosition().x-mouseX))/400,mouseX,-366.678),
                cc.callFunc(function () {
                    weiJianDBPlay.timeScale = 1;//设置骨骼动画速率
                    weiJianDBPlay.playAnimation('stay', 0);//播放骨骼动画
                    this.destination.runAction(
                        cc.scaleTo(0.1,0,1),
                    );
                }, this),
            ));
            //卫健转身
            if ((this.weiJian.getPosition().x-mouseX)<=0) {
                // this.weiJian.scaleX = -0.3;
                this.weiJian.runAction(cc.scaleTo(0.1,-0.3,0.3))
            }else{
                // this.weiJian.scaleX = 0.3;
                this.weiJian.runAction(cc.scaleTo(0.1,0.3,0.3))
            };
      }, this);
        //抬起鼠标 显示光标
        this.moveMask.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
        }, this);
    },

    start () {

    },

    // update (dt) {},
});
