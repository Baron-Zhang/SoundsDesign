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

    onLoad () {
        cc.find("Canvas/window").runAction(cc.repeatForever(
            cc.rotateTo(100, 100),
            ));
        cc.find("Canvas/bLight").runAction(cc.repeatForever(
            cc.rotateTo(100, 100),
            ));
    },

    // update (dt) {},
});
