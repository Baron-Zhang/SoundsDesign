
cc.Class({
    extends: cc.Component,

    properties: {
        time:1000,
    },

    onLoad () {
        //动效
        this.node.runAction(
            cc.scaleTo(0.3,1,1),
        );
        // time秒后销毁目标节点
        if (this.node != null) {
            setTimeout(function () {
              this.node.destroy();
            }.bind(this), this.time);
        };
    },

    start () {

    },

    // update (dt) {},
});
