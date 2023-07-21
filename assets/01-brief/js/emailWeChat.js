// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    clickCopy:function () {
        cc.find("Canvas/popover/text").getComponent(cc.Label).string = "已复制到剪贴板！";//设置标题
        cc.find("Canvas/popover/text").color = new cc.Color(244, 148, 51);
    },

    // update (dt) {},
});
