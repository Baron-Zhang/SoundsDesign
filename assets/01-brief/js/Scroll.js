
cc.Class({
    extends: cc.Component,

    properties: {
        astronautStar:cc.Node,
        liftGear:{
            default:[],
            type:cc.Node,
        },
    },

    onLoad () {
        //记录头盔内风景动画位置
        this.astronautStarPos0 = this.astronautStar.y;
    },

    //检测偏移量
    showScrollOffset:function (event) {
        var scrollY = event.getScrollOffset().y;//偏移量
        cc.find("Canvas/scrollOffset").getComponent(cc.Label).string = "偏移量:" + scrollY;//显示偏移量
        //头盔内风景动画
        this.astronautStar.y = this.astronautStarPos0 - scrollY*2;
        //电梯齿轮
        for (let i = 0; i < this.liftGear.length; i++) {
            this.liftGear[i].angle = scrollY*2;
        }
    },



    // update (dt) {},
});
