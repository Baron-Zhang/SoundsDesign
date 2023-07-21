//将此节点挂载到节点上，此节点即可有hover效果

cc.Class({
    extends: cc.Component,

    properties: {
        url:"null"
    },

    onLoad () {
        //鼠标状态
        this.node.on( cc.Node.EventType.MOUSE_ENTER, function (event) {//【移入目标节点区域】使用枚举类型来注册
            cc.game.canvas.style.cursor = "url('https://garryui.cn/cursor/pointer.png'),auto";
        }, this);
        this.node.on( cc.Node.EventType.MOUSE_LEAVE, function (event) {
            cc.game.canvas.style.cursor = "url('https://garryui.cn/cursor/normal.png'),auto";
        }, this);
        
        //点击→跳转链接
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            if (this.url != "null") {
                // this.openLink(this.url);//原地打开
                cc.sys.openURL(this.url);//新开窗口
            }
          }, this);
    },

    //跳转链接
    openLink:function (url) {//url为字符串
        window.location.href = url;
    },

    start () {

    },

    // update (dt) {},
});
