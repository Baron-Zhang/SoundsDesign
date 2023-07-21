
//生成toast
window.toast =  function (time,title,text) {//toast组件:time,title,text  消失时间，标题，内容
    cc.resources.load("prefab/toast", function (err, prefab) {
        var toast = cc.instantiate(prefab);
        toast.getComponent("toast").time = time;//设置消失时间
        toast.parent = cc.find("Canvas");
        toast.setPosition(0, 0);
        cc.find("title",toast).getComponent(cc.Label).string = title;//设置标题
        cc.find("text",toast).getComponent(cc.Label).string = text;//设置标题
    });
  },




cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        //检测设备
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            cc.director.loadScene("mobile");
        } else {
            console.log("Pc")
        };
        // 设置this.node为常驻节点
        cc.game.addPersistRootNode(this.node);
        this.reload();
    },
    reload:function () {
        //初始化鼠标状态
        cc.game.canvas.style.cursor = "url('https://garryui.cn/cursor/normal.png'),auto";
        //预加载所有场景
        cc.director.preloadScene("home", function () {
            console.log("home scene preloaded");
        });
        cc.director.preloadScene("brief", function () {
            console.log("brief scene preloaded");
        });
        cc.director.preloadScene("works", function () {
            console.log("works scene preloaded");
        });
        cc.director.preloadScene("article", function () {
            console.log("article scene preloaded");
        });
        cc.director.preloadScene("contact", function () {
            console.log("contact scene preloaded");
        });
        console.log("常驻节点加载完毕");
    },
    goHome: function () {
        console.log("回家")
        cc.director.loadScene("home");
    },
    goBrief: function (params) {
        cc.director.loadScene("brief");
    },
    goWorks: function (params) {
        cc.director.loadScene("works");
    },
    goArticle: function (params) {
        cc.director.loadScene("article");
    },
    goContact: function (params) {
        cc.director.loadScene("contact");
    },

    start () {

    },

    // update (dt) {},
});
