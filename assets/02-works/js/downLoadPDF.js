

cc.Class({
    extends: cc.Component,

    properties: {
        light:cc.Node,
    },

    onLoad () {
        //鼠标状态
        this.node.on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
            this.light.stopAllActions();
            this.light.runAction(cc.sequence(
                cc.callFunc(function () {
                    this.node.runAction(cc.scaleTo(0.2, 1.01, 1.01));
                }, this),
                cc.moveTo(0.3, cc.v2(200, 80)).easing(cc.easeIn(3.0)),
                cc.callFunc(function () {
                    this.light.setPosition(-200,0);
                }, this),
                cc.moveTo(0.8, cc.v2(200, 80)).easing(cc.easeIn(3.0)),
            ));
        }, this);
        this.node.on( cc.Node.EventType.MOUSE_LEAVE, function (event) {
            this.light.stopAllActions();
            this.light.setPosition(-200,0);
            this.node.runAction(cc.scaleTo(0.2, 1, 1));
        }, this);
    },

    // update (dt) {},
});
