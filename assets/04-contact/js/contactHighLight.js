
cc.Class({
    extends: cc.Component,

    properties: {
        num : cc.Node,
    },

    onLoad () {
        //鼠标状态
        this.node.on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
            this.num.opacity = 255;
        }, this);
        this.node.on( cc.Node.EventType.MOUSE_LEAVE, function (event) {
            this.num.opacity = 0;
        }, this);
    },


    // update (dt) {},
});
