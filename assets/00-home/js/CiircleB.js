
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //鼠标视差
        cc.find("Canvas").on(cc.Node.EventType.MOUSE_MOVE, function (event) {//【监听鼠标位置】使用枚举类型来注册
            //获取鼠标的世界坐标
            this.mouseX = event.getLocationX();
            this.mouseY = event.getLocationY();
            //获取鼠标坐标增量
            var mouseDeltaX = event.getDeltaX();
            var mouseDeltaY = event.getDeltaY();
            //定义并获取插画的坐标
            var CiircleBPos = cc.find("Canvas/CiircleB").getPosition();
            //动态改变插画的坐标
            cc.find("Canvas/CiircleB").setPosition(CiircleBPos.x+0.05*mouseDeltaX,CiircleBPos.y+0.1*mouseDeltaY);
        }, this);
    },

    start () {

    },

    // update (dt) {},
});
