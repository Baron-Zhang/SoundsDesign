
cc.Class({
    extends: cc.Component,

    properties: {
        scrollview:cc.ScrollView ,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //在scrollbar节点上注册触摸事件，监听touchmove消息
        // 在消息回调里判断触摸移动的距离，得到和scrollbar总的活动范围比值
        // 调用 scrollTo 接口
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //获取触点的 Y 轴位置
            var locationY = event.getLocationY()
            //移动
            this.scrollview.scrollTo(cc.v2(0, locationY/1080));
          }, this);
    },


    start () {

    },

    // update (dt) {},
});
