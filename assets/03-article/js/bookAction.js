
cc.Class({
    extends: cc.Component,

    properties: {
        shadow:cc.Node,
    },

    onLoad () {
        //预设鼠标动画速度等参数
        var mSpeed = 0.3 ;
        var bX = 100;
        var sX = 120;
        //鼠标动画
        this.node.on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
            this.node.runAction(
                cc.moveBy(mSpeed,0,bX).easing(cc.easeIn(3.0)),
            );
            this.shadow.runAction(cc.spawn(
                cc.moveBy(mSpeed,-sX,-sX).easing(cc.easeIn(3.0)),
                cc.fadeTo(mSpeed,200),
            ));
        }, this);
        this.node.on( cc.Node.EventType.MOUSE_LEAVE, function (event) {//【移入目标节点区域】使用枚举类型来注册
            this.node.runAction(
                cc.moveBy(mSpeed,0,-bX).easing(cc.easeIn(3.0)),
            );
            this.shadow.runAction(cc.spawn(
                cc.moveBy(mSpeed,sX,sX).easing(cc.easeIn(3.0)),
                cc.fadeTo(mSpeed,255),
                ));
        }, this);
    },

    // update (dt) {},
});
